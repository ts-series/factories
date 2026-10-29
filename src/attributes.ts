
/** Escapes &, <, > and " so that a string is safe in HTML text content and in double-quoted attribute values. */
export function escape(value: string): string {
	return /[&<>"]/.test(value)
		? value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
		: value;
}


//

export class Attributes {
	[x: string]: unknown;

	static readonly Boolean: Readonly<Record<string, symbol>> = {};

	static readonly Symbol: Record<string, symbol> = {
		class: Symbol("class"),
		id: Symbol("id"),
		itemprop: Symbol("itemprop"),
		itemscope: Symbol("itemscope"),
		itemtype: Symbol("itemtype"),
		style: Symbol("style")
	};


	static readonly CamelCase: Set<string> = new Set();

	static readonly Names: Set<string> = new Set(
		Object.values(Attributes.Symbol).map(s => s.description!)
	);


	constructor(obj: object = {}) {
		Object.assign(this, obj);
	}


	/** Removes the given attribute from this instance and returns true if it existed. */
	remove(name: string): boolean {
		return delete this[name];
	}
	

	/** Removes multiple attributes from this instance at once. */
	removeMany(...names: string[]): this {
		for (const name of names) {
			delete this[name];
		}
		return this;
	}


	/** Convert snake_case, camelCase and PascalCase to kebab-case, except for names listed in CamelCase. */
	static normalize(name: string): string {
		return this.CamelCase.has(name) ? name : name
			.replace(/_/g, '-')                        // snake_case
			.replace(/([a-z0-9])([A-Z])/g, '$1-$2')    // camelCase
			.replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')  // PascalCase
			.toLowerCase();
	}


	/** Checks whether the passed object contains one or more valid attributes. */
	static some(obj: object | null | undefined): boolean {
		return !!obj && Object.keys(obj).some(key => this.isKnown(key));
	}


	/** Returns true if the normalized name is a known attribute name, from this class's Names set. */
	protected static isKnown(name: string): boolean {
		return this.Names.has(name);
	}


	/** Returns true if the normalized name is a known boolean attribute, from this class's Boolean record. */
	protected isBoolean(name: string): boolean {
		return name in (this.constructor as typeof Attributes).Boolean;
	}


	/** Converts a plain object of camelCase CSS properties into a valid inline CSS string. */
	static toCSS(obj: Record<string, string | number>): string {
		return Object.entries(obj)
			.map(([key, value]) => `${Attributes.normalize(key)}: ${value};`)
			.join(" ");
	}


	/** Serializes all set attributes into a single HTML attribute string. */
	expand(): string {
		return Object.entries(this).reduce((acc, [name, value]) => {
			if (value === undefined) {
				return acc;
			}
			else {
				const normalizedName = (this.constructor as typeof Attributes).normalize(name);
	
				if (this.isBoolean(normalizedName)) {
					return value === false ? acc : `${acc} ${normalizedName}`;
				}
				else if (value === null || value === "") {
					return `${acc} ${normalizedName}=""`;
				}
				else if (Array.isArray(value)) {
					const joined = value.filter(x => x != null).join(" ");
					return joined.length === 0 ? acc : `${acc} ${normalizedName}="${escape(joined)}"`;
				}
				else if (normalizedName === "style" && typeof value === "object") {
					return `${acc} ${normalizedName}="${escape(Attributes.toCSS(value as Record<string, string | number>))}"`;
				}
				else if (typeof value === "function") {
					const fnString = value.toString();
					return fnString.includes("=>")
						? `${acc} ${normalizedName}="${escape(`(${fnString})()`)}"`
						: `${acc} ${normalizedName}="${escape(`${value.name}()`)}"`;
				}
				else {
					return `${acc} ${normalizedName}="${escape((value as { toString(): string }).toString())}"`;
				}
			}
		}, "");
	}
}
