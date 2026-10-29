# Factories.ts — Reference

## Table of Contents

1. [Elements](#1-elements)
   1. [Non-Void Elements](#11-non-void-elements)
   2. [Void Elements](#12-void-elements)
   3. [Special Factories](#13-special-factories)
2. [SVG](#2-svg)
3. [MathML](#3-mathml)
4. [Attributes](#4-attributes)
   1. [Passing Attributes](#41-passing-attributes)
   2. [Attribute Methods](#42-attribute-methods)
   3. [Attribute Value Rules](#43-attribute-value-rules)
   4. [Removing Attributes](#44-removing-attributes)
   5. [Event Handlers](#45-event-handlers)
5. [Expansion](#5-expansion)
   1. [expand()](#51-expand)
   2. [Sibling Elements](#52-sibling-elements)
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

Arguments that are not strings or `HTMLElement` instances are converted via `.toString()`.

`null` and `undefined` children are silently skipped during expansion.

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

Automatically inserts `<meta charset="UTF-8">` as the first child:

```ts
head(title("My Page"), link({ rel: "stylesheet", href: "/style.css" }))
// → <head><meta charset="UTF-8"><title>My Page</title>...
```

#### `a`

Accepts a URL string as the first argument as shorthand for `{ href: "..." }`:

```ts
a("/about", "About")
// → <a href="/about">About</a>
```

`a.blank` is a variant that presets `target="_blank" rel="noopener noreferrer"`:

```ts
a.blank("https://example.com", "External")
```

#### `button`

Variants with a preset `type` attribute:

```ts
button.submit("Send")
button.reset("Reset")
```

> As with all elements, behavior is attached from a separate client-side module — see [Event Handlers](#45-event-handlers).

#### `input`

Accepts an attributes object and an optional boolean `required` flag:

```ts
input.email({ name: "email", placeholder: "you@example.com" }, true)
```

Available subtypes: `button`, `checkbox`, `color`, `date`, `datetimeLocal`, `email`, `file`, `hidden`, `image`, `month`, `number`, `password`, `radio`, `range`, `reset`, `search`, `submit`, `tel`, `text`, `time`, `url`, `week`.

#### `script`

Returns an `HTMLScriptElement` — see [Script Element](#8-script-element).

```ts
script({ src: "/app.js", defer: true })

script.module({ src: "/main.js" })
	// <script type="module" src="/main.js">

script.importmap({ react: "https://esm.sh/react" })
	// <script type="importmap">{"imports": {"react": "https://esm.sh/react"}}</script>
```

#### `variable`

The `var` element is exported as `variable` to avoid collision with the JS keyword:

```ts
import { variable } from 'factories'
variable("x")  // → <var>x</var>
```

## 2. SVG

All SVG factories can be imported directly from `factories/svg`. Alternatively, only `svg` can be imported — either from `factories` or `factories/svg` — and used as a namespace for the remaining factories, since they're attached to it as properties:

```ts
import { svg, circle, path } from 'factories/svg'

const icon = svg({ viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
    circle({ cx: 12, cy: 12, r: 10, fill: "none", stroke: "currentColor", "stroke-width": 2 }),
    svg.path({ d: "M12 8v4l3 3", stroke: "currentColor", "stroke-width": 2, "stroke-linecap": "round" })
)
```

SVG elements use `SVGElement` and `SVGAttributes` internally. Chainable attribute methods cover the most common presentation attributes: `fill`, `stroke`, `strokeWidth`, `opacity`, `transform`, `cx`, `cy`, `r`, `x`, `y`, `x1`, `y1`, `x2`, `y2`, `width`, `height`, `d`, `points`, `viewBox`, `href`, and others.

Available factories: `svg`, `g`, `defs`, `symbol`, `use`, `marker`, `a`, `image`, `circle`, `rect`, `line`, `ellipse`, `polyline`, `polygon`, `path`, `text`, `tspan`, `textPath`, `linearGradient`, `radialGradient`, `pattern`, `stop`, `clipPath`, `mask`, `filter`, `animate`, `animateTransform`, `animateMotion`, `set`, `title`, `desc`, `style`, `script`

Filter primitives: `feBlend`, `feColorMatrix`, `feComponentTransfer`, `feComposite`, `feConvolveMatrix`, `feDiffuseLighting`, `feDisplacementMap`, `feDropShadow`, `feFlood`, `feGaussianBlur`, `feImage`, `feMerge`, `feMergeNode`, `feMorphology`, `feOffset`, `feSpecularLighting`, `feTile`, `feTurbulence`


## 3. MathML

Like with SVG, MathML elements live under their own subpath export, factories/mathml, with every factory available as a named export. The top-level math element doubles as a shorthand namespace, carrying the other factories as properties, for when individual imports are unwanted:

```ts
import { math } from 'factories/mathml'

const formula = math(
    math.mfrac(
        math.mrow(math.mi("a"), math.mo("+"), math.mi("b")),
        math.mn(2)
    )
)
```

This namespace property can also be reached through the package root: `import { math } from 'factories'`.

Available factories: `math`, `mi`, `mn`, `mo`, `ms`, `mspace`, `mtext`, `mrow`, `mfrac`, `msqrt`, `mroot`, `mstyle`, `mpadded`, `mphantom`, `merror`, `menclose`, `mfenced`, `msub`, `msup`, `msubsup`, `munder`, `mover`, `munderover`, `mmultiscripts`, `mprescripts`, `mtable`, `mtr`, `mtd`, `maligngroup`, `malignmark`, `mstack`, `mlongdiv`, `msgroup`, `msrow`, `mscarries`, `mscarry`, `msline`, `semantics`, `annotation`, `maction`


## 4. Attributes

### 4.1 Passing Attributes

Attributes are passed as a plain object to the first argument of any factory function:

```ts
div({ id: "app", myCustomThing: "x" })
// → <div id="app" my-custom-thing="x">
```

Keys in `snake_case`, `camelCase`, and `PascalCase` are normalized to `kebab-case`, with each underscore becoming exactly one hyphen:

```ts
div({ httpEquiv: "refresh" })      // → http-equiv="refresh"
div({ accept_charset: "utf-8" })   // → accept-charset="utf-8"
div({ ariaLabel: "Close" })        // → aria-label="Close"
div({ dataUserId: 42 })            // → data-user-id="42"
```

Attributes can also be added or overwritten after construction using the `set()` method:

```ts
const el = div("Hello")
el.set({ id: "main" })
el.set("hidden")                  // Boolean attribute by string
el.set({ id: "main" }, "hidden")  // Multiple at once
```

### 4.2 Attribute Methods

All global and most element-specific attributes are available as chainable setter methods:

```ts
div().id("main").lang("de").tabindex(-1)
input.text({ name: "q" }).placeholder("Search…").required()
```

Global attribute methods: `accesskey`, `class`, `contenteditable`, `dir`, `draggable`, `enterkeyhint`, `hidden`, `id`, `inert`, `inputmode`, `itemprop`, `itemscope`, `lang`, `popover`, `spellcheck`, `style`, `tabindex`, `title`, `translate`

Element-specific attribute methods: `alt`, `autofocus`, `charset`, `checked`, `cols`, `colspan`, `disabled`, `for`, `formnovalidate`, `height`, `href`, `max`, `min`, `multiple`, `name`, `placeholder`, `readonly`, `required`, `rows`, `rowspan`, `selected`, `size`, `src`, `step`, `type`, `value`, `width`

Every attribute setter accepts `undefined` to remove the attribute; boolean-attribute setters (`autofocus`, `checked`, `disabled`, `formnovalidate`, `hidden`, `multiple`, `popover`, `readonly`, `required`, `selected`) take an optional boolean argument, defaulting to `true`.

```ts
div().style({ color: "red", fontSize: "1rem" })
p().itemscope("https://schema.org/Person").itemprop("name")
```

### 4.3 Attribute Value Rules

Attribute values follow a consistent set of rules, applied both when passing a plain object and when using a setter method:

- `undefined` removes the attribute entirely.
- `null` or an empty string `""` sets a non-boolean attribute without a value (`attr=""`).
- Boolean HTML attributes (such as `checked`, `disabled`, `hidden`, `readonly`, `required`, `selected`, …) are set without a value when `true` or `null`, and removed entirely when `false` or `undefined`.
- Arrays are joined with spaces into a single attribute value.
- A plain object assigned to `style` is converted into an inline CSS string automatically. Keys are normalized like attribute names, so a `__` prefix produces a custom property.
- Any other value is converted to a string using `String()`.

```ts
input.checkbox({ name: "agree", checked: true })
// → <input type="checkbox" name="agree" checked>

input.checkbox({ name: "agree", checked: false })
// → <input type="checkbox" name="agree">

div({ title: null })
// → <div title="">

div({ style: { color: "red", fontSize: "1rem" } })
// → <div style="color: red; font-size: 1rem;">

div({ style: { __icon: "url(/icons/home.svg)" } })
// → <div style="--icon: url(/icons/home.svg);">
```

Custom property names are always lowercased, so uppercase letters cannot be preserved: Use kebab-case names in the stylesheet.

### 4.4 Removing Attributes

Attributes can be removed explicitly, independent of the value rules above:

```ts
const el = div({ id: "main", hidden: true })
el.attributes.remove("hidden")               // removes a single attribute
el.attributes.removeMany("id", "hidden")     // removes multiple attributes at once
```

### 4.5 Event Handlers

Factories.ts does not provide `onclick` / `onmouseover` / etc. methods or attribute helpers for inline event handlers. Embedding JavaScript as strings inside HTML attributes breaks the separation between markup and behavior, defeats bundling and tree-shaking, ultimately complicates Content-Security-Policy setups that disallow inline scripts.

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

If, however, there is a need for server-side JS injections, this can still be done using the `set` method, for example:

```ts
button("Click").set({ onclick: "doSomething()" })
```


## 5. Expansion

### 5.1 `expand()`

Converts the element tree to an HTML string. Called without arguments, it produces compact output with no whitespace between tags:

```ts
div(p("Hello")).expand()
// → <div><p>Hello</p></div>
```

Signature:

```ts
expand(style?: number | null, offset?: number): string
```

`style` controls indentation:

| Value | Effect |
|---|---|
| `null` (default) | No whitespace or line breaks |
| negative integer | Tab indentation |
| `0` | Line breaks, no indentation |
| positive integer | Spaces per depth level |

`offset` sets the initial indentation depth (default `0`).

```ts
page.expand(-1)  // tab-indented
page.expand(2)   // 2-space indented
page.expand(0)   // line breaks only
```

Phrasing-content elements (`span`, `p`, `a`, `strong`, `em`, `td`, `th`, etc.) never add whitespace around their children regardless of `style`, preserving inline text rendering.

`expand()` on the `html` element automatically prepends `<!DOCTYPE html>`.

### 5.2 Sibling Elements

To expand multiple sibling elements without a wrapping parent — for example when returning an HTML partial — use `HTMLElement.expandAll()`:

```ts
return new Response(
    HTMLElement.expandAll([nav(...), main(...)], -1),
    { headers: { "Content-Type": "text/html" } }
)
```

Signature:

```ts
static expandAll(elements: HTMLElement[], style?: number | null, offset?: number): string
```


## 6. Content Manipulation

Methods for modifying an element's content after construction. All return `this` for chaining unless noted.

| Method | Description |
|---|---|
| `append(...parts)` | Appends one or more children |
| `insertAt(index, part)` | Inserts a child at the given index |
| `modifyContent(fn)` | Replaces the content array via a mapping function |
| `at(index)` | Returns the child at `index`; negative values count from the end |
| `firstChild` | The first child (property) |
| `lastChild` | The last child (property) |
| `getElementByIndex(index)` | Returns the child at `index` |

```ts
const list = ul(li("A"), li("B"))
list.append(li("C"))
list.insertAt(0, li("First"))
list.modifyContent(parts => parts.filter(p => p !== null))
```

Children can also be thunks — zero-argument functions returning an `HTMLElement` — which are called lazily during expansion:

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
elements.filter(el => "data-id" in el.attributes)
```


## 8. Script Element

`script()` returns an `HTMLScriptElement` with additional methods for generating inline JavaScript. All methods return `this`.

```ts
script()
    .import("/modules/chart.js", "renderChart")
    .call("renderChart", { labels: ["A", "B"], values: [1, 2] })
```

#### `.call(fn, ...args)`

Appends a function call. Arguments are serialized as JavaScript literals:

```ts
script().call("init", "en", 42, true, null, ["a", "b"])
// → init("en", 42, true, null, ["a", "b"]);
```

Supported argument types: `string`, `number`, `boolean`, `null`, `undefined`, arrays, plain objects.

#### `.import(path, ...names)`

Appends an ES module import statement. With no names, imports for side effects only:

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

`HTMLAttributes.define()` registers a custom attribute name, useful for marking it as a boolean attribute or for having it recognized by `hasAttr()` when it is passed as the sole argument to an element factory:

```ts
HTMLAttributes.define("my-flag");
// HTMLAttributes.Boolean now includes "my-flag"
```

`define` is idempotent: calling it again with an already-registered name simply returns the existing symbol instead of throwing or overwriting it.