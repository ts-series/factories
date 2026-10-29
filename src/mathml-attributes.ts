import { Attributes } from './attributes.js';


export class MathMLAttributes extends Attributes {

	static override readonly Symbol: Record<string, symbol> = {
		// Global MathML attributes
		id: Symbol("id"),
		class: Symbol("class"),
		style: Symbol("style"),
		dir: Symbol("dir"),
		displaystyle: Symbol("displaystyle"),
		mathbackground: Symbol("mathbackground"),
		mathcolor: Symbol("mathcolor"),
		mathsize: Symbol("mathsize"),
		nonce: Symbol("nonce"),
		scriptlevel: Symbol("scriptlevel"),
		tabindex: Symbol("tabindex"),

		// Element-specific attributes
		accent: Symbol("accent"),
		accentunder: Symbol("accentunder"),
		actiontype: Symbol("actiontype"),
		align: Symbol("align"),
		alignmentscope: Symbol("alignmentscope"),
		altimg: Symbol("altimg"),
		"altimg-height": Symbol("altimg-height"),
		"altimg-valign": Symbol("altimg-valign"),
		"altimg-width": Symbol("altimg-width"),
		alttext: Symbol("alttext"),
		bevelled: Symbol("bevelled"),
		cd: Symbol("cd"),
		cdgroup: Symbol("cdgroup"),
		charalign: Symbol("charalign"),
		close: Symbol("close"),
		columnalign: Symbol("columnalign"),
		columnlines: Symbol("columnlines"),
		columnspacing: Symbol("columnspacing"),
		columnspan: Symbol("columnspan"),
		columnwidth: Symbol("columnwidth"),
		crossout: Symbol("crossout"),
		decimalpoint: Symbol("decimalpoint"),
		definitionURL: Symbol("definitionURL"),
		denomalign: Symbol("denomalign"),
		depth: Symbol("depth"),
		display: Symbol("display"),
		edge: Symbol("edge"),
		encoding: Symbol("encoding"),
		equalcolumns: Symbol("equalcolumns"),
		equalrows: Symbol("equalrows"),
		fence: Symbol("fence"),
		form: Symbol("form"),
		frame: Symbol("frame"),
		framespacing: Symbol("framespacing"),
		groupalign: Symbol("groupalign"),
		height: Symbol("height"),
		href: Symbol("href"),
		index: Symbol("index"),
		integer: Symbol("integer"),
		largeop: Symbol("largeop"),
		length: Symbol("length"),
		linebreak: Symbol("linebreak"),
		linebreakmultchar: Symbol("linebreakmultchar"),
		linebreakstyle: Symbol("linebreakstyle"),
		lineleading: Symbol("lineleading"),
		linethickness: Symbol("linethickness"),
		location: Symbol("location"),
		longdivstyle: Symbol("longdivstyle"),
		lquote: Symbol("lquote"),
		lspace: Symbol("lspace"),
		mathvariant: Symbol("mathvariant"),
		maxsize: Symbol("maxsize"),
		minlabelspacing: Symbol("minlabelspacing"),
		minsize: Symbol("minsize"),
		movablelimits: Symbol("movablelimits"),
		name: Symbol("name"),
		newline: Symbol("newline"),
		notation: Symbol("notation"),
		numalign: Symbol("numalign"),
		open: Symbol("open"),
		other: Symbol("other"),
		overflow: Symbol("overflow"),
		position: Symbol("position"),
		rowalign: Symbol("rowalign"),
		rowlines: Symbol("rowlines"),
		rowspacing: Symbol("rowspacing"),
		rowspan: Symbol("rowspan"),
		rquote: Symbol("rquote"),
		rspace: Symbol("rspace"),
		selection: Symbol("selection"),
		separator: Symbol("separator"),
		separators: Symbol("separators"),
		shift: Symbol("shift"),
		side: Symbol("side"),
		src: Symbol("src"),
		stackalign: Symbol("stackalign"),
		stretchy: Symbol("stretchy"),
		subscriptshift: Symbol("subscriptshift"),
		superscriptshift: Symbol("superscriptshift"),
		symmetric: Symbol("symmetric"),
		voffset: Symbol("voffset"),
		width: Symbol("width"),
		"xlink:href": Symbol("xlink:href"),
		xmlns: Symbol("xmlns")
	};


	static override readonly Names: Set<string> = new Set(
		Object.values(MathMLAttributes.Symbol).map(s => s.description!)
	);


	/** Names that must be preserved as-is (not converted to kebab-case), derived from the camelCase entries in Names. */
	static override readonly CamelCase: Set<string> = new Set(
		[...MathMLAttributes.Names].filter(name => /[A-Z]/.test(name))
	);


	/** Checks whether the passed object contains one or more valid MathML attributes. */
	static override some(obj: object | null | undefined): boolean {
		return !!obj && Object.keys(obj).some(key =>
			MathMLAttributes.Names.has(this.normalize(key)));
	}
}