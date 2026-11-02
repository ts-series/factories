# Factories.ts — Reference

## Table of Contents

1. [Elements](#1-elements)
   1. [Non-Void Elements](#11-non-void-elements)
   2. [Void Elements](#12-void-elements)
   3. [Special Factories](#13-special-factories)
   4. [Child Content Rules](#14-child-content-rules)
2. [SVG](#2-svg)
3. [MathML](#3-mathml)
4. [Attributes](#4-attributes)
   1. [Passing Attributes](#41-passing-attributes)
   2. [Attribute Methods](#42-attribute-methods)
   3. [Attribute Value Rules](#43-attribute-value-rules)
   4. [Reading, Assigning and Removing](#44-reading-assigning-and-removing)
   5. [Event Handlers](#45-event-handlers)
5. [Expansion](#5-expansion)
   1. [expand()](#51-expand)
   2. [Sibling Elements](#52-sibling-elements)
   3. [Escaping](#53-escaping)
6. [Content Manipulation](#6-content-manipulation)
7. [Querying](#7-querying)
8. [Script Element](#8-script-element)
9. [Meta Helpers](#9-meta-helpers)
10. [Custom Elements and Attributes](#10-custom-elements-and-attributes)


## 1. Elements

### 1.1 Non-Void Elements

All standard non-void HTML elements are exported as factory functions. The first argument is optionally an attributes object; all remaining arguments become child content:

```ts
import { div, p, span } from 'factories'

div({ id: "main" },
    p("Hello,", span({ class: "name" }, "World"), "!")
)
```

If the first argument is a plain object (prototype `Object.prototype`), it is always treated as attributes, regardless of its keys. Class instances such as `Date`, or objects with their own `toString()`, are content.

Other arguments that are not strings or elements are converted with `String()`, so overriding `toString()` controls their output. Strings and converted values are text and get HTML-escaped during expansion, see [Escaping](#53-escaping).

Nested arrays are flattened automatically, so lists of elements can be passed directly without spreading:

```ts
ul(items.map(item => li(item.name)))
```

`null`, `undefined` and booleans are skipped during expansion, so conditions can be written inline:

```ts
ul(li("A"), cond && li("B"))
```

Since the content parameter is a rest parameter, a child element that takes no attributes and no content can be passed without being called:

```ts
import { p, br } from 'factories'

p("Line one", br, "Line two")
```

### 1.2 Void Elements

Void elements accept only an optional attributes object:

```ts
import { img, hr } from 'factories'

img({ src: "/logo.png", alt: "Logo" })
hr()
```

### 1.3 Special Factories

#### `html`

Accepts an optional language string as shorthand for `{ lang: "..." }`, or a full attributes object:

```ts
html("en", head(...), body(...))
html({ lang: "en", "data-theme": "dark" }, head(...), body(...))
```

Expansion automatically prepends `<!DOCTYPE html>`.

#### `head`

Automatically inserts `<meta charset="utf-8">` as the first child:

```ts
head(title("My Page"), link({ rel: "stylesheet", href: "/style.css" }))
// → <head><meta charset="utf-8"><title>My Page</title>...
```

#### `a`

Accepts a URL string as the first argument as shorthand for `{ href: "..." }`. The shorthand applies only if the first two arguments are strings:

```ts
a("/about", "About")
// → <a href="/about">About</a>
```

`a.blank` is a variant that always sets `target="_blank" rel="noopener noreferrer"`:

```ts
a.blank("https://example.com", "External")
```

#### `button`

`button` defaults to `type="button"`, which can be overridden. The variants always set their `type`:

```ts
button("Plain")
button.submit("Send")
button.reset("Reset")
```

> As with all elements, behavior is attached from a separate client-side module, see [Event Handlers](#45-event-handlers).

#### `input`

Accepts an attributes object and an optional boolean `required` flag. `input` defaults to `type="text"`, which can be overridden. The subtypes always set their `type`:

```ts
input.email({ name: "email", placeholder: "you@example.com" }, true)
```

Available subtypes: `button`, `checkbox`, `color`, `date`, `datetimeLocal`, `email`, `file`, `hidden`, `image`, `month`, `number`, `password`, `radio`, `range`, `reset`, `search`, `submit`, `tel`, `text`, `time`, `url`, `week`.

#### `script`

Returns an `HTMLScriptElement`, see [Script Element](#8-script-element).

```ts
script({ src: "/app.js", defer: true })

script.module().src("/main.js")
	// <script type="module" src="/main.js"></script>

script.importmap({ react: "https://esm.sh/react" })
	// <script type="importmap">{"imports":{"react":"https://esm.sh/react"}}</script>
```

#### `variable`

The `var` element is exported as `variable` to avoid collision with the JS keyword:

```ts
import { variable } from 'factories'
variable("x")  // → <var>x</var>
```

### 1.4 Child Content Rules

Children are processed during `expand()`, in this order:

| Child | Result |
|---|---|
| `null`, `undefined`, `true`, `false` | Skipped |
| Function | Called without args until it returns a non-function; result follows these rules |
| Array or iterable | Flattened on creation, `append` and `insertAt`; entries follow these rules |
| Element | Expanded with attributes, children and closing tag |
| Anything else | Converted with `String()`, written as escaped text |

Strings are not treated as iterables.

#### Notes

- "Anything else" includes strings, numbers, `bigint`, `Date`, class instances without `Symbol.iterator`, plain objects and symbols.
- A plain object is only treated as attributes when it is the **first** argument. As a later argument it is written as `[object Object]`.
- Class instances and objects with their own `toString()` are content, so overriding `toString()` controls their output. Instances that are iterable (`Map`, `Set`, generators, iterator helpers) are expanded entry by entry instead; call `String(obj)` first to get text.
- All booleans are skipped, so both `cond && p("x")` and `cond || p("x")` are safe. To output the word "true", pass the string `"true"`.
- Functions may return strings, numbers, `null`, elements, arrays or iterables: the result follows the table, so `p(() => "Hi")` gives `<p>Hi</p>`. Functions are called without `this`.
- Iterables passed directly are consumed on creation. One-shot iterators returned by a function are consumed on the first `expand()`.
- A function that always returns a function never terminates.
- Text in `script` and `style` elements is not escaped. With `expand(..., false)` no text is escaped.
- Strings containing markup are text and never parsed. To embed markup, build elements, or expand a fragment first and pass `escaping = false` (see [Escaping](#53-escaping)).


## 2. SVG

All SVG factories can be imported from `factories/svg`. Alternatively, only `svg` can be imported and used as a namespace for the remaining factories, since they are attached to it as properties:

```ts
import { svg, circle } from 'factories/svg'

const icon = svg({ viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
    circle({ cx: 12, cy: 12, r: 10, fill: "none", stroke: "currentColor", strokeWidth: 2 }),
    svg.path({ d: "M12 8v4l3 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" })
)
```

SVG elements use `SVGElement` and `SVGAttributes` internally. Chainable attribute methods cover the most common presentation attributes: `fill`, `stroke`, `strokeWidth`, `opacity`, `transform`, `cx`, `cy`, `r`, `x`, `y`, `x1`, `y1`, `x2`, `y2`, `width`, `height`, `d`, `points`, `viewBox`, `href`, and others.

The content of the SVG `script` and `style` elements is raw text and never escaped. SVG output is intended for embedding in HTML.

Available factories: `svg`, `g`, `defs`, `symbol`, `use`, `marker`, `view`, `switch`, `a`, `image`, `foreignObject`, `circle`, `rect`, `line`, `ellipse`, `polyline`, `polygon`, `path`, `text`, `tspan`, `textPath`, `linearGradient`, `radialGradient`, `pattern`, `stop`, `clipPath`, `mask`, `filter`, `animate`, `animateTransform`, `animateMotion`, `mpath`, `set`, `title`, `desc`, `metadata`, `style`, `script`

Since `switch` is a JavaScript keyword, the standalone export is named `switch_`; as a property it is `svg.switch`.

Filter primitives: `feBlend`, `feColorMatrix`, `feComponentTransfer`, `feComposite`, `feConvolveMatrix`, `feDiffuseLighting`, `feDisplacementMap`, `feDistantLight`, `feDropShadow`, `feFlood`, `feFuncA`, `feFuncB`, `feFuncG`, `feFuncR`, `feGaussianBlur`, `feImage`, `feMerge`, `feMergeNode`, `feMorphology`, `feOffset`, `fePointLight`, `feSpecularLighting`, `feSpotLight`, `feTile`, `feTurbulence`


## 3. MathML

Like SVG, MathML elements live under their own subpath export, `factories/mathml`, with every factory available as a named export. The top-level `math` element doubles as a shorthand namespace carrying the other factories as properties:

```ts
import { math } from 'factories/mathml'

const formula = math(
    math.mfrac(
        math.mrow(math.mi("a"), math.mo("+"), math.mi("b")),
        math.mn(2)
    )
)
```

The package root exports an HTML `math` element, which is not the MathML namespace.

Available factories: `math`, `mglyph`, `mi`, `mn`, `mo`, `ms`, `mspace`, `mtext`, `mrow`, `mfrac`, `msqrt`, `mroot`, `mstyle`, `mpadded`, `mphantom`, `merror`, `menclose`, `mfenced`, `msub`, `msup`, `msubsup`, `munder`, `mover`, `munderover`, `mmultiscripts`, `mprescripts`, `none`, `mtable`, `mlabeledtr`, `mtr`, `mtd`, `maligngroup`, `malignmark`, `mstack`, `mlongdiv`, `msgroup`, `msrow`, `mscarries`, `mscarry`, `msline`, `semantics`, `annotation`, `annotationXml`, `maction`


## 4. Attributes

### 4.1 Passing Attributes

Attributes are passed as a plain object to the first argument of any factory function:

```ts
div({ id: "app", myCustomThing: "x" })
// → <div id="app" my-custom-thing="x">
```

Keys in `snake_case`, `camelCase`, and `PascalCase` are normalized to `kebab-case`, with each underscore becoming exactly one hyphen. Keys that are registered in the symbol lists use their exact registered spelling:

```ts
div({ httpEquiv: "refresh" })      // → http-equiv="refresh"
div({ accept_charset: "utf-8" })   // → accept-charset="utf-8"
div({ ariaLabel: "Close" })        // → aria-label="Close"
div({ dataUserId: 42 })            // → data-user-id="42"
svg({ xlinkHref: "#a" })           // → xlink:href="#a"
```

All WAI-ARIA attributes are known in camelCase (`ariaLabel`, `ariaHidden`, `ariaLabelledby`, ...). The camelCase keys are the lowercase ARIA names with a capital letter after `aria`, for example `ariaLabelledby` and not `ariaLabelledBy`. ARIA attributes and `role` are shared by HTML, SVG and MathML.

Attributes can also be added or overwritten after construction using the `set()` method:

```ts
const el = div("Hello")
el.set({ id: "main" })
el.set("hidden")                  // attribute without a value, by name
el.set({ id: "main" }, "hidden")  // multiple at once
```

### 4.2 Attribute Methods

Nearly all attributes are available as chainable setter methods:

```ts
div().id("main").lang("de").tabindex(-1)
input.text({ name: "q" }).placeholder("Search…").required()
```

Setters accept `undefined` to remove the attribute. Boolean attribute setters (`allowfullscreen`, `async`, `autofocus`, `autoplay`, `checked`, `controls`, `default`, `defer`, `disabled`, `formnovalidate`, `inert`, `ismap`, `loop`, `multiple`, `muted`, `novalidate`, `open`, `playsinline`, `readonly`, `required`, `reversed`, `selected`) set the attribute when called without an argument or with `true`, and remove it with `false` or `undefined`.

`hidden` and `popover` work the same way, and additionally accept a keyword string:

```ts
div().hidden()                 // → hidden=""
div().hidden("until-found")    // → hidden="until-found"
div().popover("manual")        // → popover="manual"
```

List setters (`class`, `role`, `part`, `headers`, `rel`, `sandbox`) take any number of values and ignore `false`, `null`, `undefined` and empty strings, so conditions can be written inline:

```ts
button("Send").class("primary", disabled && "disabled")
```

`style` accepts a string or an object of camelCase CSS properties:

```ts
div().style({ color: "red", fontSize: "1rem" })
p().itemscope("https://schema.org/Person").itemprop("name")
```

### 4.3 Attribute Value Rules

The same rules apply whether a value is passed in an attributes object, through `set()`, a setter method or by assigning to `attributes`. They are evaluated per value, in this order:

| Value | Result |
|---|---|
| `undefined` | The attribute is omitted |
| Boolean attribute (`checked`, `disabled`, `inert`, `required`, ...) set to `false` | The attribute is omitted |
| Boolean attribute set to anything else | The attribute is written without a value |
| `null` or `""` | `attr=""` |
| Array | Blank entries (`null`, `undefined`, booleans and empty strings) are removed, the rest is joined with spaces; the attribute is omitted if nothing remains |
| Plain object on `style` | Converted into an inline CSS string, skipping `null`, `undefined` and `false` values |
| Function | Written as a call: `fn.name()` or, for an arrow function, `(source)()` |
| Anything else, including `false`, `true` and numbers | Converted with `String()` |

The resulting text is always HTML-escaped (`&`, `<`, `>` and `"`), independent of the `escaping` parameter of `expand()`.

```ts
input.checkbox({ name: "agree", checked: true })
// → <input type="checkbox" name="agree" checked>

input.checkbox({ name: "agree", checked: false })
// → <input type="checkbox" name="agree">

div({ title: null })
// → <div title="">

div({ hidden: null })
// → <div hidden="">

div({ title: 'Das "Beste" davon' })
// → <div title="Das &quot;Beste&quot; davon">

a("/docs", "Docs").set({ rel: ["noopener", external && "noreferrer"] })
// → <a href="/docs" rel="noopener">Docs</a>   (external is false)

div({ style: { color: "red", fontSize: "1rem" } })
// → <div style="color: red; font-size: 1rem;">

div({ style: { __icon: "url(/icons/home.svg)" } })
// → <div style="--icon: url(/icons/home.svg);">
```

Two points deserve attention:

1. **`false` is a value on non-boolean attributes.** `div({ id: false })` is written as `id="false"`, which is intended for attributes such as `ariaHidden`, `draggable` or `contenteditable`, where `"false"` has a meaning. To omit an attribute conditionally, use `undefined`: `{ title: condition ? "x" : undefined }`. The pattern `condition && "x"` is only safe inside arrays and in the list setters such as `class()`.
2. **`hidden` and `popover` are not boolean attributes.** In an attributes object, use `null` for the bare attribute (`{ hidden: null }`) or a keyword string. `{ hidden: true }` is written as `hidden="true"`. The setters handle `true` and `false` for you.

Arrays are cleaned when the attributes are expanded, not when they are assigned. Reading an array attribute back may therefore still contain blank entries.

Custom property names are always lowercased, so uppercase letters cannot be preserved: use kebab-case names in the stylesheet.

### 4.4 Reading, Assigning and Removing

The `attributes` property is an attributes object (an instance of `HTMLAttributes`, `SVGAttributes` or `MathMLAttributes`) that exists so that attribute names never collide with the methods of the element. Single attributes can be read and written directly:

```ts
el.attributes.id            // read
el.attributes.id = "main"   // write, same as el.id("main")
```

Methods modelled on the DOM API:

```ts
el.hasAttribute("id")                  // true if the attribute is set
el.getAttribute("id")                  // its value, or undefined if not set
el.removeAttributes("hidden")          // removes a single attribute
el.removeAttributes("id", "hidden")    // removes several at once
```

`hasAttribute` and `getAttribute` use the name exactly as it was set: `hasAttribute("aria-label")` does not find `ariaLabel`. Unlike the DOM, `getAttribute` returns `undefined` for missing attributes, because `null` is a value (`attr=""`).

The `attributes` property is read-only. Use `set()` to apply several attributes at once.

### 4.5 Event Handlers

Factories.ts does not provide `onclick` / `onmouseover` / etc. methods or attribute helpers for inline event handlers. Embedding JavaScript as strings inside HTML attributes breaks the separation between markup and behavior, defeats bundling and tree-shaking, and complicates Content-Security-Policy setups that disallow inline scripts.

Attach behavior from a separate client-side module instead:

```ts
// server: page.ts
import { button } from '@ts-series/factories';

export const page = button({ id: "submit-btn" }, "Click");
```

```ts
// client: page.js
document.getElementById("submit-btn")?.addEventListener("click", () => {
	alert("Hello!");
});
```

If there is a need for server-side JS injections, this can still be done using the `set` method:

```ts
button("Click").set({ onclick: "doSomething()" })
```

The value is escaped like any other attribute value, and the browser decodes it again before running the code.


## 5. Expansion

### 5.1 `expand()`

Converts the element tree to an HTML string. Called without arguments, it produces compact output with no whitespace between tags:

```ts
div(p("Hello")).expand()
// → <div><p>Hello</p></div>
```

Signature:

```ts
expand(style?: number | null, offset?: number, escaping?: boolean): string
```

`style` controls indentation:

| Value | Effect |
|---|---|
| `null` (default) | No whitespace or line breaks |
| negative integer | Tab indentation |
| `0` | Line breaks, no indentation |
| positive integer | Spaces per depth level |

`offset` sets the initial indentation depth (default `0`).

`escaping` controls whether text content is HTML-escaped (default `true`), see [Escaping](#53-escaping).

```ts
page.expand(-1)  // tab-indented
page.expand(2)   // 2-space indented
page.expand(0)   // line breaks only
```

Phrasing-content elements (`span`, `p`, `a`, `strong`, `em`, `td`, `th`, etc.) never add whitespace around their children regardless of `style`, preserving inline text rendering.

`expand()` on the `html` element automatically prepends `<!DOCTYPE html>`.

Call `expand()` only once, on the outermost element, right before the output is sent. Inner parts are nested as elements, not as expanded strings.

### 5.2 Sibling Elements

To expand multiple sibling elements without a wrapping parent, for example when returning an HTML partial, use `Element.expandAll()`:

```ts
return new Response(
    Element.expandAll([nav(...), main(...)], -1),
    { headers: { "Content-Type": "text/html" } }
)
```

Signature:

```ts
static expandAll(elements: Element[], style?: number | null, offset?: number, escaping?: boolean): string
```

### 5.3 Escaping

Strings are text, not markup, so markup is only created by elements:

| Context | Escaped characters | Can be disabled |
|---|---|---|
| Text content | `&`, `<`, `>`, `"` | yes, with `escaping = false` |
| Attribute values | `&`, `<`, `>`, `"` | no |
| Content of `script` and `style` | none (raw text) | not applicable |

```ts
p("a < b & c").expand()
// → <p>a &lt; b &amp; c</p>
```

With `escaping = false`, text content is written unchanged for the whole tree, so the caller is responsible for every string in it. This allows embedding an already expanded fragment:

```ts
const inner = div(p(userInput)).expand();
const page = body(inner).expand(null, 0, false);
```

Strings inside the inner tree are escaped by the first `expand()`. In the outer tree, user input must not appear as a direct child, since it would not be escaped there.

`escape(value)` applies the same escaping to a single string:

```ts
escape('"a" & <b>')
// → &quot;a&quot; &amp; &lt;b&gt;
```

URL attributes are not validated: a `javascript:` URL in `href` is written as given. The content of a `style` element is raw text, so user data containing `</style>` must not be placed there.


## 6. Content Manipulation

Methods for modifying an element's children after construction. All return `this` for chaining.

| Method | Description |
|---|---|
| `append(...parts)` | Appends one or more children; nested arrays and iterables are flattened |
| `insertAt(index, part)` | Inserts a child at the given index; an array or iterable is flattened |
| `modifyChildren(fn)` | Replaces the children array via a mapping function |

Read access:

| Member | Description |
|---|---|
| `children` | The array of children, or `null` for void elements |
| `at(index)` | Returns the child at `index`; negative values count from the end |
| `firstChild` | The first child (property) |
| `lastChild` | The last child (property) |
| `getElementByIndex(index)` | Returns the child at `index` |

```ts
const list = ul(li("A"), li("B"))
list.append(li("C"))
list.append(extraItems.map(x => li(x)))
list.insertAt(0, li("First"))
list.modifyChildren(parts => parts.filter(p => p !== null))
```

Arrays and iterables that are passed directly are flattened, so `at`, `firstChild`, `lastChild` and `find()` see every one of those children. `modifyChildren` must return a flat array.

Children can also be functions. They are called during expansion, and their results are expanded completely, with content and closing tag. Arrays and iterables returned by a function are resolved at that time and do not appear in `children`:

```ts
div(() => expensiveElement())
```


## 7. Querying

`find()` performs a depth-first search for the first descendant (or self) matching a predicate:

```ts
const heading = page.find(el => el.symbol === HTMLElement.Symbol.h1)
```

For collections, use standard array methods:

```ts
const elements: HTMLElement[] = [...]
elements.find(el => el.symbol === HTMLElement.Symbol.td)
elements.filter(el => el.hasAttribute("data-id"))
```


## 8. Script Element

`script()` returns an `HTMLScriptElement` with additional methods for generating inline JavaScript. All methods return `this`. The content of a `script` element is raw text and is never HTML-escaped.

```ts
script()
    .import("/modules/chart.js", "renderChart")
    .call("renderChart", { labels: ["A", "B"], values: [1, 2] })
```

#### `.call(fn, ...args)`

Appends a function call. Arguments are serialized as JavaScript literals. Strings and object keys are written as valid JSON string literals, and `<` is written as `\u003c`, so quotes, backslashes, line breaks and `</script>` in values cannot break the script:

```ts
script().call("init", "en", 42, true, null, ["a", "b"])
// → init("en", 42, true, null, ["a", "b"]);
```

Supported argument types: `string`, `number`, `boolean`, `null`, `undefined`, arrays, plain objects.

#### `.import(path, ...names)`

Appends an ES module import statement. With no names, imports for side effects only. The path is written as a safe string literal, and `null` or `undefined` names are ignored:

```ts
script().import("/app.js")                     // → import "/app.js";
script().import("/app.js", "init", "teardown") // → import { init, teardown } from "/app.js";
```

#### `.importOnly(path, name, ...args)`

Combines `.import()` and `.call()` for the common case of importing and immediately calling a single function:

```ts
script().importOnly("/chart.js", "render", data)
// → import { render } from "/chart.js"; render({...});
```

#### `script.module()`

Returns a `<script type="module">` element:

```ts
script.module().importOnly("/app.js", "main")
```

#### `script.importmap(map)`

Returns a `<script type="importmap">` element. In the JSON, `<`, `>` and `&` are written as `\u003c`, `\u003e` and `\u0026`.


## 9. Meta Helpers

#### `meta.tags(attributes)`

Converts a plain object into an array of `<meta name="..." content="...">` elements:

```ts
meta.tags({ description: "My site", author: "Rico" })
// → [<meta name="description" content="My site">, <meta name="author" content="Rico">]
```

#### `meta.og`

Generates Open Graph `<meta property="og:..." content="...">` tags:

```ts
meta.og({ title: "My Page", type: "website", url: "https://example.com" })
```

Available namespaced variants:

| Factory | Prefix |
|---|---|
| `meta.og` | `og` |
| `meta.og.article` | `article` |
| `meta.og.book` | `book` |
| `meta.og.event` | `event` |
| `meta.og.product` | `product` |
| `meta.og.audio` | `og:audio` |
| `meta.og.video` | `og:video` |


## 10. Custom Elements and Attributes

Elements outside the built-in HTML/SVG/MathML sets can be registered at runtime using `define`, useful for Web Components:

```ts
import { HTMLElement, type HTMLElementFactory } from 'factories'

const myWidget: HTMLElementFactory = HTMLElement.NonVoid(HTMLElement.define("my-widget"))

myWidget({ name: "og:title", "content-type": "text" }, "Hello")
// → <my-widget name="og:title" content-type="text">Hello</my-widget>
```

`define` is idempotent: calling it again with an already-registered name returns the existing symbol.

Custom attributes need no registration. Any key of an attributes object is written, converted to kebab-case:

```ts
div({ dataTheme: "dark" })   // → <div data-theme="dark">
```

`HTMLAttributes.define(key, options)` is only needed to keep an exact spelling or to mark a boolean attribute. `options.name` sets the written name (default: the key in kebab-case), `options.boolean` writes it as a bare name:

```ts
HTMLAttributes.define("myFlag", { boolean: true });          // my-flag
HTMLAttributes.define("viewBoxLike", { name: "viewBoxLike" }); // keeps its spelling
```

To get types for custom attributes, augment the interface of the attributes class:

```ts
declare module "@ts-series/factories" {
	interface HTMLAttributes {
		dataTheme?: "light" | "dark";
		myFlag?: boolean | null;
	}
}
```

Types and output are independent: augmentation only informs the type checker, `define` only affects the written output.