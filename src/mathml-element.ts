import { MathMLAttributes } from './mathml-attributes.js';
import { Element } from './element.js';


//

export type MathMLElementFactory = (...content: unknown[]) => MathMLElement;

export type VoidMathMLElementFactory = (attributes?: object) => MathMLElement;


export class MathMLElement extends Element<MathMLAttributes> {

	static override Symbol: Record<string, symbol> = Object.freeze({
		math: Symbol("math"),

		// Token elements
		mi: Symbol("mi"),
		mn: Symbol("mn"),
		mo: Symbol("mo"),
		ms: Symbol("ms"),
		mspace: Symbol("mspace"),
		mtext: Symbol("mtext"),

		// General layout
		menclose: Symbol("menclose"),
		merror: Symbol("merror"),
		mfenced: Symbol("mfenced"),
		mfrac: Symbol("mfrac"),
		mpadded: Symbol("mpadded"),
		mphantom: Symbol("mphantom"),
		mroot: Symbol("mroot"),
		mrow: Symbol("mrow"),
		msqrt: Symbol("msqrt"),
		mstyle: Symbol("mstyle"),

		// Script and limit elements
		mmultiscripts: Symbol("mmultiscripts"),
		mover: Symbol("mover"),
		mprescripts: Symbol("mprescripts"),
		msub: Symbol("msub"),
		msubsup: Symbol("msubsup"),
		msup: Symbol("msup"),
		munder: Symbol("munder"),
		munderover: Symbol("munderover"),

		// Tabular elements
		maligngroup: Symbol("maligngroup"),
		malignmark: Symbol("malignmark"),
		mtable: Symbol("mtable"),
		mtd: Symbol("mtd"),
		mtr: Symbol("mtr"),

		// Elementary math
		mlongdiv: Symbol("mlongdiv"),
		mscarries: Symbol("mscarries"),
		mscarry: Symbol("mscarry"),
		msgroup: Symbol("msgroup"),
		msline: Symbol("msline"),
		msrow: Symbol("msrow"),
		mstack: Symbol("mstack"),

		// Semantics
		annotation: Symbol("annotation"),
		"annotation-xml": Symbol("annotation-xml"),
		maction: Symbol("maction"),
		semantics: Symbol("semantics")
	});


	/** Returns true if obj represents a MathML attributes object (not an Element or string). */
	static override hasAttr(obj: object | null | undefined): boolean {
		return !(obj instanceof Element) && typeof obj !== "string" && MathMLAttributes.some(obj);
	}


	/** Returns a constructor for a non-empty MathML element whose first argument can be an object representing attributes. */
	static override NonVoid(symbol: symbol): MathMLElementFactory {
		return (...content: unknown[]) => new MathMLElement(
			symbol,
			new MathMLAttributes(MathMLElement.hasAttr(content[0] as object | null | undefined)
				? content.shift() as object
				: {}
			),
			content as Array<string | Element | (() => Element) | null | undefined>
		);
	}


	/** Returns a constructor for an empty MathML element whose argument can be an object representing attributes. */
	static override Void(symbol: symbol): VoidMathMLElementFactory {
		return (attributes = {}) => new MathMLElement(symbol, new MathMLAttributes(attributes));
	}


	/** Creates a new MathMLAttributes instance from a plain object. */
	protected override newAttributes(obj: object): MathMLAttributes {
		return new MathMLAttributes(obj);
	}


	// COMMON MATHML ATTRIBUTE METHODS

	/** Sets the display attribute. */
	display(value: 'block' | 'inline'): this {
		this.attributes.display = value;
		return this;
	}


	/** Sets the displaystyle attribute. */
	displaystyle(value: boolean): this {
		this.attributes.displaystyle = value;
		return this;
	}


	/** Sets the dir attribute. */
	dir(value: 'ltr' | 'rtl'): this {
		this.attributes.dir = value;
		return this;
	}


	/** Sets the mathvariant attribute. */
	mathvariant(value: string): this {
		this.attributes.mathvariant = value;
		return this;
	}


	/** Sets the mathsize attribute. */
	mathsize(value: string): this {
		this.attributes.mathsize = value;
		return this;
	}


	/** Sets the mathcolor attribute. */
	mathcolor(value: string): this {
		this.attributes.mathcolor = value;
		return this;
	}


	/** Sets the mathbackground attribute. */
	mathbackground(value: string): this {
		this.attributes.mathbackground = value;
		return this;
	}


	/** Sets the scriptlevel attribute. */
	scriptlevel(value: string | number): this {
		this.attributes.scriptlevel = value;
		return this;
	}


	/** Sets the id attribute. */
	id(value: string): this {
		this.attributes.id = value;
		return this;
	}


	/** Sets the class attribute to one or more class names. */
	class(...values: string[]): this {
		this.attributes.class = values;
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


	/** Sets the href attribute. */
	href(value: string): this {
		this.attributes.href = value;
		return this;
	}
}
