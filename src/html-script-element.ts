
import { HTMLAttributes } from './html-attributes.js';
import { HTMLElement } from './html-element.js';


//

export type TransferableValue =
	| string
	| number
	| boolean
	| null
	| undefined
	| TransferableValue[]
	| { [key: string]: TransferableValue };


function transferValue(value: TransferableValue): string {
	switch (typeof value) {
		case "string":
			return `"${value}"`;

		case "number":
		case "boolean":
			return String(value);

		case "undefined":
			return "undefined";

		case "object":
			if (value === null) {
				return "null";
			}
			else if (Array.isArray(value)) {
				return `[${value.map(transferValue).join(", ")}]`;
			}
			else {
				return `{${Object.entries(value)
					.map(([k, v]) => `"${k}": ${transferValue(v)}`)
					.join(", ")}}`;
			}
	}

	// Fallback — should not be hit:
	return "undefined";
}


//

export class HTMLScriptElement extends HTMLElement {

	constructor(attributes: Object = {}, content: Array<string | null | undefined> = []) {
		super(HTMLElement.Symbol.script, new HTMLAttributes(attributes), content);
	}

	/** Calls a function on the client side to which values ​​are passed literally from the server. */
	call(fn: string, ...args: TransferableValue[]): HTMLScriptElement {
		this.append(`${fn}(${args.map(x => transferValue(x)).join(", ")}); `)
		return this;
	}

	/** Imports a module with any number of functions. */
	import(path: string, ...names: (string | null | undefined)[]): HTMLScriptElement {
		this.append(names.length === 0
			? `import "${path}"; `
			: `import { ${names.join(", ")} } from "${path}"; `
		)
		return this;
	}

	/** Combines the methods `import` and `call`, which is suitable when only a single function is imported. */
	importOnly(path: string, name: string, ...args: TransferableValue[]): HTMLScriptElement {
		this.append(
			`import { ${name} } from "${path}"; `,
			`${name}(${args.map(x => transferValue(x)).join(", ")}); `
		)
		return this;
	}
}
