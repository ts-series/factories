
import { Attributes } from './attributes.js';


export class HTMLAttributes extends Attributes {

	static Symbol: Record<string, symbol> = Object.freeze({
		accept: Symbol("accept"),
		accept_charset: Symbol("accept-charset"),
		acceptCharset: Symbol("accept-charset"),
		accesskey: Symbol("accesskey"),
		action: Symbol("action"),
		allow: Symbol("allow"),
		allowfullscreen: Symbol("allowfullscreen"),
		alt: Symbol("alt"),
		async: Symbol("async"),
		autocapitalize: Symbol("autocapitalize"),
		autocomplete: Symbol("autocomplete"),
		autofocus: Symbol("autofocus"),
		autoplay: Symbol("autoplay"),
		background: Symbol("background"),
		buffered: Symbol("buffered"),
		capture: Symbol("capture"),
		challenge: Symbol("challenge"),
		charset: Symbol("charset"),
		checked: Symbol("checked"),
		cite: Symbol("cite"),
		class: Symbol("class"),
		code: Symbol("code"),
		codebase: Symbol("codebase"),
		cols: Symbol("cols"),
		colspan: Symbol("colspan"),
		content: Symbol("content"),
		contenteditable: Symbol("contenteditable"),
		contextmenu: Symbol("contextmenu"),
		controls: Symbol("controls"),
		coords: Symbol("coords"),
		crossorigin: Symbol("crossorigin"),
		csp: Symbol("csp"),
		data: Symbol("data"),
		datetime: Symbol("datetime"),
		decoding: Symbol("decoding"),
		default: Symbol("default"),
		defer: Symbol("defer"),
		dir: Symbol("dir"),
		dirname: Symbol("dirname"),
		disabled: Symbol("disabled"),
		download: Symbol("download"),
		draggable: Symbol("draggable"),
		enctype: Symbol("enctype"),
		enterkeyhint: Symbol("enterkeyhint"),
		for: Symbol("for"),
		form: Symbol("form"),
		formaction: Symbol("formaction"),
		formenctype: Symbol("formenctype"),
		formmethod: Symbol("formmethod"),
		formnovalidate: Symbol("formnovalidate"),
		formtarget: Symbol("formtarget"),
		headers: Symbol("headers"),
		height: Symbol("height"),
		hidden: Symbol("hidden"),
		high: Symbol("high"),
		href: Symbol("href"),
		hreflang: Symbol("hreflang"),
		http_equiv: Symbol("http-equiv"),
		httpEquiv: Symbol("http-equiv"),
		icon: Symbol("icon"),
		id: Symbol("id"),
		integrity: Symbol("integrity"),
		inputmode: Symbol("inputmode"),
		ismap: Symbol("ismap"),
		itemprop: Symbol("itemprop"),
		itemscope: Symbol("itemscope"),
		keytype: Symbol("keytype"),
		kind: Symbol("kind"),
		label: Symbol("label"),
		lang: Symbol("lang"),
		loading: Symbol("loading"),
		list: Symbol("list"),
		loop: Symbol("loop"),
		low: Symbol("low"),
		max: Symbol("max"),
		maxlength: Symbol("maxlength"),
		minlength: Symbol("minlength"),
		media: Symbol("media"),
		method: Symbol("method"),
		min: Symbol("min"),
		multiple: Symbol("multiple"),
		muted: Symbol("muted"),
		name: Symbol("name"),
		novalidate: Symbol("novalidate"),
		open: Symbol("open"),
		optimum: Symbol("optimum"),
		pattern: Symbol("pattern"),
		ping: Symbol("ping"),
		placeholder: Symbol("placeholder"),
		playsinline: Symbol("playsinline"),
		poster: Symbol("poster"),
		preload: Symbol("preload"),
		radiogroup: Symbol("radiogroup"),
		readonly: Symbol("readonly"),
		referrerpolicy: Symbol("referrerpolicy"),
		rel: Symbol("rel"),
		required: Symbol("required"),
		reversed: Symbol("reversed"),
		role: Symbol("role"),
		rows: Symbol("rows"),
		rowspan: Symbol("rowspan"),
		sandbox: Symbol("sandbox"),
		scope: Symbol("scope"),
		selected: Symbol("selected"),
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
		style: Symbol("style"),
		tabindex: Symbol("tabindex"),
		target: Symbol("target"),
		title: Symbol("title"),
		translate: Symbol("translate"),
		type: Symbol("type"),
		usemap: Symbol("usemap"),
		value: Symbol("value"),
		width: Symbol("width"),
		wrap: Symbol("wrap")
	})


	static Symbols: Set<string> = new Set(Object.keys(HTMLAttributes.Symbol));

	static Names: Set<string> = new Set(
		Object.values(HTMLAttributes.Symbol).map(s => (s as symbol).description!)
	);


	/** Checks whether the passed object contains one or more valid HTML attributes. */
	static override some(obj: object | null | undefined): boolean {
		return !!obj && Object.keys(obj).some(key =>
			HTMLAttributes.Symbols.has(key) || /^data(?:-|[\p{Lu}\p{Lt}])/u.test(key));
	}


	protected static override isKnown(name: string): boolean {
		return HTMLAttributes.Names.has(name);
	}


	protected override expandKey(name: string): string {
		if (!HTMLAttributes.Names.has(name) && !name.startsWith("data")) {
			return `data-${name}`;
		}
		return name;
	}
}
