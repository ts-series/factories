
import { HTMLAttributes } from './html-attributes.ts';
import { Element, type Part } from './element.ts';
import { Attributes } from './attributes.ts';


// HTML ELEMENT SYMBOLS

const HTMLSymbols = {
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
} as const;


//

export type HTMLElementFactory = (...content: unknown[]) => HTMLElement;

export type VoidHTMLElementFactory = (attributes?: object) => HTMLElement;


export class HTMLElement extends Element<HTMLAttributes> {

	static override readonly Symbol: typeof HTMLSymbols & Record<string, symbol> = { ...HTMLSymbols };


	static override RawText: Set<symbol> = new Set<symbol>([
		HTMLSymbols.script,
		HTMLSymbols.style
	]);


	/** Defines and registers a symbol for a custom element with the given tag name; does nothing if the name is already defined. */
	static define(name: string): symbol {
		if (!Object.hasOwn(this.Symbol, name)) {
			(this.Symbol as Record<string, symbol>)[name] = Symbol(name);
		}

		return this.Symbol[name];
	}


	/** Returns a constructor for a non-empty HTML element whose first argument can be an object representing attributes. */
	static override NonVoid(symbol: symbol): HTMLElementFactory {
		return (...content: unknown[]) => new HTMLElement(
			symbol,
			new HTMLAttributes(HTMLElement.hasAttr(content[0])
				? content.shift() as object
				: {}
			),
			content
		);
	}


	/** Returns a constructor for an empty HTML element whose argument can be an object representing attributes. */
	static override Void(symbol: symbol): VoidHTMLElementFactory {
		return (attributes = {}) => new HTMLElement(symbol, new HTMLAttributes(attributes));
	}


	static PhrasingOnly: Set<symbol> = new Set<symbol>([
		HTMLSymbols.a,
		HTMLSymbols.abbr,
		HTMLSymbols.b,
		HTMLSymbols.bdi,
		HTMLSymbols.bdo,
		HTMLSymbols.button,
		HTMLSymbols.caption,
		HTMLSymbols.cite,
		HTMLSymbols.code,
		HTMLSymbols.data,
		HTMLSymbols.dd,
		HTMLSymbols.del,
		HTMLSymbols.dfn,
		HTMLSymbols.dt,
		HTMLSymbols.em,
		HTMLSymbols.figcaption,
		HTMLSymbols.h1,
		HTMLSymbols.h2,
		HTMLSymbols.h3,
		HTMLSymbols.h4,
		HTMLSymbols.h5,
		HTMLSymbols.h6,
		HTMLSymbols.i,
		HTMLSymbols.ins,
		HTMLSymbols.kbd,
		HTMLSymbols.label,
		HTMLSymbols.legend,
		HTMLSymbols.li,
		HTMLSymbols.mark,
		HTMLSymbols.meter,
		HTMLSymbols.option,
		HTMLSymbols.output,
		HTMLSymbols.p,
		HTMLSymbols.pre,
		HTMLSymbols.progress,
		HTMLSymbols.q,
		HTMLSymbols.rb,
		HTMLSymbols.rp,
		HTMLSymbols.rt,
		HTMLSymbols.rtc,
		HTMLSymbols.ruby,
		HTMLSymbols.s,
		HTMLSymbols.samp,
		HTMLSymbols.small,
		HTMLSymbols.span,
		HTMLSymbols.strong,
		HTMLSymbols.sub,
		HTMLSymbols.summary,
		HTMLSymbols.sup,
		HTMLSymbols.td,
		HTMLSymbols.textarea,
		HTMLSymbols.th,
		HTMLSymbols.time,
		HTMLSymbols.u,
		HTMLSymbols.var
	])


	/** Pushes the DOCTYPE declaration onto the stack if this element is the root html element. */
	protected override beforeExpand(stack: string[]): void {
		if (this.symbol === HTMLSymbols.html) {
			stack.push("<!DOCTYPE html>");
		}
	}


	/** Returns null to suppress whitespace for phrasing-only elements, otherwise passes currentStyle through. */
	protected override suppressChildStyle(currentStyle: number | null): number | null {
		return HTMLElement.PhrasingOnly.has(this.symbol) ? null : currentStyle;
	}


	// SETTERS FOR GLOBAL ATTRIBUTES

	/** Sets the accesskey attribute, or removes it when value is undefined. */
	accesskey(value: string | null | undefined): this {
		this.attributes.accesskey = value;
		return this;
	}


	/** Sets the autocapitalize attribute, or removes it when value is undefined. */
	autocapitalize(value: 'none' | 'off' | 'on' | 'sentences' | 'words' | 'characters' | null | undefined): this {
		this.attributes.autocapitalize = value;
		return this;
	}


	/** Sets the contenteditable attribute, or removes it when value is undefined. */
	contenteditable(value: boolean | 'plaintext-only' | null | undefined): this {
		this.attributes.contenteditable = value;
		return this;
	}


	/** Sets the dir attribute to 'ltr', 'rtl' or 'auto', or removes it when value is undefined. */
	dir(value: 'ltr' | 'rtl' | 'auto' | null | undefined): this {
		this.attributes.dir = value;
		return this;
	}


	/** Sets the draggable attribute, or removes it when value is undefined. */
	draggable(value: boolean | null | undefined): this {
		this.attributes.draggable = value;
		return this;
	}


	/** Sets the enterkeyhint attribute, or removes it when value is undefined. */
	enterkeyhint(value: 'done' | 'enter' | 'go' | 'next' | 'previous' | 'search' | 'send' | null | undefined): this {
		this.attributes.enterkeyhint = value;
		return this;
	}


	/** Sets the exportparts attribute, or removes it when value is undefined. */
	exportparts(value: string | null | undefined): this {
		this.attributes.exportparts = value;
		return this;
	}


	/** Sets the hidden attribute: no argument or true sets it without a value, a keyword sets that keyword, false or undefined removes it. */
	hidden(...args: [] | [value: '' | 'hidden' | 'until-found' | boolean | null | undefined]): this {
		const value = args.length === 0 ? true : args[0];
		this.attributes.hidden = value === true ? null : value === false ? undefined : value;
		return this;
	}


	/** Sets the inert attribute: no argument or true sets it, false or undefined removes it. */
	inert(...args: [] | [applies: boolean | null | undefined]): this {
		this.attributes.inert = args.length === 0 ? true : args[0];
		return this;
	}


	/** Sets the inputmode attribute, or removes it when value is undefined. */
	inputmode(value: 'text' | 'none' | 'tel' | 'email' | 'url' | 'numeric' | 'decimal' | 'search' | null | undefined): this {
		this.attributes.inputmode = value;
		return this;
	}


	/** Sets the is attribute, or removes it when value is undefined. */
	is(value: string | null | undefined): this {
		this.attributes.is = value;
		return this;
	}


	/** Sets the lang attribute to a language code, or removes it when value is undefined. */
	lang(value: string | null | undefined): this {
		this.attributes.lang = value;
		return this;
	}


	/** Sets the nonce attribute, or removes it when value is undefined. */
	nonce(value: string | null | undefined): this {
		this.attributes.nonce = value;
		return this;
	}


	/** Sets the part attribute to one or more part names, ignoring false, null and undefined values. */
	part(...values: (string | false | null | undefined)[]): this {
		this.attributes.part = Attributes.omitBlanks(values);
		return this;
	}


	/** Sets the popover attribute: no argument or true sets it without a value (auto), a keyword sets that keyword, false or undefined removes it. */
	popover(...args: [] | [value: '' | 'auto' | 'manual' | 'hint' | boolean | null | undefined]): this {
		const value = args.length === 0 ? true : args[0];
		this.attributes.popover = value === true ? null : value === false ? undefined : value;
		return this;
	}


	/** Sets the slot attribute, or removes it when value is undefined. */
	slot(value: string | null | undefined): this {
		this.attributes.slot = value;
		return this;
	}


	/** Sets the spellcheck attribute, or removes it when value is undefined. */
	spellcheck(value: boolean | null | undefined): this {
		this.attributes.spellcheck = value;
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

	/** Sets the accept attribute, or removes it when value is undefined. */
	accept(value: string | null | undefined): this {
		this.attributes.accept = value;
		return this;
	}


	/** Sets the action attribute, or removes it when value is undefined. */
	action(value: string | null | undefined): this {
		this.attributes.action = value;
		return this;
	}


	/** Sets the allowfullscreen attribute: no argument or true sets it, false or undefined removes it. */
	allowfullscreen(...args: [] | [applies: boolean | null | undefined]): this {
		this.attributes.allowfullscreen = args.length === 0 ? true : args[0];
		return this;
	}


	/** Sets the alt attribute, or removes it when value is undefined. */
	alt(value: string | null | undefined): this {
		this.attributes.alt = value;
		return this;
	}


	/** Sets the async attribute: no argument or true sets it, false or undefined removes it. */
	async(...args: [] | [applies: boolean | null | undefined]): this {
		this.attributes.async = args.length === 0 ? true : args[0];
		return this;
	}


	/** Sets the autocomplete attribute, or removes it when value is undefined. */
	autocomplete(value: string | null | undefined): this {
		this.attributes.autocomplete = value;
		return this;
	}


	/** Sets the autofocus attribute: no argument or true sets it, false or undefined removes it. */
	autofocus(...args: [] | [applies: boolean | null | undefined]): this {
		this.attributes.autofocus = args.length === 0 ? true : args[0];
		return this;
	}


	/** Sets the autoplay attribute: no argument or true sets it, false or undefined removes it. */
	autoplay(...args: [] | [applies: boolean | null | undefined]): this {
		this.attributes.autoplay = args.length === 0 ? true : args[0];
		return this;
	}


	/** Sets the charset attribute, or removes it when value is undefined. */
	charset(value: string | null | undefined): this {
		this.attributes.charset = value;
		return this;
	}


	/** Sets the checked attribute: no argument or true sets it, false or undefined removes it. */
	checked(...args: [] | [applies: boolean | null | undefined]): this {
		this.attributes.checked = args.length === 0 ? true : args[0];
		return this;
	}


	/** Sets the cite attribute, or removes it when value is undefined. */
	cite(value: string | null | undefined): this {
		this.attributes.cite = value;
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


	/** Sets the content attribute, or removes it when value is undefined. */
	content(value: string | null | undefined): this {
		this.attributes.content = value;
		return this;
	}


	/** Sets the controls attribute: no argument or true sets it, false or undefined removes it. */
	controls(...args: [] | [applies: boolean | null | undefined]): this {
		this.attributes.controls = args.length === 0 ? true : args[0];
		return this;
	}


	/** Sets the crossorigin attribute, or removes it when value is undefined. */
	crossorigin(value: '' | 'anonymous' | 'use-credentials' | null | undefined): this {
		this.attributes.crossorigin = value;
		return this;
	}


	/** Sets the default attribute: no argument or true sets it, false or undefined removes it. */
	default(...args: [] | [applies: boolean | null | undefined]): this {
		this.attributes.default = args.length === 0 ? true : args[0];
		return this;
	}


	/** Sets the defer attribute: no argument or true sets it, false or undefined removes it. */
	defer(...args: [] | [applies: boolean | null | undefined]): this {
		this.attributes.defer = args.length === 0 ? true : args[0];
		return this;
	}


	/** Sets the disabled attribute: no argument or true sets it, false or undefined removes it. */
	disabled(...args: [] | [applies: boolean | null | undefined]): this {
		this.attributes.disabled = args.length === 0 ? true : args[0];
		return this;
	}


	/** Sets the download attribute, or removes it when value is undefined. */
	download(value: string | null | undefined): this {
		this.attributes.download = value;
		return this;
	}


	/** Sets the enctype attribute, or removes it when value is undefined. */
	enctype(value: 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain' | null | undefined): this {
		this.attributes.enctype = value;
		return this;
	}


	/** Sets the for attribute, or removes it when value is undefined. */
	for(value: string | null | undefined): this {
		this.attributes.for = value;
		return this;
	}


	/** Sets the form attribute, or removes it when value is undefined. */
	form(value: string | null | undefined): this {
		this.attributes.form = value;
		return this;
	}


	/** Sets the formaction attribute, or removes it when value is undefined. */
	formaction(value: string | null | undefined): this {
		this.attributes.formaction = value;
		return this;
	}


	/** Sets the formmethod attribute, or removes it when value is undefined. */
	formmethod(value: 'get' | 'post' | 'dialog' | null | undefined): this {
		this.attributes.formmethod = value;
		return this;
	}


	/** Sets the formnovalidate attribute: no argument or true sets it, false or undefined removes it. */
	formnovalidate(...args: [] | [applies: boolean | null | undefined]): this {
		this.attributes.formnovalidate = args.length === 0 ? true : args[0];
		return this;
	}


	/** Sets the formtarget attribute, or removes it when value is undefined. */
	formtarget(value: string | null | undefined): this {
		this.attributes.formtarget = value;
		return this;
	}


	/** Sets the headers attribute to one or more cell ids, ignoring false, null and undefined values. */
	headers(...values: (string | false | null | undefined)[]): this {
		this.attributes.headers = Attributes.omitBlanks(values);
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


	/** Sets the hreflang attribute, or removes it when value is undefined. */
	hreflang(value: string | null | undefined): this {
		this.attributes.hreflang = value;
		return this;
	}


	/** Sets the integrity attribute, or removes it when value is undefined. */
	integrity(value: string | null | undefined): this {
		this.attributes.integrity = value;
		return this;
	}


	/** Sets the ismap attribute: no argument or true sets it, false or undefined removes it. */
	ismap(...args: [] | [applies: boolean | null | undefined]): this {
		this.attributes.ismap = args.length === 0 ? true : args[0];
		return this;
	}


	/** Sets the label attribute, or removes it when value is undefined. */
	label(value: string | null | undefined): this {
		this.attributes.label = value;
		return this;
	}


	/** Sets the list attribute, or removes it when value is undefined. */
	list(value: string | null | undefined): this {
		this.attributes.list = value;
		return this;
	}


	/** Sets the loading attribute to 'eager' or 'lazy', or removes it when value is undefined. */
	loading(value: 'eager' | 'lazy' | null | undefined): this {
		this.attributes.loading = value;
		return this;
	}


	/** Sets the loop attribute: no argument or true sets it, false or undefined removes it. */
	loop(...args: [] | [applies: boolean | null | undefined]): this {
		this.attributes.loop = args.length === 0 ? true : args[0];
		return this;
	}


	/** Sets the max attribute, or removes it when value is undefined. */
	max(value: number | string | null | undefined): this {
		this.attributes.max = value;
		return this;
	}


	/** Sets the maxlength attribute, or removes it when value is undefined. */
	maxlength(value: number | null | undefined): this {
		this.attributes.maxlength = value;
		return this;
	}


	/** Sets the media attribute, or removes it when value is undefined. */
	media(value: string | null | undefined): this {
		this.attributes.media = value;
		return this;
	}


	/** Sets the method attribute, or removes it when value is undefined. */
	method(value: 'get' | 'post' | 'dialog' | null | undefined): this {
		this.attributes.method = value;
		return this;
	}


	/** Sets the min attribute, or removes it when value is undefined. */
	min(value: number | string | null | undefined): this {
		this.attributes.min = value;
		return this;
	}


	/** Sets the minlength attribute, or removes it when value is undefined. */
	minlength(value: number | null | undefined): this {
		this.attributes.minlength = value;
		return this;
	}


	/** Sets the multiple attribute: no argument or true sets it, false or undefined removes it. */
	multiple(...args: [] | [applies: boolean | null | undefined]): this {
		this.attributes.multiple = args.length === 0 ? true : args[0];
		return this;
	}


	/** Sets the muted attribute: no argument or true sets it, false or undefined removes it. */
	muted(...args: [] | [applies: boolean | null | undefined]): this {
		this.attributes.muted = args.length === 0 ? true : args[0];
		return this;
	}


	/** Sets the name attribute, or removes it when value is undefined. */
	name(value: string | null | undefined): this {
		this.attributes.name = value;
		return this;
	}


	/** Sets the novalidate attribute: no argument or true sets it, false or undefined removes it. */
	novalidate(...args: [] | [applies: boolean | null | undefined]): this {
		this.attributes.novalidate = args.length === 0 ? true : args[0];
		return this;
	}


	/** Sets the open attribute: no argument or true sets it, false or undefined removes it. */
	open(...args: [] | [applies: boolean | null | undefined]): this {
		this.attributes.open = args.length === 0 ? true : args[0];
		return this;
	}


	/** Sets the pattern attribute, or removes it when value is undefined. */
	pattern(value: string | null | undefined): this {
		this.attributes.pattern = value;
		return this;
	}


	/** Sets the placeholder attribute, or removes it when value is undefined. */
	placeholder(value: string | null | undefined): this {
		this.attributes.placeholder = value;
		return this;
	}


	/** Sets the playsinline attribute: no argument or true sets it, false or undefined removes it. */
	playsinline(...args: [] | [applies: boolean | null | undefined]): this {
		this.attributes.playsinline = args.length === 0 ? true : args[0];
		return this;
	}


	/** Sets the readonly attribute: no argument or true sets it, false or undefined removes it. */
	readonly(...args: [] | [applies: boolean | null | undefined]): this {
		this.attributes.readonly = args.length === 0 ? true : args[0];
		return this;
	}


	/** Sets the rel attribute to one or more link types, ignoring false, null and undefined values. */
	rel(...values: (string | false | null | undefined)[]): this {
		this.attributes.rel = Attributes.omitBlanks(values);
		return this;
	}


	/** Sets the required attribute: no argument or true sets it, false or undefined removes it. */
	required(...args: [] | [applies: boolean | null | undefined]): this {
		this.attributes.required = args.length === 0 ? true : args[0];
		return this;
	}


	/** Sets the reversed attribute: no argument or true sets it, false or undefined removes it. */
	reversed(...args: [] | [applies: boolean | null | undefined]): this {
		this.attributes.reversed = args.length === 0 ? true : args[0];
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


	/** Sets the sandbox attribute to one or more restrictions, ignoring false, null and undefined values. */
	sandbox(...values: (string | false | null | undefined)[]): this {
		this.attributes.sandbox = Attributes.omitBlanks(values);
		return this;
	}


	/** Sets the scope attribute, or removes it when value is undefined. */
	scope(value: 'row' | 'col' | 'rowgroup' | 'colgroup' | null | undefined): this {
		this.attributes.scope = value;
		return this;
	}


	/** Sets the selected attribute: no argument or true sets it, false or undefined removes it. */
	selected(...args: [] | [applies: boolean | null | undefined]): this {
		this.attributes.selected = args.length === 0 ? true : args[0];
		return this;
	}


	/** Sets the size attribute, or removes it when value is undefined. */
	size(value: number | null | undefined): this {
		this.attributes.size = value;
		return this;
	}


	/** Sets the sizes attribute, or removes it when value is undefined. */
	sizes(value: string | null | undefined): this {
		this.attributes.sizes = value;
		return this;
	}


	/** Sets the span attribute, or removes it when value is undefined. */
	span(value: number | null | undefined): this {
		this.attributes.span = value;
		return this;
	}


	/** Sets the src attribute, or removes it when value is undefined. */
	src(value: string | null | undefined): this {
		this.attributes.src = value;
		return this;
	}


	/** Sets the srcset attribute, or removes it when value is undefined. */
	srcset(value: string | null | undefined): this {
		this.attributes.srcset = value;
		return this;
	}


	/** Sets the step attribute, or removes it when value is undefined. */
	step(value: number | string | null | undefined): this {
		this.attributes.step = value;
		return this;
	}


	/** Sets the target attribute, or removes it when value is undefined. */
	target(value: '_self' | '_blank' | '_parent' | '_top' | (string & {}) | null | undefined): this {
		this.attributes.target = value;
		return this;
	}


	/** Sets the type attribute, or removes it when value is undefined. */
	type(value: string | null | undefined): this {
		this.attributes.type = value;
		return this;
	}


	/** Sets the usemap attribute, or removes it when value is undefined. */
	usemap(value: string | null | undefined): this {
		this.attributes.usemap = value;
		return this;
	}


	/** Sets the value attribute, or removes it when value is undefined. */
	value(value: number | string | null | undefined): this {
		this.attributes.value = value;
		return this;
	}


	/** Sets the width attribute, or removes it when value is undefined. */
	width(value: number | string | null | undefined): this {
		this.attributes.width = value;
		return this;
	}


	/** Sets the wrap attribute to 'soft' or 'hard', or removes it when value is undefined. */
	wrap(value: 'soft' | 'hard' | null | undefined): this {
		this.attributes.wrap = value;
		return this;
	}
}
