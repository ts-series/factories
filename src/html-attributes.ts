
import { Attributes, toKebab, type AttributeProps } from './attributes.ts';


// HTML-SPECIFIC ATTRIBUTE SYMBOLS

const HTMLBooleanSymbols = {
	allowfullscreen: Symbol("allowfullscreen"),
	async: Symbol("async"),
	autofocus: Symbol("autofocus"),
	autoplay: Symbol("autoplay"),
	checked: Symbol("checked"),
	controls: Symbol("controls"),
	default: Symbol("default"),
	defer: Symbol("defer"),
	disabled: Symbol("disabled"),
	formnovalidate: Symbol("formnovalidate"),
	inert: Symbol("inert"),
	ismap: Symbol("ismap"),
	loop: Symbol("loop"),
	multiple: Symbol("multiple"),
	muted: Symbol("muted"),
	nomodule: Symbol("nomodule"),
	novalidate: Symbol("novalidate"),
	open: Symbol("open"),
	playsinline: Symbol("playsinline"),
	readonly: Symbol("readonly"),
	required: Symbol("required"),
	reversed: Symbol("reversed"),
	selected: Symbol("selected")
} as const;


const acceptCharset = Symbol("accept-charset");
const httpEquiv = Symbol("http-equiv");

const HTMLSymbols = {
	...HTMLBooleanSymbols,
	accept_charset: acceptCharset,
	acceptCharset,
	http_equiv: httpEquiv,
	httpEquiv,

	accept: Symbol("accept"),
	accesskey: Symbol("accesskey"),
	action: Symbol("action"),
	allow: Symbol("allow"),
	alt: Symbol("alt"),
	autocapitalize: Symbol("autocapitalize"),
	autocomplete: Symbol("autocomplete"),
	background: Symbol("background"),
	buffered: Symbol("buffered"),
	capture: Symbol("capture"),
	challenge: Symbol("challenge"),
	charset: Symbol("charset"),
	cite: Symbol("cite"),
	code: Symbol("code"),
	codebase: Symbol("codebase"),
	cols: Symbol("cols"),
	colspan: Symbol("colspan"),
	content: Symbol("content"),
	contenteditable: Symbol("contenteditable"),
	contextmenu: Symbol("contextmenu"),
	coords: Symbol("coords"),
	crossorigin: Symbol("crossorigin"),
	csp: Symbol("csp"),
	data: Symbol("data"),
	datetime: Symbol("datetime"),
	decoding: Symbol("decoding"),
	dir: Symbol("dir"),
	dirname: Symbol("dirname"),
	download: Symbol("download"),
	draggable: Symbol("draggable"),
	enctype: Symbol("enctype"),
	enterkeyhint: Symbol("enterkeyhint"),
	exportparts: Symbol("exportparts"),
	fetchpriority: Symbol("fetchpriority"),
	for: Symbol("for"),
	form: Symbol("form"),
	formaction: Symbol("formaction"),
	formenctype: Symbol("formenctype"),
	formmethod: Symbol("formmethod"),
	formtarget: Symbol("formtarget"),
	headers: Symbol("headers"),
	height: Symbol("height"),
	hidden: Symbol("hidden"),
	high: Symbol("high"),
	href: Symbol("href"),
	hreflang: Symbol("hreflang"),
	icon: Symbol("icon"),
	inputmode: Symbol("inputmode"),
	integrity: Symbol("integrity"),
	is: Symbol("is"),
	keytype: Symbol("keytype"),
	kind: Symbol("kind"),
	label: Symbol("label"),
	lang: Symbol("lang"),
	list: Symbol("list"),
	loading: Symbol("loading"),
	low: Symbol("low"),
	max: Symbol("max"),
	maxlength: Symbol("maxlength"),
	media: Symbol("media"),
	method: Symbol("method"),
	min: Symbol("min"),
	minlength: Symbol("minlength"),
	name: Symbol("name"),
	nonce: Symbol("nonce"),
	optimum: Symbol("optimum"),
	part: Symbol("part"),
	pattern: Symbol("pattern"),
	ping: Symbol("ping"),
	placeholder: Symbol("placeholder"),
	popover: Symbol("popover"),
	popovertarget: Symbol("popovertarget"),
	popovertargetaction: Symbol("popovertargetaction"),
	poster: Symbol("poster"),
	preload: Symbol("preload"),
	radiogroup: Symbol("radiogroup"),
	referrerpolicy: Symbol("referrerpolicy"),
	rel: Symbol("rel"),
	rows: Symbol("rows"),
	rowspan: Symbol("rowspan"),
	sandbox: Symbol("sandbox"),
	scope: Symbol("scope"),
	shape: Symbol("shape"),
	size: Symbol("size"),
	sizes: Symbol("sizes"),
	slot: Symbol("slot"),
	span: Symbol("span"),
	spellcheck: Symbol("spellcheck"),
	src: Symbol("src"),
	srcdoc: Symbol("srcdoc"),
	srclang: Symbol("srclang"),
	srcset: Symbol("srcset"),
	start: Symbol("start"),
	step: Symbol("step"),
	target: Symbol("target"),
	title: Symbol("title"),
	translate: Symbol("translate"),
	type: Symbol("type"),
	usemap: Symbol("usemap"),
	value: Symbol("value"),
	width: Symbol("width"),
	wrap: Symbol("wrap")
} as const;


// DECLARATION MERGING

export interface HTMLAttributes extends AttributeProps<typeof HTMLSymbols> {}


export class HTMLAttributes extends Attributes {

	static override readonly BooleanSymbol: Readonly<Record<string, symbol>> = {
		...Attributes.BooleanSymbol,
		...HTMLBooleanSymbols
	};
	
	static override readonly Symbol: Record<string, symbol> = {
		...Attributes.Symbol,
		...HTMLSymbols
	};


	static readonly Symbols: Set<string> = new Set(Object.keys(HTMLAttributes.Symbol));


	static override readonly CamelCase: Set<string> = new Set();

	static override readonly Names: Set<string> = new Set(
		Object.values(HTMLAttributes.Symbol).map(s => s.description!)
	);


	/** Registers a custom attribute under a key; the optional name is the written attribute name (default: the key converted to kebab-case), and boolean writes it as a bare name. Does nothing if the key is already defined. */
	static define(key: string, options: { name?: string, boolean?: boolean } = {}): symbol {
		if (!Object.hasOwn(this.Symbol, key)) {
			const name = options.name ?? toKebab(key);
			const sym = Symbol(name);
	
			this.Symbol[key] = sym;
			this.Symbols.add(key);
			this.Names.add(name);
	
			if (options.boolean) {
				(this.BooleanSymbol as Record<string, symbol>)[name] = sym;
			}
		}
	
		return this.Symbol[key];
	}
}
