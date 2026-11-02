
import { HTMLAttributes } from './html-attributes.ts';
import { HTMLElement } from './html-element.ts';


//

export type TransferableValue =
	| string
	| number
	| boolean
	| null
	| undefined
	| TransferableValue[]
	| { [key: string]: TransferableValue };


/** Returns a JavaScript string literal for the given text that is safe inside a script element. */
function transferString(text: string): string {
	return JSON.stringify(text).replace(/</g, "\\u003c");
}


/** Converts a transferable value into JavaScript source code that is safe inside a script element. */
function transferValue(value: TransferableValue): string {
	switch (typeof value) {
		case "string":
			return transferString(value);

		case "number":
		case "boolean":
			return String(value);

		case "object":
			if (value === null) {
				return "null";
			}
			else if (Array.isArray(value)) {
				return `[${value.map(transferValue).join(", ")}]`;
			}
			else {
				return `{${Object.entries(value)
					.map(([k, v]) => `${transferString(k)}: ${transferValue(v)}`)
					.join(", ")}}`;
			}

		default:
			return "undefined";
	}
}


//

export class HTMLScriptElement extends HTMLElement {

	constructor(attributes: object = {}, content: Array<string | null | undefined> = []) {
		super(HTMLElement.Symbol.script, new HTMLAttributes(attributes), [...content]);
			// Copy so that the caller's array is not shared with, and later mutated by, this element.
	}


	/** Calls a function on the client side to which values are passed literally from the server. */
	call(fn: string, ...args: TransferableValue[]): HTMLScriptElement {
		this.append(`${fn}(${args.map(x => transferValue(x)).join(", ")}); `);
		return this;
	}


	/** Imports a module with any number of functions. */
	import(path: string, ...names: (string | null | undefined)[]): HTMLScriptElement {
		const list = names.filter((n): n is string => n != null);
	
		this.append(list.length === 0
			? `import ${transferString(path)}; `
			: `import { ${list.join(", ")} } from ${transferString(path)}; `
		);
		return this;
	}


	/** Combines the methods `import` and `call`, which is suitable when only a single function is imported. */
	importOnly(path: string, name: string, ...args: TransferableValue[]): HTMLScriptElement {
		this.append(
			`import { ${name} } from ${transferString(path)}; `,
			`${name}(${args.map(x => transferValue(x)).join(", ")}); `
		);
		return this;
	}
}
