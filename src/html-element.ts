
import { HTMLAttributes } from './html-attributes.js';
import { Element } from './element.js';


//

export type HTMLElementFactory = (...content: unknown[]) => HTMLElement;

export type VoidHTMLElementFactory = (attributes?: object) => HTMLElement;


export class HTMLElement extends Element<HTMLAttributes> {

	static override readonly Symbol: Record<string, symbol> = {
		a: Symbol("a"),
		abbr: Symbol("abbr"),
		address: Symbol("address"),
		area: Symbol("area"),
		article: Symbol("article"),
		aside: Symbol("aside"),
		audio: Symbol("audio"),
		b: Symbol("b"),
		base: Symbol("base"),
		bdi: Symbol("bdi"),
		bdo: Symbol("bdo"),
		blockquote: Symbol("blockquote"),
		body: Symbol("body"),
		br: Symbol("br"),
		button: Symbol("button"),
		canvas: Symbol("canvas"),
		caption: Symbol("caption"),
		cite: Symbol("cite"),
		code: Symbol("code"),
		col: Symbol("col"),
		colgroup: Symbol("colgroup"),
		data: Symbol("data"),
		datalist: Symbol("datalist"),
		dd: Symbol("dd"),
		del: Symbol("del"),
		details: Symbol("details"),
		dfn: Symbol("dfn"),
		dialog: Symbol("dialog"),
		div: Symbol("div"),
		dl: Symbol("dl"),
		dt: Symbol("dt"),
		em: Symbol("em"),
		embed: Symbol("embed"),
		fieldset: Symbol("fieldset"),
		figcaption: Symbol("figcaption"),
		figure: Symbol("figure"),
		footer: Symbol("footer"),
		form: Symbol("form"),
		h1: Symbol("h1"),
		h2: Symbol("h2"),
		h3: Symbol("h3"),
		h4: Symbol("h4"),
		h5: Symbol("h5"),
		h6: Symbol("h6"),
		head: Symbol("head"),
		header: Symbol("header"),
		hgroup: Symbol("hgroup"),
		hr: Symbol("hr"),
		html: Symbol("html"),
		i: Symbol("i"),
		iframe: Symbol("iframe"),
		img: Symbol("img"),
		input: Symbol("input"),
		ins: Symbol("ins"),
		kbd: Symbol("kbd"),
		label: Symbol("label"),
		legend: Symbol("legend"),
		li: Symbol("li"),
		link: Symbol("link"),
		main: Symbol("main"),
		map: Symbol("map"),
		mark: Symbol("mark"),
		math: Symbol("math"),
		menu: Symbol("menu"),
		menuitem: Symbol("menuitem"),
		meta: Symbol("meta"),
		meter: Symbol("meter"),
		nav: Symbol("nav"),
		noscript: Symbol("noscript"),
		object: Symbol("object"),
		ol: Symbol("ol"),
		optgroup: Symbol("optgroup"),
		option: Symbol("option"),
		output: Symbol("output"),
		p: Symbol("p"),
		param: Symbol("param"),
		picture: Symbol("picture"),
		pre: Symbol("pre"),
		progress: Symbol("progress"),
		q: Symbol("q"),
		rb: Symbol("rb"),
		rp: Symbol("rp"),
		rt: Symbol("rt"),
		rtc: Symbol("rtc"),
		ruby: Symbol("ruby"),
		s: Symbol("s"),
		samp: Symbol("samp"),
		script: Symbol("script"),
		section: Symbol("section"),
		select: Symbol("select"),
		slot: Symbol("slot"),
		small: Symbol("small"),
		source: Symbol("source"),
		span: Symbol("span"),
		strong: Symbol("strong"),
		style: Symbol("style"),
		sub: Symbol("sub"),
		summary: Symbol("summary"),
		sup: Symbol("sup"),
		svg: Symbol("svg"),
		table: Symbol("table"),
		tbody: Symbol("tbody"),
		td: Symbol("td"),
		template: Symbol("template"),
		textarea: Symbol("textarea"),
		tfoot: Symbol("tfoot"),
		th: Symbol("th"),
		thead: Symbol("thead"),
		time: Symbol("time"),
		title: Symbol("title"),
		tr: Symbol("tr"),
		track: Symbol("track"),
		u: Symbol("u"),
		ul: Symbol("ul"),
		var: Symbol("var"),
		video: Symbol("video"),
		wbr: Symbol("wbr")
	};


	static override RawText: Set<symbol> = new Set<symbol>([
		HTMLElement.Symbol.script,
		HTMLElement.Symbol.style
	]);


	/** Defines and registers a symbol for a custom element with the given tag name; does nothing if the name is already defined. */
	static define(name: string): symbol {
		if (!(name in this.Symbol)) {
			(this.Symbol as Record<string, symbol>)[name] = Symbol(name);
		}

		return this.Symbol[name];
	}


	/** Returns true if obj represents an HTML attributes object (not an Element or string). */
	static override hasAttr(obj: object | null | undefined): boolean {
		return !(obj instanceof Element) && typeof obj !== "string" && HTMLAttributes.some(obj);
	}


	/** Returns a constructor for a non-empty HTML element whose first argument can be an object representing attributes. */
	static override NonVoid(symbol: symbol): HTMLElementFactory {
		return (...content: unknown[]) => new HTMLElement(
			symbol,
			new HTMLAttributes(HTMLElement.hasAttr(content[0] as object | null | undefined)
				? content.shift() as object
				: {}
			),
			content as Array<string | Element | (() => Element) | null | undefined>
		);
	}


	/** Returns a constructor for an empty HTML element whose argument can be an object representing attributes. */
	static override Void(symbol: symbol): VoidHTMLElementFactory {
		return (attributes = {}) => new HTMLElement(symbol, new HTMLAttributes(attributes));
	}


	static PhrasingOnly: Set<symbol> = new Set<symbol>([
		HTMLElement.Symbol.a,
		HTMLElement.Symbol.abbr,
		HTMLElement.Symbol.b,
		HTMLElement.Symbol.bdi,
		HTMLElement.Symbol.bdo,
		HTMLElement.Symbol.button,
		HTMLElement.Symbol.caption,
		HTMLElement.Symbol.cite,
		HTMLElement.Symbol.code,
		HTMLElement.Symbol.data,
		HTMLElement.Symbol.dd,
		HTMLElement.Symbol.del,
		HTMLElement.Symbol.dfn,
		HTMLElement.Symbol.dt,
		HTMLElement.Symbol.em,
		HTMLElement.Symbol.figcaption,
		HTMLElement.Symbol.h1,
		HTMLElement.Symbol.h2,
		HTMLElement.Symbol.h3,
		HTMLElement.Symbol.h4,
		HTMLElement.Symbol.h5,
		HTMLElement.Symbol.h6,
		HTMLElement.Symbol.i,
		HTMLElement.Symbol.ins,
		HTMLElement.Symbol.kbd,
		HTMLElement.Symbol.label,
		HTMLElement.Symbol.legend,
		HTMLElement.Symbol.li,
		HTMLElement.Symbol.mark,
		HTMLElement.Symbol.meter,
		HTMLElement.Symbol.option,
		HTMLElement.Symbol.output,
		HTMLElement.Symbol.p,
		HTMLElement.Symbol.pre,
		HTMLElement.Symbol.progress,
		HTMLElement.Symbol.q,
		HTMLElement.Symbol.rb,
		HTMLElement.Symbol.rp,
		HTMLElement.Symbol.rt,
		HTMLElement.Symbol.rtc,
		HTMLElement.Symbol.ruby,
		HTMLElement.Symbol.s,
		HTMLElement.Symbol.samp,
		HTMLElement.Symbol.small,
		HTMLElement.Symbol.span,
		HTMLElement.Symbol.strong,
		HTMLElement.Symbol.sub,
		HTMLElement.Symbol.summary,
		HTMLElement.Symbol.sup,
		HTMLElement.Symbol.td,
		HTMLElement.Symbol.textarea,
		HTMLElement.Symbol.th,
		HTMLElement.Symbol.time,
		HTMLElement.Symbol.u,
		HTMLElement.Symbol.var
	])


	/** Pushes the DOCTYPE declaration onto the stack if this element is the root html element. */
	protected override beforeExpand(stack: string[]): void {
		if (this.symbol === HTMLElement.Symbol.html) {
			stack.push("<!DOCTYPE html>");
		}
	}


	/** Returns null to suppress whitespace for phrasing-only elements, otherwise passes currentStyle through. */
	protected override suppressChildStyle(currentStyle: number | null): number | null {
		return HTMLElement.PhrasingOnly.has(this.symbol) ? null : currentStyle;
	}


	/** Creates a new HTMLAttributes instance from a plain object. */
	protected override newAttributes(obj: object): HTMLAttributes {
		return new HTMLAttributes(obj);
	}


	// SETTERS FOR GLOBAL ATTRIBUTES

	/** Sets the accesskey attribute, or removes it when value is undefined. */
	accesskey(value: string | null | undefined): this {
		this.attributes.accesskey = value;
		return this;
	}
	
	
	/** Sets the contenteditable attribute, or removes it when value is undefined. */
	contenteditable(value: boolean | null | undefined): this {
		this.attributes.contenteditable = value;
		return this;
	}
	
	
	/** Sets the dir attribute to 'ltr', 'rtl' or 'auto', or removes it when value is undefined. */
	dir(value: 'ltr' | 'rtl' | 'auto' | null | undefined): this {
		this.attributes.dir = value;
		return this;
	}
	
	
	/** Sets the draggable attribute, or removes it when value is undefined. */
	draggable(value: boolean | 'auto' | null | undefined): this {
		this.attributes.draggable = value;
		return this;
	}
	
	
	/** Sets the enterkeyhint attribute, or removes it when value is undefined. */
	enterkeyhint(value: 'done' | 'enter' | 'go' | 'next' | 'previous' | 'search' | 'send' | null | undefined): this {
		this.attributes.enterkeyhint = value;
		return this;
	}
	
	
	/** Sets the hidden attribute; false removes it, true (default) sets it. */
	hidden(applies: boolean | null | undefined = true): this {
		this.attributes.hidden = applies;
		return this;
	}
	
	
	/** Sets the inert attribute, or removes it when value is undefined. */
	inert(value: string | null | undefined = null): this {
		this.attributes.inert = value;
		return this;
	}
	
	
	/** Sets the inputmode attribute, or removes it when value is undefined. */
	inputmode(value: 'text' | 'none' | 'tel' | 'email' | 'url' | 'numeric' | 'decimal' | 'search' | null | undefined = null): this {
		this.attributes.inputmode = value;
		return this;
	}
	
	
	/** Sets the lang attribute to a two-letter language code (lowercase), or removes it when value is undefined. */
	lang(value: string | null | undefined): this {
		this.attributes.lang = value;
		return this;
	}
	
	
	/** Sets the popover attribute; false removes it, true (default) sets it. */
	popover(applies: boolean | null | undefined = true): this {
		this.attributes.popover = applies;
		return this;
	}
	
	
	/** Sets the spellcheck attribute, or removes it when value is undefined. */
	spellcheck(value: boolean | null | undefined): this {
		this.attributes.spellcheck = value;
		return this;
	}
	
	
	/** Sets the tabindex attribute, or removes it when value is undefined. */
	tabindex(value: bigint | null | undefined): this {
		this.attributes.tabindex = value;
		return this;
	}
	
	
	/** Sets the title attribute, or removes it when value is undefined. */
	title(value: string | null | undefined): this {
		this.attributes.title = value;
		return this;
	}
	
	
	/** Sets the translate attribute to 'yes' or 'no', or removes it when value is undefined. */
	translate(value: 'yes' | 'no' | null | undefined): this {
		this.attributes.translate = value;
		return this;
	}
	
	
	// SETTERS FOR SPECIFIC ATTRIBUTES
	
	/** Sets the alt attribute, or removes it when value is undefined. */
	alt(value: string | null | undefined): this {
		this.attributes.alt = value;
		return this;
	}
	
	
	/** Sets the autofocus attribute; false removes it, true (default) sets it. */
	autofocus(applies: boolean | null | undefined = true): this {
		this.attributes.autofocus = applies;
		return this;
	}
	
	
	/** Sets the charset attribute, or removes it when value is undefined. */
	charset(value: string | null | undefined): this {
		this.attributes.charset = value;
		return this;
	}
	
	
	/** Sets the checked attribute; false removes it, true (default) sets it. */
	checked(applies: boolean | null | undefined = true): this {
		this.attributes.checked = applies;
		return this;
	}
	
	
	/** Sets the cols attribute, or removes it when value is undefined. */
	cols(value: number | null | undefined): this {
		this.attributes.cols = value;
		return this;
	}
	
	
	/** Sets the colspan attribute, or removes it when value is undefined. */
	colspan(value: number | null | undefined): this {
		this.attributes.colspan = value;
		return this;
	}
	
	
	/** Sets the disabled attribute; false removes it, true (default) sets it. */
	disabled(applies: boolean | null | undefined = true): this {
		this.attributes.disabled = applies;
		return this;
	}
	
	
	/** Sets the for attribute, or removes it when value is undefined. */
	for(value: string | null | undefined): this {
		this.attributes.for = value;
		return this;
	}
	
	
	/** Sets the formnovalidate attribute; false removes it, true (default) sets it. */
	formnovalidate(applies: boolean | null | undefined = true): this {
		this.attributes.formnovalidate = applies;
		return this;
	}
	
	
	/** Sets the height attribute, or removes it when value is undefined. */
	height(value: number | string | null | undefined): this {
		this.attributes.height = value;
		return this;
	}
	
	
	/** Sets the href attribute, or removes it when value is undefined. */
	href(value: string | null | undefined): this {
		this.attributes.href = value;
		return this;
	}
	
	
	/** Sets the max attribute, or removes it when value is undefined. */
	max(value: number | string | null | undefined): this {
		this.attributes.max = value;
		return this;
	}
	
	
	/** Sets the min attribute, or removes it when value is undefined. */
	min(value: number | string | null | undefined): this {
		this.attributes.min = value;
		return this;
	}
	
	
	/** Sets the multiple attribute; false removes it, true (default) sets it. */
	multiple(applies: boolean | null | undefined = true): this {
		this.attributes.multiple = applies;
		return this;
	}
	
	
	/** Sets the name attribute, or removes it when value is undefined. */
	name(value: string | null | undefined): this {
		this.attributes.name = value;
		return this;
	}
	
	
	/** Sets the placeholder attribute, or removes it when value is undefined. */
	placeholder(value: string | null | undefined): this {
		this.attributes.placeholder = value;
		return this;
	}
	
	
	/** Sets the readonly attribute; false removes it, true (default) sets it. */
	readonly(applies: boolean | null | undefined = true): this {
		this.attributes.readonly = applies;
		return this;
	}
	
	
	/** Sets the required attribute; false removes it, true (default) sets it. */
	required(applies: boolean | null | undefined = true): this {
		this.attributes.required = applies;
		return this;
	}
	
	
	/** Sets the rows attribute, or removes it when value is undefined. */
	rows(value: number | null | undefined): this {
		this.attributes.rows = value;
		return this;
	}
	
	
	/** Sets the rowspan attribute, or removes it when value is undefined. */
	rowspan(value: number | null | undefined): this {
		this.attributes.rowspan = value;
		return this;
	}
	
	
	/** Sets the selected attribute; false removes it, true (default) sets it. */
	selected(applies: boolean | null | undefined = true): this {
		this.attributes.selected = applies;
		return this;
	}
	
	
	/** Sets the size attribute, or removes it when value is undefined. */
	size(value: number | null | undefined): this {
		this.attributes.size = value;
		return this;
	}
	
	
	/** Sets the src attribute, or removes it when value is undefined. */
	src(value: string | null | undefined): this {
		this.attributes.src = value;
		return this;
	}
	
	
	/** Sets the step attribute, or removes it when value is undefined. */
	step(value: number | string | null | undefined): this {
		this.attributes.step = value;
		return this;
	}
	
	
	/** Sets the type attribute, or removes it when value is undefined. */
	type(value: string | null | undefined): this {
		this.attributes.type = value;
		return this;
	}
	
	
	/** Sets the value attribute, or removes it when value is undefined. */
	value(value: string | null | undefined): this {
		this.attributes.value = value;
		return this;
	}
	
	
	/** Sets the width attribute, or removes it when value is undefined. */
	width(value: number | string | null | undefined): this {
		this.attributes.width = value;
		return this;
	}
}
