
const EscapeMap: Record<string, string> = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	'"': "&quot;"
};


/** Escapes &, <, > and " so that a string is safe in HTML text content and in double-quoted attribute values. */
export function escape(value: string): string {
	return value.replace(/[&<>"]/g, (char) => EscapeMap[char]);
}


/** Converts snake_case, camelCase and PascalCase to kebab-case; each underscore becomes one hyphen. */
export function toKebab(name: string): string {
	return name
		.replace(/_/g, '-')
		.replace(/([a-z0-9])([A-Z])/g, '$1-$2')
		.replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
		.toLowerCase();
}


/** Converts a plain object of camelCase CSS properties into a valid inline CSS string, skipping empty values. */
export function toCSS(obj: Record<string, string | number | boolean | null | undefined>): string {
	return Object.entries(obj)
		.filter(([, value]) => value != null && value !== false)
		.map(([key, value]) => `${toKebab(key)}: ${value};`)
		.join(" ");
}


// COMMON ATTRIBUTE SYMBOLS

const AriaSymbols = {
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
} as const;


const BooleanSymbols = {
	itemscope: Symbol("itemscope")
} as const;


const Symbols = {
	...AriaSymbols,
	...BooleanSymbols,
	class: Symbol("class"),
	id: Symbol("id"),
	itemprop: Symbol("itemprop"),
	itemtype: Symbol("itemtype"),
	role: Symbol("role"),
	style: Symbol("style"),
	tabindex: Symbol("tabindex")
} as const;


// DECLARATION MERGING

/** Maps the keys of a symbol record to optional, writable attribute properties. */
export type AttributeProps<S> = { -readonly [K in keyof S]?: unknown };


export interface Attributes extends AttributeProps<typeof Symbols> {}


export class Attributes {
	[x: string]: unknown;

	static readonly AriaSymbol: Readonly<Record<string, symbol>> = AriaSymbols;

	static readonly BooleanSymbol: Readonly<Record<string, symbol>> = BooleanSymbols;

	static readonly Symbol: Record<string, symbol> = Symbols;


	static readonly CamelCase: Set<string> = new Set();

	static readonly Names: Set<string> = new Set(
		Object.values(Attributes.Symbol).map(s => s.description!)
	);


	constructor(obj: object = {}) {
		Object.assign(this, obj);
	}


	/** Removes blank entries (null, undefined, booleans and empty strings) from a list, e.g. the result of `condition && "name"`. */
	static omitBlanks<T>(values: ReadonlyArray<T | boolean | null | undefined>): T[] {
		return values.filter((v): v is T => v != null && typeof v !== "boolean" && v !== "");
	}


	/** Converts a key to its attribute name: registered keys use their symbol description, other names are converted to kebab-case. */
	static normalize(name: string): string {
		const registered = Object.hasOwn(this.Symbol, name) ? this.Symbol[name].description : undefined;
	
		return registered ?? (this.CamelCase.has(name) ? name : toKebab(name));
	}


	/** Returns true if the name, as a key or in its normalized form, belongs to the standard attributes of this class. */
	static isKnown(name: string): boolean {
		return Object.hasOwn(this.Symbol, name) || this.Names.has(name);
	}


	/** Returns true if the normalized name is a known boolean attribute, from this class's `BooleanSymbol` record. */
	static isBoolean(name: string): boolean {
		return Object.hasOwn(this.BooleanSymbol, name);
	}


	/** Serializes all set attributes into one HTML attribute string, each preceded by a space, and returns an empty string if none is set. */
	expand(): string {
		const ctor = this.constructor as typeof Attributes;
		let out = "";
	
		for (const name of Object.keys(this)) {
			const value = this[name];
	
			if (value !== undefined) {
				const normalizedName = ctor.normalize(name);
	
				if (ctor.isBoolean(normalizedName)) {
					if (value !== false) {
						out += ` ${normalizedName}`;
					}
				}
				else if (value === null || value === "") {
					out += ` ${normalizedName}=""`;
				}
				else if (Array.isArray(value)) {
					const joined = Attributes.omitBlanks(value).join(" ");
	
					if (joined.length > 0) {
						out += ` ${normalizedName}="${escape(joined)}"`;
					}
				}
				else if (normalizedName === "style" && typeof value === "object") {
					out += ` ${normalizedName}="${escape(toCSS(value as Record<string, string | number>))}"`;
				}
				else if (typeof value === "function") {
					const fnString = value.toString();
	
					out += fnString.includes("=>")
						? ` ${normalizedName}="${escape(`(${fnString})()`)}"`
						: ` ${normalizedName}="${escape(`${value.name}()`)}"`;
				}
				else {
					out += ` ${normalizedName}="${escape((value as { toString(): string }).toString())}"`;
				}
			}
		}
	
		return out;
	}
}
