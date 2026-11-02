
import { SVGAttributes } from './svg-attributes.ts';
import { Element, type Part } from './element.ts';


// SVG ELEMENT SYMBOLS

const SVGSymbols = {
	circle: Symbol("circle"),
	ellipse: Symbol("ellipse"),
	line: Symbol("line"),
	path: Symbol("path"),
	polygon: Symbol("polygon"),
	polyline: Symbol("polyline"),
	rect: Symbol("rect"),

	text: Symbol("text"),
	textPath: Symbol("textPath"),
	tspan: Symbol("tspan"),

	a: Symbol("a"),
	defs: Symbol("defs"),
	foreignObject: Symbol("foreignObject"),
	g: Symbol("g"),
	marker: Symbol("marker"),
	svg: Symbol("svg"),
	switch: Symbol("switch"),
	symbol: Symbol("symbol"),
	use: Symbol("use"),
	view: Symbol("view"),

	image: Symbol("image"),

	linearGradient: Symbol("linearGradient"),
	pattern: Symbol("pattern"),
	radialGradient: Symbol("radialGradient"),
	stop: Symbol("stop"),

	clipPath: Symbol("clipPath"),
	filter: Symbol("filter"),
	mask: Symbol("mask"),

	// Common filter primitives
	feBlend: Symbol("feBlend"),
	feColorMatrix: Symbol("feColorMatrix"),
	feComponentTransfer: Symbol("feComponentTransfer"),
	feComposite: Symbol("feComposite"),
	feConvolveMatrix: Symbol("feConvolveMatrix"),
	feDiffuseLighting: Symbol("feDiffuseLighting"),
	feDisplacementMap: Symbol("feDisplacementMap"),
	feDistantLight: Symbol("feDistantLight"),
	feDropShadow: Symbol("feDropShadow"),
	feFlood: Symbol("feFlood"),
	feFuncA: Symbol("feFuncA"),
	feFuncB: Symbol("feFuncB"),
	feFuncG: Symbol("feFuncG"),
	feFuncR: Symbol("feFuncR"),
	feGaussianBlur: Symbol("feGaussianBlur"),
	feImage: Symbol("feImage"),
	feMerge: Symbol("feMerge"),
	feMergeNode: Symbol("feMergeNode"),
	feMorphology: Symbol("feMorphology"),
	feOffset: Symbol("feOffset"),
	fePointLight: Symbol("fePointLight"),
	feSpecularLighting: Symbol("feSpecularLighting"),
	feSpotLight: Symbol("feSpotLight"),
	feTile: Symbol("feTile"),
	feTurbulence: Symbol("feTurbulence"),

	animate: Symbol("animate"),
	animateMotion: Symbol("animateMotion"),
	animateTransform: Symbol("animateTransform"),
	mpath: Symbol("mpath"),
	set: Symbol("set"),

	desc: Symbol("desc"),
	metadata: Symbol("metadata"),
	script: Symbol("script"),
	style: Symbol("style"),
	title: Symbol("title")
} as const;


//

export type SVGElementFactory = (...content: unknown[]) => SVGElement;


export class SVGElement extends Element<SVGAttributes> {

	static override readonly Symbol = SVGSymbols;


	static override RawText: Set<symbol> = new Set<symbol>([
		SVGSymbols.script,
		SVGSymbols.style
	]);


	/** Returns a constructor for a non-empty SVG element whose first argument can be an object representing attributes. */
	static override NonVoid(symbol: symbol): SVGElementFactory {
		return (...content: unknown[]) => new SVGElement(
			symbol,
			new SVGAttributes(SVGElement.hasAttr(content[0])
				? content.shift() as object
				: {}
			),
			content
		);
	}


	// SVG PRESENTATION ATTRIBUTES

	/** Sets the fill attribute. */
	fill(value: string): this {
		this.attributes.fill = value;
		return this;
	}


	/** Sets the stroke attribute. */
	stroke(value: string): this {
		this.attributes.stroke = value;
		return this;
	}


	/** Sets the stroke-width attribute. */
	strokeWidth(value: number | string): this {
		this.attributes.strokeWidth = value;
		return this;
	}


	/** Sets the stroke-dasharray attribute. */
	strokeDasharray(value: string): this {
		this.attributes.strokeDasharray = value;
		return this;
	}


	/** Sets the stroke-dashoffset attribute. */
	strokeDashoffset(value: number | string): this {
		this.attributes.strokeDashoffset = value;
		return this;
	}


	/** Sets the stroke-linecap attribute. */
	strokeLinecap(value: 'butt' | 'round' | 'square'): this {
		this.attributes.strokeLinecap = value;
		return this;
	}


	/** Sets the stroke-linejoin attribute. */
	strokeLinejoin(value: 'arcs' | 'bevel' | 'miter' | 'miter-clip' | 'round'): this {
		this.attributes.strokeLinejoin = value;
		return this;
	}


	/** Sets the opacity attribute. */
	opacity(value: number | string): this {
		this.attributes.opacity = value;
		return this;
	}


	/** Sets the fill-opacity attribute. */
	fillOpacity(value: number | string): this {
		this.attributes.fillOpacity = value;
		return this;
	}


	/** Sets the stroke-opacity attribute. */
	strokeOpacity(value: number | string): this {
		this.attributes.strokeOpacity = value;
		return this;
	}


	/** Sets the transform attribute. */
	transform(value: string): this {
		this.attributes.transform = value;
		return this;
	}


	/** Sets the cx attribute. */
	cx(value: number | string): this {
		this.attributes.cx = value;
		return this;
	}


	/** Sets the cy attribute. */
	cy(value: number | string): this {
		this.attributes.cy = value;
		return this;
	}


	/** Sets the r attribute. */
	r(value: number | string): this {
		this.attributes.r = value;
		return this;
	}


	/** Sets the rx attribute. */
	rx(value: number | string): this {
		this.attributes.rx = value;
		return this;
	}


	/** Sets the ry attribute. */
	ry(value: number | string): this {
		this.attributes.ry = value;
		return this;
	}


	/** Sets the x attribute. */
	x(value: number | string): this {
		this.attributes.x = value;
		return this;
	}


	/** Sets the y attribute. */
	y(value: number | string): this {
		this.attributes.y = value;
		return this;
	}


	/** Sets the x1 attribute. */
	x1(value: number | string): this {
		this.attributes.x1 = value;
		return this;
	}


	/** Sets the y1 attribute. */
	y1(value: number | string): this {
		this.attributes.y1 = value;
		return this;
	}


	/** Sets the x2 attribute. */
	x2(value: number | string): this {
		this.attributes.x2 = value;
		return this;
	}


	/** Sets the y2 attribute. */
	y2(value: number | string): this {
		this.attributes.y2 = value;
		return this;
	}


	/** Sets the width attribute. */
	width(value: number | string): this {
		this.attributes.width = value;
		return this;
	}


	/** Sets the height attribute. */
	height(value: number | string): this {
		this.attributes.height = value;
		return this;
	}


	/** Sets the d attribute. */
	d(value: string): this {
		this.attributes.d = value;
		return this;
	}


	/** Sets the points attribute. */
	points(value: string): this {
		this.attributes.points = value;
		return this;
	}


	/** Sets the viewBox attribute. */
	viewBox(value: string): this {
		this.attributes.viewBox = value;
		return this;
	}


	/** Sets the href attribute. */
	href(value: string): this {
		this.attributes.href = value;
		return this;
	}


	/** Sets the lang attribute. */
	lang(value: string): this {
		this.attributes.lang = value;
		return this;
	}
}
