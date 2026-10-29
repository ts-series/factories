
import { Attributes } from './attributes.js';


export class HTMLAttributes extends Attributes {

	static override readonly Boolean: Readonly<Record<string, symbol>> = {
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
		hidden: Symbol("hidden"),
		ismap: Symbol("ismap"),
		itemscope: Symbol("itemscope"),
		loop: Symbol("loop"),
		multiple: Symbol("multiple"),
		muted: Symbol("muted"),
		novalidate: Symbol("novalidate"),
		open: Symbol("open"),
		playsinline: Symbol("playsinline"),
		readonly: Symbol("readonly"),
		required: Symbol("required"),
		reversed: Symbol("reversed"),
		selected: Symbol("selected")
	};
	
	
	static override readonly Symbol: Record<string, symbol> = {
		...HTMLAttributes.Boolean,
	
		accept: Symbol("accept"),
		accept_charset: Symbol("accept-charset"),
		acceptCharset: Symbol("accept-charset"),
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
		class: Symbol("class"),
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
		for: Symbol("for"),
		form: Symbol("form"),
		formaction: Symbol("formaction"),
		formenctype: Symbol("formenctype"),
		formmethod: Symbol("formmethod"),
		formtarget: Symbol("formtarget"),
		headers: Symbol("headers"),
		height: Symbol("height"),
		high: Symbol("high"),
		href: Symbol("href"),
		hreflang: Symbol("hreflang"),
		http_equiv: Symbol("http-equiv"),
		httpEquiv: Symbol("http-equiv"),
		icon: Symbol("icon"),
		id: Symbol("id"),
		integrity: Symbol("integrity"),
		inputmode: Symbol("inputmode"),
		itemprop: Symbol("itemprop"),
		itemtype: Symbol("itemtype"),
		keytype: Symbol("keytype"),
		kind: Symbol("kind"),
		label: Symbol("label"),
		lang: Symbol("lang"),
		loading: Symbol("loading"),
		list: Symbol("list"),
		low: Symbol("low"),
		max: Symbol("max"),
		maxlength: Symbol("maxlength"),
		minlength: Symbol("minlength"),
		media: Symbol("media"),
		method: Symbol("method"),
		min: Symbol("min"),
		name: Symbol("name"),
		optimum: Symbol("optimum"),
		pattern: Symbol("pattern"),
		ping: Symbol("ping"),
		placeholder: Symbol("placeholder"),
		poster: Symbol("poster"),
		preload: Symbol("preload"),
		radiogroup: Symbol("radiogroup"),
		referrerpolicy: Symbol("referrerpolicy"),
		rel: Symbol("rel"),
		role: Symbol("role"),
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
		style: Symbol("style"),
		tabindex: Symbol("tabindex"),
		target: Symbol("target"),
		title: Symbol("title"),
		translate: Symbol("translate"),
		type: Symbol("type"),
		usemap: Symbol("usemap"),
		value: Symbol("value"),
		width: Symbol("width"),
		wrap: Symbol("wrap"),

	// ARIA ATTRIBUTES
		ariaActivedescendant: Symbol("aria-activedescendant"),
		ariaAtomic: Symbol("aria-atomic"),
		ariaAutocomplete: Symbol("aria-autocomplete"),
		ariaBraillelabel: Symbol("aria-braillelabel"),
		ariaBrailleroledescription: Symbol("aria-brailleroledescription"),
		ariaBusy: Symbol("aria-busy"),
		ariaChecked: Symbol("aria-checked"),
		ariaColcount: Symbol("aria-colcount"),
		ariaColindex: Symbol("aria-colindex"),
		ariaColindextext: Symbol("aria-colindextext"),
		ariaColspan: Symbol("aria-colspan"),
		ariaControls: Symbol("aria-controls"),
		ariaCurrent: Symbol("aria-current"),
		ariaDescribedby: Symbol("aria-describedby"),
		ariaDescription: Symbol("aria-description"),
		ariaDetails: Symbol("aria-details"),
		ariaDisabled: Symbol("aria-disabled"),
		ariaDropeffect: Symbol("aria-dropeffect"),
		ariaErrormessage: Symbol("aria-errormessage"),
		ariaExpanded: Symbol("aria-expanded"),
		ariaFlowto: Symbol("aria-flowto"),
		ariaGrabbed: Symbol("aria-grabbed"),
		ariaHaspopup: Symbol("aria-haspopup"),
		ariaHidden: Symbol("aria-hidden"),
		ariaInvalid: Symbol("aria-invalid"),
		ariaKeyshortcuts: Symbol("aria-keyshortcuts"),
		ariaLabel: Symbol("aria-label"),
		ariaLabelledby: Symbol("aria-labelledby"),
		ariaLevel: Symbol("aria-level"),
		ariaLive: Symbol("aria-live"),
		ariaModal: Symbol("aria-modal"),
		ariaMultiline: Symbol("aria-multiline"),
		ariaMultiselectable: Symbol("aria-multiselectable"),
		ariaOrientation: Symbol("aria-orientation"),
		ariaOwns: Symbol("aria-owns"),
		ariaPlaceholder: Symbol("aria-placeholder"),
		ariaPosinset: Symbol("aria-posinset"),
		ariaPressed: Symbol("aria-pressed"),
		ariaReadonly: Symbol("aria-readonly"),
		ariaRelevant: Symbol("aria-relevant"),
		ariaRequired: Symbol("aria-required"),
		ariaRoledescription: Symbol("aria-roledescription"),
		ariaRowcount: Symbol("aria-rowcount"),
		ariaRowindex: Symbol("aria-rowindex"),
		ariaRowindextext: Symbol("aria-rowindextext"),
		ariaRowspan: Symbol("aria-rowspan"),
		ariaSelected: Symbol("aria-selected"),
		ariaSetsize: Symbol("aria-setsize"),
		ariaSort: Symbol("aria-sort"),
		ariaValuemax: Symbol("aria-valuemax"),
		ariaValuemin: Symbol("aria-valuemin"),
		ariaValuenow: Symbol("aria-valuenow"),
		ariaValuetext: Symbol("aria-valuetext")
	};


	static readonly Symbols: Set<string> = new Set(Object.keys(HTMLAttributes.Symbol));

	static override readonly Names: Set<string> = new Set(
		Object.values(HTMLAttributes.Symbol).map(s => (s as symbol).description!)
	);


	/** Defines and registers a symbol for a custom attribute with the given name; does nothing if the name is already defined. */
	static defineCustom(name: string): symbol {
		if (!(name in this.Symbol)) {
			const sym = Symbol(name);
			(this.Symbol as Record<string, symbol>)[name] = sym;
			this.Symbols.add(name);
			this.Names.add(name);
		}

		return this.Symbol[name];
	}

	
	/** Checks whether the passed object contains one or more valid HTML attributes. */
	static override some(obj: object | null | undefined): boolean {
		return !!obj && Object.keys(obj).some(key =>
			HTMLAttributes.Symbols.has(key) || /^data(?:-|[\p{Lu}\p{Lt}])/u.test(key));
	}


	protected static override isKnown(name: string): boolean {
		return HTMLAttributes.Names.has(name);
	}
}
