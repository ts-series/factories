
import { Attributes, escape } from './attributes.js';


//

type Part = string | Element | (() => Element) | null | undefined;


export class Element<Attr extends Attributes = Attributes> {

	declare static Symbol: Readonly<Record<string, symbol>>;

	static RawText: Set<symbol> = new Set();

	content: Array<Part> | null;

	#attributes: Attr;


	/** Creates an element and flattens any nested arrays in its content. */
	constructor(
		public symbol: symbol,
		attributes: Attr,
		content: Array<Part | Array<unknown>> | null = null
	) {
		this.#attributes = attributes;
		this.content = content === null ? null : Element.#flatten(content);
	}


	/** Flattens nested arrays of parts into one array and returns the input unchanged if it contains no arrays. */
	static #flatten(parts: Array<Part | Array<unknown>>): Array<Part> {
		return parts.some(Array.isArray) ? parts.flat(Infinity) as Array<Part> : parts as Array<Part>;
	}


	/** Returns true if obj represents an attributes object (not an Element or string). */
	static hasAttr(obj: object | null | undefined): boolean {
		return !(obj instanceof Element) && typeof obj !== "string" && Attributes.some(obj);
	}


	/** Returns a constructor for a non-empty element whose first argument can be an object representing attributes. */
	static NonVoid(
		symbol: symbol,
		AttributesCtor: new (obj?: object) => Attributes
	): (...content: unknown[]) => Element {
		return (...content: unknown[]) => new this(
			symbol,
			new AttributesCtor(this.hasAttr(content[0] as object | null | undefined)
				? content.shift() as object
				: {}
			),
			content as Array<Part>
		);
	}


	/** Returns a constructor for an empty element whose argument can be an object representing attributes. */
	static Void(
		symbol: symbol,
		AttributesCtor: new (obj?: object) => Attributes
	): (attributes?: object) => Element {
		return (attributes = {}) => new this(symbol, new AttributesCtor(attributes));
	}


	// ELEMENT ATTRIBUTES

	/** Creates a new Attr instance from a plain object; overridden by subclasses to use their own Attributes subclass. */
	protected newAttributes(obj: object): Attr {
		return new Attributes(obj) as Attr;
	}


	/** Returns the element's attributes. */
	get attributes(): Attr {
		return this.#attributes;
	}


	/** Sets the element's attributes from a plain object, converting it via newAttributes(). */
	set attributes(obj: object) {
		this.#attributes = obj instanceof Attributes ? obj as Attr : this.newAttributes(obj);
	}


	/** Adds additional attributes or overwrites existing ones. */
	set(...values: (Record<string, unknown> | string | null | undefined)[]): Element {
		for (const val of values) {
			if (val == null) {
				continue;
			}
			else if (typeof val === "string") {
				(this.attributes as Attributes)[val] = null;
			}
			else {
				Object.assign(this.attributes, val);
			}
		}

		return this;
	}


	// SELECTING AND INSERTING INNER ELEMENTS

	/** Returns the part at the given index, or undefined if the element is void. */
	getElementByIndex(index: number): Part {
		return this.content?.[index];
	}


	/** Returns the first child part, or undefined if the element is void. */
	get firstChild(): Part {
		return this.content?.[0];
	}


	/** Returns the last child part, or undefined if the element is void. */
	get lastChild(): Part {
		return this.content?.[this.content.length - 1];
	}


	/** Returns the child part at the given index, allowing negative integers for counting backwards. */
	at(index: number): Part {
		return index < 0
			? this.content?.[this.content.length + index]
			: this.content?.[index];
	}


	/** Returns the first descendant (or self) matching the predicate through depth-first search. */
	find(predicate: (el: Element) => boolean): Element | null {
		if (predicate(this)) {
			return this;
		}
		else if (!Array.isArray(this.content)) {
			return null;
		}
		else {
			for (const part of this.content) {
				if (part instanceof Element) {
					const result = part.find(predicate);
					if (result) return result;
				}
			}
			return null;
		}
	}


	/** Appends one or more parts to the element's content, flattening nested arrays, or does nothing if the element is void. */
	append(...elements: Array<Part | Array<unknown>>): Element {
		if (Array.isArray(this.content)) {
			this.content.push(...Element.#flatten(elements));
		}
		return this;
	}


	/** Inserts a part or the flattened parts of an array at the given index, or does nothing if the element is void. */
	insertAt(index: number, element: Part | Array<unknown>): Element {
		this.content?.splice(index, 0, ...Element.#flatten([element]));
		return this;
	}


	/** Replaces the content array using the given function, or does nothing if the element is void. */
	modifyContent(fn: (parts: Array<Part>) => Array<Part>): Element {
		if (this.content) this.content = fn(this.content);
		return this;
	}


	// SETTERS FOR GLOBAL ATTRIBUTES

	/** Sets the class attribute to one or more class names, ignoring false, null and undefined values. */
	class(...values: (string | false | null | undefined)[]): this {
		(this.attributes as Attributes).class = values.filter((v): v is string => typeof v === "string");
		return this;
	}


	/** Sets the id attribute. */
	id(value: string | null | undefined): this {
		(this.attributes as Attributes).id = value;
		return this;
	}


	/** Sets the itemprop attribute. */
	itemprop(value: string | null | undefined): this {
		(this.attributes as Attributes).itemprop = value;
		return this;
	}


	/** Sets the itemscope attribute, optionally with an itemtype URL. */
	itemscope(itemtype?: string): this {
		(this.attributes as Attributes).itemscope = null;
		if (itemtype) (this.attributes as Attributes).itemtype = itemtype;
		return this;
	}


	/** Sets the style attribute from a string or an object of camelCase CSS properties. */
	style(value: string | Record<string, string | number> | null | undefined): this {
		if (value == null) {
			(this.attributes as Attributes).style = value;
		}
		else {
			(this.attributes as Attributes).style = typeof value === "string" ? value : Attributes.toCSS(value);
		}
		return this;
	}


	// GENERATING TAGS

	/** Returns the opening tag including expanded attributes. */
	toTag(): string {
		return `<${this.symbol.description}${this.attributes.expand()}>`;
	}

	/** Returns the closing tag. */
	toEndTag(): string {
		return `</${this.symbol.description}>`;
	}


	// GENERATING HTML

	/** Generates the actual HTML code from the element described in JS and also expands its content; style: null → no styling, not even line breaks | negative → tab | 0 → no indent, but line breaks | positive → spaces per depth; offset: number of indentations of the outermost tag; escaping: whether text content is HTML-escaped, except in raw text elements. */
	expand(style: number | null = null, offset: number = 0, escaping: boolean = true): string {
		const stack: string[] = [];
	
		this.beforeExpand(stack);
	
		const baseIndent = style == null ? "" : style < 0 ? "\t" : " ".repeat(style);
		let depth = Math.abs(offset);
	
		const expand = (element: Element, currentStyle: number | null) => {
			const indent = currentStyle == null ? "" : "\n" + baseIndent.repeat(depth);
			let endIndent = "";
	
			stack.push(indent, element.toTag());
	
			if (Array.isArray(element.content)) {
				depth += 1;
				const childStyle = element.suppressChildStyle(currentStyle);
				const escapeText = escaping && !(element.constructor as typeof Element).RawText.has(element.symbol);
	
				for (const part of element.content) {
					if (part == null) {
						continue;
					}
					else if (typeof part === "function") {
						stack.push(part().toTag());
						endIndent = indent;
					}
					else if (part instanceof Element) {
						expand(part, childStyle);
						endIndent = childStyle == null ? "" : indent;
					}
					else {
						stack.push(escapeText ? escape(part) : part);
					}
				}
	
				stack.push(endIndent, element.toEndTag());
				depth -= 1;
			}
		};
	
		expand(this, style);
		return stack.join("").trimStart();
	}


	/** Called at the start of expand() to push any preamble onto the stack; overridden by subclasses. */
	protected beforeExpand(_stack: string[]): void {}


	/** Returns null to suppress whitespace inside this element, or passes currentStyle through. Overridden by subclasses. */
	protected suppressChildStyle(currentStyle: number | null): number | null {
		return currentStyle;
	}


	/** Expands a list of elements and joins them together; style: null → no styling, not even line breaks | negative → tab | 0 → no indent, but line breaks | positive → spaces per depth; offset: the outermost indentation for all elements in the array; escaping: whether text content is HTML-escaped. */
	static expandAll(
		elements: Element[],
		style: number | null = null,
		offset: number = 0,
		escaping: boolean = true
	): string {
		const separator = style === null ? "" : "\n";
	
		return elements
			.map((el) => el.expand(style, offset, escaping))
			.join(separator);
	}
}
