import { Attributes, escape, toCSS } from './attributes.ts';


//

export type Part = unknown;


export class Element<Attr extends Attributes = Attributes> {

	declare static Symbol: Readonly<Record<string, symbol>>;

	static RawText: Set<symbol> = new Set();

	symbol: symbol;
	#attributes: Attr;
	children: Array<Part> | null;


	/** Creates an element and flattens any nested arrays and iterables in its content. */
	constructor(
		symbol: symbol,
		attributes: Attr,
		content: Array<unknown> | null = null
	) {
		this.symbol = symbol;
		this.#attributes = attributes;
		this.children = content === null ? null : Element.#flatten(content);
	}


	/** Returns true if the part is an array or another iterable object that is expanded into several parts; strings and elements are not. */
	static #isNested(part: unknown): part is Iterable<unknown> {
		return part !== null
			&& typeof part === "object"
			&& !(part instanceof Element)
			&& typeof (part as Iterable<unknown>)[Symbol.iterator] === "function";
	}
	
	
	/** Flattens nested arrays and iterables of parts into one array; returns the input unchanged if it contains none. */
	static #flatten(parts: Array<unknown>): Array<Part> {
		if (!parts.some(Element.#isNested)) {
			return parts as Array<Part>;
		}
		else {
			const result: Array<Part> = [];
	
			for (const part of parts) {
				if (Element.#isNested(part)) {
					for (const item of Element.#flatten([...part])) {
						result.push(item);
					}
				}
				else {
					result.push(part);
				}
			}
	
			return result;
		}
	}


	/** Returns true if obj is a plain object literal, which is treated as an attributes object. */
	static hasAttr(obj: unknown): boolean {
		return obj !== null
			&& typeof obj === "object"
			&& Object.getPrototypeOf(obj) === Object.prototype;
	}


	/** Returns a constructor for a non-empty element whose first argument can be an object representing attributes. */
	static NonVoid(
		symbol: symbol,
		AttributesCtor: new (obj?: object) => Attributes
	): (...content: unknown[]) => Element {
		return (...content: unknown[]) => new this(
			symbol,
			new AttributesCtor(this.hasAttr(content[0])
				? content.shift() as object
				: {}
			),
			content
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

	/** Returns the element's attributes. */
	get attributes(): Attr {
		return this.#attributes;
	}


	/** Returns true if the attribute is set on the element, like Element.hasAttribute of the DOM API. */
	hasAttribute(name: string): boolean {
		return Object.hasOwn(this.attributes, name) && this.attributes[name] !== undefined;
	}
	
	
	/** Returns the value of the attribute, or undefined if it is not set, like Element.getAttribute of the DOM API. */
	getAttribute(name: string): unknown {
		return this.attributes[name];
	}


	/** Adds additional attributes or overwrites existing ones. */
	set(...values: (Record<string, unknown> | string | null | undefined)[]): this {
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


	/** Removes the given attributes from the element. */
	removeAttributes(...names: string[]): this {
		for (const name of names) {
			delete (this.attributes as Attributes)[name];
		}
		return this;
	}
	

	// SELECTING AND INSERTING INNER ELEMENTS

	/** Returns the part at the given index, or undefined if the element is void. */
	getElementByIndex(index: number): Part {
		return this.children?.[index];
	}


	/** Returns the first child part, or undefined if the element is void. */
	get firstChild(): Part {
		return this.children?.[0];
	}


	/** Returns the last child part, or undefined if the element is void. */
	get lastChild(): Part {
		return this.children?.[this.children.length - 1];
	}


	/** Returns the child part at the given index, allowing negative integers for counting backwards. */
	at(index: number): Part {
		return index < 0
			? this.children?.[this.children.length + index]
			: this.children?.[index];
	}


	/** Returns the first descendant (or self) matching the predicate through depth-first search. */
	find(predicate: (el: Element) => boolean): Element | null {
		if (predicate(this)) {
			return this;
		}
		else if (!Array.isArray(this.children)) {
			return null;
		}
		else {
			for (const part of this.children) {
				if (part instanceof Element) {
					const result = part.find(predicate);
					if (result) return result;
				}
			}
			return null;
		}
	}


	/** Appends one or more parts to the element's children, flattening nested arrays and iterables, or does nothing if the element is void. */
	append(...elements: Array<unknown>): this {
		if (Array.isArray(this.children)) {
			for (const part of Element.#flatten(elements)) {
				this.children.push(part);
			}
		}
		return this;
	}


	/** Inserts a part or the flattened parts of an array or iterable at the given index, or does nothing if the element is void. */
	insertAt(index: number, element: unknown): this {
		if (this.children) {
			const tail = this.children.splice(index);
	
			for (const part of Element.#flatten([element])) {
				this.children.push(part);
			}
	
			for (const part of tail) {
				this.children.push(part);
			}
		}
		return this;
	}


	/** Replaces the contents of the children array with the result of the given function, keeping the array itself, or does nothing if the element is void. */
	modifyChildren(fn: (parts: Array<Part>) => Array<Part>): this {
		if (this.children) {
			const result = fn(this.children);
	
			if (result !== this.children) {
				this.children.length = 0;
	
				for (const part of result) {
					this.children.push(part);
				}
			}
		}
		return this;
	}


	// SETTERS FOR GLOBAL ATTRIBUTES

	/** Sets the class attribute to one or more class names, ignoring false, null and undefined values. */
	class(...values: (string | false | null | undefined)[]): this {
		this.attributes.class = Attributes.omitBlanks(values);
		return this;
	}


	/** Sets the id attribute. */
	id(value: string | null | undefined): this {
		this.attributes.id = value;
		return this;
	}


	/** Sets the itemprop attribute. */
	itemprop(value: string | null | undefined): this {
		this.attributes.itemprop = value;
		return this;
	}


	/** Sets the itemscope attribute, optionally with an itemtype URL. */
	itemscope(itemtype?: string): this {
		this.attributes.itemscope = null;
		if (itemtype) this.attributes.itemtype = itemtype;
		return this;
	}


	/** Sets the role attribute to one or more roles, ignoring false, null and undefined values. */
	role(...values: (string | false | null | undefined)[]): this {
		this.attributes.role = Attributes.omitBlanks(values);
		return this;
	}


	/** Sets the style attribute from a string or an object of camelCase CSS properties. */
	style(value: string | Record<string, string | number | boolean | null | undefined> | null | undefined): this {
		if (value == null) {
			this.attributes.style = value;
		}
		else {
			this.attributes.style = typeof value === "string" ? value : toCSS(value);
		}
		return this;
	}


	/** Sets the tabindex attribute, or removes it when value is undefined. */
	tabindex(value: number | null | undefined): this {
		this.attributes.tabindex = value;
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
	
			if (Array.isArray(element.children)) {
				depth += 1;
				const childStyle = element.suppressChildStyle(currentStyle);
				const escapeText = escaping && !(element.constructor as typeof Element).RawText.has(element.symbol);
	
				const expandPart = (part: unknown): void => {
					while (typeof part === "function") {
						part = part();
					}
	
					if (part == null || typeof part === "boolean") {
						return;
					}
					else if (part instanceof Element) {
						expand(part, childStyle);
						endIndent = childStyle == null ? "" : indent;
					}
					else if (Element.#isNested(part)) {
						for (const item of part) {
							expandPart(item);
						}
					}
					else {
						const text = String(part);
						stack.push(escapeText ? escape(text) : text);
					}
				};
	
				for (const part of element.children) {
					expandPart(part);
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
