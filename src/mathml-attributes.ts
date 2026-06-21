
import { Attributes } from './attributes.js';


export class MathMLAttributes extends Attributes {

	static Names: Set<string> = new Set([
		// Global MathML attributes
		"id", "class", "style", "dir", "displaystyle", "mathbackground",
		"mathcolor", "mathsize", "nonce", "scriptlevel", "tabindex",
		// Element-specific attributes
		"accent", "accentunder", "actiontype", "align", "alignmentscope",
		"altimg", "altimg-height", "altimg-valign", "altimg-width", "alttext",
		"bevelled", "cd", "cdgroup", "charalign", "close", "columnalign",
		"columnlines", "columnspacing", "columnspan", "columnwidth",
		"crossout", "decimalpoint", "definitionURL", "denomalign",
		"depth", "display", "edge", "encoding", "equalcolumns",
		"equalrows", "fence", "form", "frame", "framespacing",
		"groupalign", "height", "href", "index", "integer",
		"largeop", "length", "linebreak", "linebreakmultchar",
		"linebreakstyle", "lineleading", "linethickness", "location",
		"longdivstyle", "lquote", "lspace", "mathvariant", "maxsize",
		"minlabelspacing", "minsize", "movablelimits", "name",
		"newline", "notation", "numalign", "open", "other",
		"overflow", "position", "rowalign", "rowlines", "rowspacing",
		"rowspan", "rquote", "rspace", "selection", "separator",
		"separators", "shift", "side", "src", "stackalign",
		"stretchy", "subscriptshift", "superscriptshift", "symmetric",
		"voffset", "width", "xlink:href", "xmlns"
	]);


	/** Checks whether the passed object contains one or more valid MathML attributes. */
	static override some(obj: object | null | undefined): boolean {
		return !!obj && Object.keys(obj).some(key =>
			MathMLAttributes.Names.has(Attributes.normalize(key)));
	}


	protected static override isKnown(name: string): boolean {
		return MathMLAttributes.Names.has(name);
	}
}
