import { SVGAttributes } from './svg-attributes.js';
import { Element } from './element.js';


//

export type SVGElementFactory = (...content: unknown[]) => SVGElement;


export class SVGElement extends Element<SVGAttributes> {

	static override Symbol: Record<string, symbol> = Object.freeze({
		rect: Symbol("rect"),
		line: Symbol("line"),
		ellipse: Symbol("ellipse"),
		polyline: Symbol("polyline"),
		polygon: Symbol("polygon"),
		path: Symbol("path"),

		text: Symbol("text"),
		tspan: Symbol("tspan"),
		textPath: Symbol("textPath"),

		svg: Symbol("svg"),
		g: Symbol("g"),
		defs: Symbol("defs"),
		symbol: Symbol("symbol"),
		use: Symbol("use"),
		marker: Symbol("marker"),

		image: Symbol("image"),
		a: Symbol("a"),

		linearGradient: Symbol("linearGradient"),
		radialGradient: Symbol("radialGradient"),
		pattern: Symbol("pattern"),
		stop: Symbol("stop"),

		clipPath: Symbol("clipPath"),
		mask: Symbol("mask"),
		filter: Symbol("filter"),

		// Common filter primitives
		feBlend: Symbol("feBlend"),
		feColorMatrix: Symbol("feColorMatrix"),
		feComponentTransfer: Symbol("feComponentTransfer"),
		feComposite: Symbol("feComposite"),
		feConvolveMatrix: Symbol("feConvolveMatrix"),
		feDiffuseLighting: Symbol("feDiffuseLighting"),
		feDisplacementMap: Symbol("feDisplacementMap"),
		feDropShadow: Symbol("feDropShadow"),
		feFlood: Symbol("feFlood"),
		feGaussianBlur: Symbol("feGaussianBlur"),
		feImage: Symbol("feImage"),
		feMerge: Symbol("feMerge"),
		feMergeNode: Symbol("feMergeNode"),
		feMorphology: Symbol("feMorphology"),
		feOffset: Symbol("feOffset"),
		feSpecularLighting: Symbol("feSpecularLighting"),
		feTile: Symbol("feTile"),
		feTurbulence: Symbol("feTurbulence"),

		animate: Symbol("animate"),
		animateTransform: Symbol("animateTransform"),
		animateMotion: Symbol("animateMotion"),
		set: Symbol("set"),

		title: Symbol("title"),
		desc: Symbol("desc"),
		style: Symbol("style"),
		script: Symbol("script"),
		circle: Symbol("circle")
	});


	/** Returns true if obj represents an SVG attributes object (not an Element or string). */
	static override hasAttr(obj: object | null | undefined): boolean {
		return !(obj instanceof Element) && typeof obj !== "string" && SVGAttributes.some(obj);
	}


	/** Returns a constructor for a non-empty SVG element whose first argument can be an object representing attributes. */
	static override NonVoid(symbol: symbol): SVGElementFactory {
		return (...content: unknown[]) => new SVGElement(
			symbol,
			new SVGAttributes(SVGElement.hasAttr(content[0] as object | null | undefined)
				? content.shift() as object
				: {}
			),
			content as Array<string | Element | (() => Element) | null | undefined>
		);
	}


	/** Creates a new SVGAttributes instance from a plain object. */
	protected override newAttributes(obj: object): SVGAttributes {
		return new SVGAttributes(obj);
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
		this.attributes["stroke-width"] = value;
		return this;
	}


	/** Sets the stroke-dasharray attribute. */
	strokeDasharray(value: string): this {
		this.attributes["stroke-dasharray"] = value;
		return this;
	}


	/** Sets the stroke-dashoffset attribute. */
	strokeDashoffset(value: number | string): this {
		this.attributes["stroke-dashoffset"] = value;
		return this;
	}


	/** Sets the stroke-linecap attribute. */
	strokeLinecap(value: 'butt' | 'round' | 'square'): this {
		this.attributes["stroke-linecap"] = value;
		return this;
	}


	/** Sets the stroke-linejoin attribute. */
	strokeLinejoin(value: 'arcs' | 'bevel' | 'miter' | 'miter-clip' | 'round'): this {
		this.attributes["stroke-linejoin"] = value;
		return this;
	}


	/** Sets the opacity attribute. */
	opacity(value: number | string): this {
		this.attributes.opacity = value;
		return this;
	}


	/** Sets the fill-opacity attribute. */
	fillOpacity(value: number | string): this {
		this.attributes["fill-opacity"] = value;
		return this;
	}


	/** Sets the stroke-opacity attribute. */
	strokeOpacity(value: number | string): this {
		this.attributes["stroke-opacity"] = value;
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


	/** Sets the id attribute. */
	id(value: string): this {
		this.attributes.id = value;
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


	/** Sets the lang attribute. */
	lang(value: string): this {
		this.attributes.lang = value;
		return this;
	}
}
