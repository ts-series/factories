
import { HTMLAttributes } from './html-attributes.js';
import { Element } from './element.js';


//

export type HTMLElementFactory = (...content: unknown[]) => HTMLElement;

export type VoidHTMLElementFactory = (attributes?: object) => HTMLElement;


export class HTMLElement extends Element<HTMLAttributes> {

	static override Symbol: Record<string, symbol> = Object.freeze({
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
	})


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
		HTMLElement.Symbol.span,
		HTMLElement.Symbol.a,
		HTMLElement.Symbol.strong,
		HTMLElement.Symbol.em,
		HTMLElement.Symbol.b,
		HTMLElement.Symbol.i,
		HTMLElement.Symbol.small,
		HTMLElement.Symbol.sub,
		HTMLElement.Symbol.sup,
		HTMLElement.Symbol.mark,
		HTMLElement.Symbol.s,
		HTMLElement.Symbol.u,
		HTMLElement.Symbol.code,
		HTMLElement.Symbol.kbd,
		HTMLElement.Symbol.samp,
		HTMLElement.Symbol.var,
		HTMLElement.Symbol.time,
		HTMLElement.Symbol.data,
		HTMLElement.Symbol.cite,
		HTMLElement.Symbol.q,
		HTMLElement.Symbol.bdi,
		HTMLElement.Symbol.bdo,
		HTMLElement.Symbol.abbr,
		HTMLElement.Symbol.dfn,
		HTMLElement.Symbol.ins,
		HTMLElement.Symbol.del,
		HTMLElement.Symbol.rb,
		HTMLElement.Symbol.rp,
		HTMLElement.Symbol.rt,
		HTMLElement.Symbol.rtc,
		HTMLElement.Symbol.ruby,
		HTMLElement.Symbol.p,
		HTMLElement.Symbol.h1,
		HTMLElement.Symbol.h2,
		HTMLElement.Symbol.h3,
		HTMLElement.Symbol.h4,
		HTMLElement.Symbol.h5,
		HTMLElement.Symbol.h6,
		HTMLElement.Symbol.dt,
		HTMLElement.Symbol.dd,
		HTMLElement.Symbol.li,
		HTMLElement.Symbol.th,
		HTMLElement.Symbol.td,
		HTMLElement.Symbol.caption,
		HTMLElement.Symbol.figcaption,
		HTMLElement.Symbol.summary,
		HTMLElement.Symbol.legend,
		HTMLElement.Symbol.label,
		HTMLElement.Symbol.button,
		HTMLElement.Symbol.textarea,
		HTMLElement.Symbol.option,
		HTMLElement.Symbol.output,
		HTMLElement.Symbol.meter,
		HTMLElement.Symbol.progress,
		HTMLElement.Symbol.pre,
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

	/** Sets the accesskey attribute to a single printable character including accented and others that can be generated by keyboard. */
	accesskey(value: string): this {
		this.attributes.accesskey = value;
		return this;
	}


	/** Sets the class attribute to one or more class names. */
	class(...values: string[]): this {
		this.attributes.class = values;
		return this;
	}


	/** Sets the contenteditable attribute. */
	contenteditable(value: boolean): this {
		this.attributes.contenteditable = value;
		return this;
	}


	/** Sets the dir attribute to 'ltr', 'rtl' or 'auto'. */
	dir(value: 'ltr' | 'rtl' | 'auto'): this {
		this.attributes.dir = value;
		return this;
	}


	/** Sets the draggable attribute. */
	draggable(value: boolean | 'auto'): this {
		this.attributes.draggable = value;
		return this;
	}


	/** Sets the enterkeyhint attribute. */
	enterkeyhint(value: 'done' | 'enter' | 'go' | 'next' | 'previous' | 'search' | 'send'): this {
		this.attributes.enterkeyhint = value;
		return this;
	}


	/** Sets the hidden attribute. */
	hidden(): this {
		this.attributes.hidden = null;
		return this;
	}


	/** Sets the id attribute. */
	id(value: string): this {
		this.attributes.id = value;
		return this;
	}


	/** Sets the inert attribute. */
	inert(value: string | null = null): this {
		this.attributes.inert = value;
		return this;
	}


	/** Sets the inputmode attribute. */
	inputmode(value: 'text' | 'none' | 'tel' | 'email' | 'url' | 'numeric' | 'decimal' | 'search' | null = null): this {
		this.attributes.inputmode = value;
		return this;
	}


	/** Sets the lang attribute to a two-letter language code (lowercase). */
	lang(value: string): this {
		this.attributes.lang = value;
		return this;
	}


	/** Sets the popover attribute. */
	popover(): this {
		this.attributes.popover = null;
		return this;
	}


	/** Sets the spellcheck attribute. */
	spellcheck(value: boolean): this {
		this.attributes.spellcheck = value;
		return this;
	}


	/** Sets the style attribute. */
	style(value: string): this {
		this.attributes.style = value;
		return this;
	}


	/** Sets the tabindex attribute. */
	tabindex(value: bigint): this {
		this.attributes.tabindex = value;
		return this;
	}


	/** Sets the title attribute. */
	title(value: string): this {
		this.attributes.title = value;
		return this;
	}


	/** Sets the translate attribute to 'yes' or 'no'. */
	translate(value: 'yes' | 'no'): this {
		this.attributes.translate = value;
		return this;
	}


	// SETTERS FOR SPECIFIC ATTRIBUTES

	/** Sets the alt attribute. */
	alt(value: string): this {
		this.attributes.alt = value;
		return this;
	}


	/** Sets the autofocus attribute if applies is true. */
	autofocus(applies: boolean = true): this {
		if (applies) this.attributes.autofocus = null;
		return this;
	}


	/** Sets the charset attribute. */
	charset(value: string): this {
		this.attributes.charset = value;
		return this;
	}


	/** Sets the checked attribute if applies is true. */
	checked(applies: boolean = true): this {
		if (applies) this.attributes.checked = null;
		return this;
	}


	/** Sets the cols attribute. */
	cols(value: number): this {
		this.attributes.cols = value;
		return this;
	}


	/** Sets the colspan attribute. */
	colspan(value: number): this {
		this.attributes.colspan = value;
		return this;
	}


	/** Sets the disabled attribute if applies is true. */
	disabled(applies: boolean = true): this {
		if (applies) this.attributes.disabled = null;
		return this;
	}


	/** Sets the for attribute. */
	for(value: string): this {
		this.attributes.for = value;
		return this;
	}


	/** Sets the formnovalidate attribute if applies is true. */
	formnovalidate(applies: boolean = true): this {
		if (applies) this.attributes.formnovalidate = null;
		return this;
	}


	/** Sets the height attribute. */
	height(value: number | string): this {
		this.attributes.height = value;
		return this;
	}


	/** Sets the href attribute. */
	href(value: string): this {
		this.attributes.href = value;
		return this;
	}


	/** Sets the max attribute. */
	max(value: number | string): this {
		this.attributes.max = value;
		return this;
	}


	/** Sets the min attribute. */
	min(value: number | string): this {
		this.attributes.min = value;
		return this;
	}


	/** Sets the multiple attribute if applies is true. */
	multiple(applies: boolean = true): this {
		if (applies) this.attributes.multiple = null;
		return this;
	}


	/** Sets the name attribute. */
	name(value: string): this {
		this.attributes.name = value;
		return this;
	}


	/** Sets the placeholder attribute. */
	placeholder(value: string): this {
		this.attributes.placeholder = value;
		return this;
	}


	/** Sets the readonly attribute if applies is true. */
	readonly(applies: boolean = true): this {
		if (applies) this.attributes.readonly = null;
		return this;
	}


	/** Sets the required attribute if applies is true. */
	required(applies: boolean = true): this {
		if (applies) this.attributes.required = null;
		return this;
	}


	/** Sets the rows attribute. */
	rows(value: number): this {
		this.attributes.rows = value;
		return this;
	}


	/** Sets the rowspan attribute. */
	rowspan(value: number): this {
		this.attributes.rowspan = value;
		return this;
	}


	/** Sets the selected attribute if applies is true. */
	selected(applies: boolean = true): this {
		if (applies) this.attributes.selected = null;
		return this;
	}


	/** Sets the size attribute. */
	size(value: number): this {
		this.attributes.size = value;
		return this;
	}


	/** Sets the src attribute. */
	src(value: string): this {
		this.attributes.src = value;
		return this;
	}


	/** Sets the step attribute. */
	step(value: number | string): this {
		this.attributes.step = value;
		return this;
	}


	/** Sets the type attribute. */
	type(value: string): this {
		this.attributes.type = value;
		return this;
	}


	/** Sets the value attribute. */
	value(value: string): this {
		this.attributes.value = value;
		return this;
	}


	/** Sets the width attribute. */
	width(value: number | string): this {
		this.attributes.width = value;
		return this;
	}
}
