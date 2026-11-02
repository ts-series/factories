import { SVGElement, type SVGElementFactory } from './svg-element.ts';


//

export const circle: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.circle);
export const rect: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.rect);
export const line: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.line);
export const ellipse: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.ellipse);
export const polyline: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.polyline);
export const polygon: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.polygon);
export const path: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.path);

export const text: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.text);
export const tspan: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.tspan);
export const textPath: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.textPath);

export const g: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.g);
export const defs: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.defs);
export const symbol: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.symbol);
export const use: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.use);
export const marker: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.marker);
export const view: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.view);
export const switch_: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.switch);

export const image: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.image);
export const a: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.a);
export const foreignObject: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.foreignObject);

export const linearGradient: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.linearGradient);
export const radialGradient: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.radialGradient);
export const pattern: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.pattern);
export const stop: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.stop);

export const clipPath: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.clipPath);
export const mask: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.mask);
export const filter: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.filter);

export const feBlend: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.feBlend);
export const feColorMatrix: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.feColorMatrix);
export const feComponentTransfer: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.feComponentTransfer);
export const feComposite: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.feComposite);
export const feConvolveMatrix: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.feConvolveMatrix);
export const feDiffuseLighting: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.feDiffuseLighting);
export const feDisplacementMap: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.feDisplacementMap);
export const feDistantLight: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.feDistantLight);
export const feDropShadow: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.feDropShadow);
export const feFlood: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.feFlood);
export const feFuncA: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.feFuncA);
export const feFuncB: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.feFuncB);
export const feFuncG: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.feFuncG);
export const feFuncR: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.feFuncR);
export const feGaussianBlur: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.feGaussianBlur);
export const feImage: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.feImage);
export const feMerge: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.feMerge);
export const feMergeNode: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.feMergeNode);
export const feMorphology: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.feMorphology);
export const feOffset: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.feOffset);
export const fePointLight: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.fePointLight);
export const feSpecularLighting: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.feSpecularLighting);
export const feSpotLight: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.feSpotLight);
export const feTile: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.feTile);
export const feTurbulence: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.feTurbulence);

export const animate: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.animate);
export const animateTransform: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.animateTransform);
export const animateMotion: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.animateMotion);
export const mpath: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.mpath);
export const set: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.set);

export const title: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.title);
export const desc: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.desc);
export const metadata: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.metadata);
export const style: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.style);
export const script: SVGElementFactory = SVGElement.NonVoid(SVGElement.Symbol.script);

export const svg: SVGElementFactory & {
	a: SVGElementFactory, animate: SVGElementFactory, animateMotion: SVGElementFactory, animateTransform: SVGElementFactory,
	circle: SVGElementFactory, clipPath: SVGElementFactory,
	defs: SVGElementFactory, desc: SVGElementFactory,
	ellipse: SVGElementFactory,
	feBlend: SVGElementFactory, feColorMatrix: SVGElementFactory, feComponentTransfer: SVGElementFactory, feComposite: SVGElementFactory, feConvolveMatrix: SVGElementFactory,
	feDiffuseLighting: SVGElementFactory, feDisplacementMap: SVGElementFactory, feDistantLight: SVGElementFactory, feDropShadow: SVGElementFactory, feFlood: SVGElementFactory,
	feFuncA: SVGElementFactory, feFuncB: SVGElementFactory, feFuncG: SVGElementFactory, feFuncR: SVGElementFactory, feGaussianBlur: SVGElementFactory,
	feImage: SVGElementFactory, feMerge: SVGElementFactory, feMergeNode: SVGElementFactory, feMorphology: SVGElementFactory, feOffset: SVGElementFactory,
	fePointLight: SVGElementFactory, feSpecularLighting: SVGElementFactory, feSpotLight: SVGElementFactory,
	feTile: SVGElementFactory, feTurbulence: SVGElementFactory, filter: SVGElementFactory, foreignObject: SVGElementFactory,
	g: SVGElementFactory,
	image: SVGElementFactory,
	line: SVGElementFactory, linearGradient: SVGElementFactory,
	marker: SVGElementFactory, mask: SVGElementFactory, metadata: SVGElementFactory, mpath: SVGElementFactory,
	path: SVGElementFactory, pattern: SVGElementFactory, polygon: SVGElementFactory, polyline: SVGElementFactory,
	radialGradient: SVGElementFactory, rect: SVGElementFactory,
	script: SVGElementFactory, set: SVGElementFactory, stop: SVGElementFactory, style: SVGElementFactory, switch: SVGElementFactory, symbol: SVGElementFactory,
	text: SVGElementFactory, textPath: SVGElementFactory, title: SVGElementFactory, tspan: SVGElementFactory,
	use: SVGElementFactory, view: SVGElementFactory
} = Object.assign(
	SVGElement.NonVoid(SVGElement.Symbol.svg),
	{
		a, animate, animateMotion, animateTransform,
		circle, clipPath,
		defs, desc,
		ellipse,
		feBlend, feColorMatrix, feComponentTransfer, feComposite, feConvolveMatrix,
		feDiffuseLighting, feDisplacementMap, feDistantLight, feDropShadow, feFlood,
		feFuncA, feFuncB, feFuncG, feFuncR, feGaussianBlur,
		feImage, feMerge, feMergeNode, feMorphology, feOffset,
		fePointLight, feSpecularLighting, feSpotLight,
		feTile, feTurbulence, filter, foreignObject,
		g,
		image,
		line, linearGradient,
		marker, mask, metadata, mpath,
		path, pattern, polygon, polyline,
		radialGradient, rect,
		script, set, stop, style, switch: switch_, symbol,
		text, textPath, title, tspan,
		use, view
	}
);
