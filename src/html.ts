
import { type Part } from './element.ts';
import { HTMLAttributes } from './html-attributes.ts';
import { HTMLElement, type HTMLElementFactory, type VoidHTMLElementFactory } from './html-element.ts';
import { HTMLScriptElement } from './html-script-element.ts'


//

export type AnchorFactory = HTMLElementFactory & { blank: HTMLElementFactory; };

function __a(attributes: object = {}): HTMLElementFactory {
	return (...content: unknown[]) => {
		const attr = typeof content[0] === "string" && typeof content[1] === "string"
			? { href: content.shift(), ...attributes }
			: HTMLElement.hasAttr(content[0])
				? { ...content.shift() as object, ...attributes }
				: attributes;

		return new HTMLElement(HTMLElement.Symbol.a, new HTMLAttributes(attr), content as Array<Part>);
	}
}

export const a: AnchorFactory = __a() as AnchorFactory;

a.blank = __a({ target:"_blank", rel:"noopener noreferrer" })


export const abbr: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.abbr);
export const address: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.address);
export const area: VoidHTMLElementFactory = HTMLElement.Void(HTMLElement.Symbol.area);
export const article: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.article);
export const aside: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.aside);
export const audio: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.audio);
export const b: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.b);
export const base: VoidHTMLElementFactory = HTMLElement.Void(HTMLElement.Symbol.base);
export const bdi: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.bdi);
export const bdo: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.bdo);
export const blockquote: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.blockquote);
export const body: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.body);
export const br: VoidHTMLElementFactory = HTMLElement.Void(HTMLElement.Symbol.br);


export type ButtonFactory = HTMLElementFactory & { submit: HTMLElementFactory; reset: HTMLElementFactory; };

function __button(preset: object): HTMLElementFactory {
	return (...content: unknown[]) => {
		const attr = HTMLElement.hasAttr(content[0])
			? content.shift() as object
			: {};

		return new HTMLElement(HTMLElement.Symbol.button, new HTMLAttributes({ ...attr, ...preset }), content as Array<Part>);
	};
}

export const button: ButtonFactory = ((...content: unknown[]) => {
	const attr = HTMLElement.hasAttr(content[0])
		? content.shift() as object
		: {};

	return new HTMLElement(HTMLElement.Symbol.button, new HTMLAttributes({ type: "button", ...attr }), content as Array<Part>);
}) as ButtonFactory;

button.submit = __button({ type: "submit" });
button.reset = __button({ type: "reset" });


export const canvas: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.canvas);
export const caption: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.caption);
export const cite: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.cite);
export const code: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.code);
export const col: VoidHTMLElementFactory = HTMLElement.Void(HTMLElement.Symbol.col);
export const colgroup: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.colgroup);
export const data: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.data);
export const datalist: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.datalist);
export const dd: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.dd);
export const del: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.del);
export const details: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.details);
export const dfn: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.dfn);
export const dialog: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.dialog);
export const div: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.div);
export const dl: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.dl);
export const dt: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.dt);
export const em: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.em);
export const embed: VoidHTMLElementFactory = HTMLElement.Void(HTMLElement.Symbol.embed);
export const fieldset: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.fieldset);
export const figcaption: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.figcaption);
export const figure: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.figure);
export const footer: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.footer);
export const form: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.form);
export const h1: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.h1);
export const h2: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.h2);
export const h3: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.h3);
export const h4: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.h4);
export const h5: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.h5);
export const h6: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.h6);


/** Includes <meta charset="UTF-8"> automatically. */
export const head: HTMLElementFactory = (...content: unknown[]) => HTMLElement.NonVoid(HTMLElement.Symbol.head)(
	meta({charset: "utf-8"}),
	...content
);


export const header: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.header);
export const hgroup: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.hgroup);
export const hr: VoidHTMLElementFactory = HTMLElement.Void(HTMLElement.Symbol.hr);


export const html: HTMLElementFactory = (...content: unknown[]) => {
	const attr = typeof content[0] === "string"
		? { lang: content.shift() }
		: HTMLElement.hasAttr(content[0])
			? content.shift() as object
			: {};

	return new HTMLElement(HTMLElement.Symbol.html, new HTMLAttributes(attr), content as Array<Part>);
}


export const i: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.i);
export const iframe: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.iframe);
export const img: VoidHTMLElementFactory = HTMLElement.Void(HTMLElement.Symbol.img);


export type InputFactory = ((attributes?: object, required?: boolean) => HTMLElement) & {
	button: InputFactory;
	checkbox: InputFactory;
	color: InputFactory;
	date: InputFactory;
	datetimeLocal: InputFactory;
	email: InputFactory;
	file: InputFactory;
	hidden: InputFactory;
	image: InputFactory;
	month: InputFactory;
	number: InputFactory;
	password: InputFactory;
	radio: InputFactory;
	range: InputFactory;
	reset: InputFactory;
	search: InputFactory;
	submit: InputFactory;
	tel: InputFactory;
	text: InputFactory;
	time: InputFactory;
	url: InputFactory;
	week: InputFactory;
};

function __input(preset: object): InputFactory {
	return ((attributes: object = {}, required: boolean = false) => {
		return new HTMLElement(HTMLElement.Symbol.input, new HTMLAttributes({
			...attributes, ...preset, ...(required ? { required: null } : {})
		}));
	}) as InputFactory;
}

export const input: InputFactory = ((attributes: object = {}, required: boolean = false) => {
	return new HTMLElement(HTMLElement.Symbol.input, new HTMLAttributes({
		type: "text", ...attributes, ...(required ? { required: null } : {})
	}));
}) as InputFactory;

input.button = __input({ type: "button" });
input.checkbox = __input({ type: "checkbox" });
input.color = __input({ type: "color" });
input.date = __input({ type: "date" });
input.datetimeLocal = __input({ type: "datetime-local" });
input.email = __input({ type: "email" });
input.file = __input({ type: "file" });
input.hidden = __input({ type: "hidden" });
input.image = __input({ type: "image" });
input.month = __input({ type: "month" });
input.number = __input({ type: "number" });
input.password = __input({ type: "password" });
input.radio = __input({ type: "radio" });
input.range = __input({ type: "range" });
input.reset = __input({ type: "reset" });
input.search = __input({ type: "search" });
input.submit = __input({ type: "submit" });
input.tel = __input({ type: "tel" });
input.text = __input({ type: "text" });
input.time = __input({ type: "time" });
input.url = __input({ type: "url" });
input.week = __input({ type: "week" });


export const ins: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.ins);
export const kbd: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.kbd);
export const label: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.label);
export const legend: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.legend);
export const li: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.li);
export const link: VoidHTMLElementFactory = HTMLElement.Void(HTMLElement.Symbol.link);
export const main: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.main);
export const map: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.map);
export const mark: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.mark);
export const math: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.math);
export const menu: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.menu);
export const menuitem: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.menuitem);


type OGTagFactory = (attributes: object) => HTMLElement[];

type OGTagBuilder = OGTagFactory & {
	article: OGTagFactory,
	book: OGTagFactory,
	event: OGTagFactory,
	product: OGTagFactory,

	audio: OGTagFactory,
	video: OGTagFactory
}

export const meta: VoidHTMLElementFactory & {
	tags: (attributes: object) => HTMLElement[],
	og: OGTagBuilder
} = HTMLElement.Void(HTMLElement.Symbol.meta) as VoidHTMLElementFactory & {
	tags: (attributes: object) => HTMLElement[],
	og: OGTagBuilder
};


meta.tags = (attributes: object) => {
	return Object.entries(attributes).map(([key, value]) =>
		meta({ name: key, content: value}));
};


function __og(prefix: string): OGTagFactory {
	return ((attributes: object) => {
		return Object.entries(attributes).map(([key, value]) =>
			meta({ property: `${prefix}:${key}`, content: value}));
	});
}

meta.og = __og("og") as OGTagBuilder;

meta.og.article = __og("article");
meta.og.audio = __og("og:audio");
meta.og.book = __og("book");
meta.og.event = __og("event");
meta.og.product = __og("product");
meta.og.video = __og("og:video");


export const meter: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.meter);
export const nav: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.nav);
export const noscript: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.noscript);
export const object: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.object);
export const ol: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.ol);
export const optgroup: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.optgroup);
export const option: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.option);
export const output: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.output);
export const p: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.p);
export const param: VoidHTMLElementFactory = HTMLElement.Void(HTMLElement.Symbol.param);
export const picture: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.picture);
export const pre: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.pre);
export const progress: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.progress);
export const q: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.q);
export const rb: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.rb);
export const rp: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.rp);
export const rt: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.rt);
export const rtc: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.rtc);
export const ruby: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.ruby);
export const s: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.s);
export const samp: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.samp);


export type ScriptFactory = (attributes?: object, content?: Array<string | null | undefined>) => HTMLScriptElement;

export interface ImportMapData {
	imports?: Record<string, string>;
	scopes?: Record<string, Record<string, string>>;
	integrity?: Record<string, string>;
}


function isFlatImports(obj: Record<string, string> | ImportMapData): obj is Record<string, string> {
	return Object.values(obj).every(value => typeof value === "string");
}

export const script: ScriptFactory & {
	module: () => HTMLScriptElement;
	importmap: (map: Record<string, string> | ImportMapData) => HTMLScriptElement;
} = ((
	attributes: object = {},
	content: Array<string | null | undefined> = []
) => new HTMLScriptElement(attributes, content)) as ScriptFactory & {
	module: () => HTMLScriptElement;
	importmap: (map: Record<string, string> | ImportMapData) => HTMLScriptElement;
};

script.module = (): HTMLScriptElement => script().type("module");

script.importmap = (map: Record<string, string> | ImportMapData): HTMLScriptElement =>
	script({}, [
		JSON.stringify(isFlatImports(map) ? { imports: map } : map)
			.replace(/</g, "\\u003c")
			.replace(/>/g, "\\u003e")
			.replace(/&/g, "\\u0026")
	]).type("importmap");


export const section: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.section);
export const select: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.select);
export const slot: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.slot);
export const small: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.small);
export const source: VoidHTMLElementFactory = HTMLElement.Void(HTMLElement.Symbol.source);
export const span: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.span);
export const strong: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.strong);
export const style: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.style);
export const sub: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.sub);
export const summary: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.summary);
export const sup: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.sup);

export const table: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.table);
export const tbody: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.tbody);
export const td: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.td);
export const template: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.template);
export const textarea: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.textarea);
export const tfoot: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.tfoot);
export const th: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.th);
export const thead: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.thead);
export const time: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.time);
export const title: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.title);
export const tr: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.tr);
export const track: VoidHTMLElementFactory = HTMLElement.Void(HTMLElement.Symbol.track);
export const u: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.u);
export const ul: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.ul);
export const variable: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.var);
export const video: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.Symbol.video);
export const wbr: VoidHTMLElementFactory = HTMLElement.Void(HTMLElement.Symbol.wbr);
