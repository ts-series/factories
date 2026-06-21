
import { MathMLElement, type MathMLElementFactory, type VoidMathMLElementFactory } from './mathml-element.js';


//

export const mi: MathMLElementFactory = MathMLElement.NonVoid(MathMLElement.Symbol.mi);
export const mn: MathMLElementFactory = MathMLElement.NonVoid(MathMLElement.Symbol.mn);
export const mo: MathMLElementFactory = MathMLElement.NonVoid(MathMLElement.Symbol.mo);
export const ms: MathMLElementFactory = MathMLElement.NonVoid(MathMLElement.Symbol.ms);
export const mspace: VoidMathMLElementFactory = MathMLElement.Void(MathMLElement.Symbol.mspace);
export const mtext: MathMLElementFactory = MathMLElement.NonVoid(MathMLElement.Symbol.mtext);

export const menclose: MathMLElementFactory = MathMLElement.NonVoid(MathMLElement.Symbol.menclose);
export const merror: MathMLElementFactory = MathMLElement.NonVoid(MathMLElement.Symbol.merror);
export const mfenced: MathMLElementFactory = MathMLElement.NonVoid(MathMLElement.Symbol.mfenced);
export const mfrac: MathMLElementFactory = MathMLElement.NonVoid(MathMLElement.Symbol.mfrac);
export const mpadded: MathMLElementFactory = MathMLElement.NonVoid(MathMLElement.Symbol.mpadded);
export const mphantom: MathMLElementFactory = MathMLElement.NonVoid(MathMLElement.Symbol.mphantom);
export const mroot: MathMLElementFactory = MathMLElement.NonVoid(MathMLElement.Symbol.mroot);
export const mrow: MathMLElementFactory = MathMLElement.NonVoid(MathMLElement.Symbol.mrow);
export const msqrt: MathMLElementFactory = MathMLElement.NonVoid(MathMLElement.Symbol.msqrt);
export const mstyle: MathMLElementFactory = MathMLElement.NonVoid(MathMLElement.Symbol.mstyle);

export const mmultiscripts: MathMLElementFactory = MathMLElement.NonVoid(MathMLElement.Symbol.mmultiscripts);
export const mover: MathMLElementFactory = MathMLElement.NonVoid(MathMLElement.Symbol.mover);
export const mprescripts: VoidMathMLElementFactory = MathMLElement.Void(MathMLElement.Symbol.mprescripts);
export const msub: MathMLElementFactory = MathMLElement.NonVoid(MathMLElement.Symbol.msub);
export const msubsup: MathMLElementFactory = MathMLElement.NonVoid(MathMLElement.Symbol.msubsup);
export const msup: MathMLElementFactory = MathMLElement.NonVoid(MathMLElement.Symbol.msup);
export const munder: MathMLElementFactory = MathMLElement.NonVoid(MathMLElement.Symbol.munder);
export const munderover: MathMLElementFactory = MathMLElement.NonVoid(MathMLElement.Symbol.munderover);

export const maligngroup: VoidMathMLElementFactory = MathMLElement.Void(MathMLElement.Symbol.maligngroup);
export const malignmark: VoidMathMLElementFactory = MathMLElement.Void(MathMLElement.Symbol.malignmark);
export const mtable: MathMLElementFactory = MathMLElement.NonVoid(MathMLElement.Symbol.mtable);
export const mtd: MathMLElementFactory = MathMLElement.NonVoid(MathMLElement.Symbol.mtd);
export const mtr: MathMLElementFactory = MathMLElement.NonVoid(MathMLElement.Symbol.mtr);

export const mlongdiv: MathMLElementFactory = MathMLElement.NonVoid(MathMLElement.Symbol.mlongdiv);
export const mscarries: MathMLElementFactory = MathMLElement.NonVoid(MathMLElement.Symbol.mscarries);
export const mscarry: MathMLElementFactory = MathMLElement.NonVoid(MathMLElement.Symbol.mscarry);
export const msgroup: MathMLElementFactory = MathMLElement.NonVoid(MathMLElement.Symbol.msgroup);
export const msline: VoidMathMLElementFactory = MathMLElement.Void(MathMLElement.Symbol.msline);
export const msrow: MathMLElementFactory = MathMLElement.NonVoid(MathMLElement.Symbol.msrow);
export const mstack: MathMLElementFactory = MathMLElement.NonVoid(MathMLElement.Symbol.mstack);

export const annotation: MathMLElementFactory = MathMLElement.NonVoid(MathMLElement.Symbol.annotation);
export const semantics: MathMLElementFactory = MathMLElement.NonVoid(MathMLElement.Symbol.semantics);
export const maction: MathMLElementFactory = MathMLElement.NonVoid(MathMLElement.Symbol.maction);

export const math: MathMLElementFactory & {
	mi: MathMLElementFactory, mn: MathMLElementFactory, mo: MathMLElementFactory, ms: MathMLElementFactory, mspace: VoidMathMLElementFactory, mtext: MathMLElementFactory,
	menclose: MathMLElementFactory, merror: MathMLElementFactory, mfenced: MathMLElementFactory, mfrac: MathMLElementFactory, mpadded: MathMLElementFactory, mphantom: MathMLElementFactory, mroot: MathMLElementFactory, mrow: MathMLElementFactory, msqrt: MathMLElementFactory, mstyle: MathMLElementFactory,
	mmultiscripts: MathMLElementFactory, mover: MathMLElementFactory, mprescripts: VoidMathMLElementFactory, msub: MathMLElementFactory, msubsup: MathMLElementFactory, msup: MathMLElementFactory, munder: MathMLElementFactory, munderover: MathMLElementFactory,
	maligngroup: VoidMathMLElementFactory, malignmark: VoidMathMLElementFactory, mtable: MathMLElementFactory, mtd: MathMLElementFactory, mtr: MathMLElementFactory,
	mlongdiv: MathMLElementFactory, mscarries: MathMLElementFactory, mscarry: MathMLElementFactory, msgroup: MathMLElementFactory, msline: VoidMathMLElementFactory, msrow: MathMLElementFactory, mstack: MathMLElementFactory,
	annotation: MathMLElementFactory, semantics: MathMLElementFactory, maction: MathMLElementFactory
} = Object.assign(
	MathMLElement.NonVoid(MathMLElement.Symbol.math),
	{
		mi, mn, mo, ms, mspace, mtext,
		menclose, merror, mfenced, mfrac, mpadded, mphantom, mroot, mrow, msqrt, mstyle,
		mmultiscripts, mover, mprescripts, msub, msubsup, msup, munder, munderover,
		maligngroup, malignmark, mtable, mtd, mtr,
		mlongdiv, mscarries, mscarry, msgroup, msline, msrow, mstack,
		annotation, semantics, maction
	}
);
