
export class Attributes {
	[x: string]: unknown;


	constructor(obj: object = {}) {
		Object.assign(this, obj);
	}


	/** Convert snake_case, camelCase and PascalCase to kebab-case. */
	static normalize(name: string): string {
		return name
			.replace(/_+/g, '-')                       // snake_case
			.replace(/([a-z0-9])([A-Z])/g, '$1-$2')    // camelCase
			.replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')  // PascalCase
			.toLowerCase();
	}


	/** Checks whether the passed object contains one or more valid attributes. */
	static some(obj: object | null | undefined): boolean {
		return !!obj && Object.keys(obj).some(key => this.isKnown(key));
	}


	/** Returns true if the normalized key is a known attribute name. Overridden by subclasses. */
	protected static isKnown(_name: string): boolean {
		return false;
	}

	
	/** Serializes all set attributes into a single HTML attribute string. */
	expand(): string {
		return Object.entries(this).reduce((acc, [name, value]) => {
			if (value === undefined) return acc;

			const normalizedName = this.expandKey(Attributes.normalize(name));

			if (value === null) {
				return `${acc} ${normalizedName}`;
			}
			else if (Array.isArray(value)) {
				const joined = value.filter(x => x != null).join(" ");
				return joined.length === 0 ? acc : `${acc} ${normalizedName}="${joined}"`;
			}
			else if (typeof value === "function") {
				const fnString = value.toString();
				return fnString.includes("=>")
					? `${acc} ${normalizedName}="(${fnString})()"`
					: `${acc} ${normalizedName}="${value.name}()"`;
			}
			else {
				return `${acc} ${normalizedName}="${(value as { toString(): string }).toString()}"`;
			}
		}, "");
	}


	/** Transforms a normalized key before expansion; may be overridden by subclasses. */
	protected expandKey(name: string): string {
		return name;
	}
}
