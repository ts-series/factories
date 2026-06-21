# Factories.ts — Reference

## Table of Contents

- [Elements](#elements)
  - [Non-Void Elements](#non-void-elements)
  - [Void Elements](#void-elements)
  - [Special Factories](#special-factories)
- [SVG](#svg)
- [MathML](#mathml)
- [Attributes](#attributes)
  - [Passing Attributes](#passing-attributes)
  - [Attribute Methods](#attribute-methods)
  - [Boolean Attributes](#boolean-attributes)
  - [Data Attributes](#data-attributes)
  - [Event Handlers](#event-handlers)
- [Expansion](#expansion)
  - [expand()](#expand)
  - [Sibling Elements](#sibling-elements)
- [Content Manipulation](#content-manipulation)
- [Querying](#querying)
- [Script Element](#script-element)
- [Meta Helpers](#meta-helpers)


## Elements

### Non-Void Elements

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

### Void Elements

Void elements accept only an optional attributes object:

```ts
import { img, hr } from 'factories'

img({ src: "/logo.png", alt: "Logo" })
hr()
```

### Special Factories

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

> As with all elements, behavior is attached from a separate client-side module — see [Event Handlers](#event-handlers).

#### `input`

Accepts an attributes object and an optional boolean `required` flag:

```ts
input.email({ name: "email", placeholder: "you@example.com" }, true)
```

Available subtypes: `button`, `checkbox`, `color`, `date`, `datetimeLocal`, `email`, `file`, `hidden`, `image`, `month`, `number`, `password`, `radio`, `range`, `reset`, `search`, `submit`, `tel`, `text`, `time`, `url`, `week`.

#### `script`

Returns an `HTMLScriptElement` — see [Script Element](#script-element).

```ts
script({ src: "/app.js", defer: null })

script({ src: "/app.js", defer: null })

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

## SVG

All SVG factories can be imported directly from `factories/svg`. Alternatively, only `svg` can be imported — either from `factories` or `factories/svg` — and used as a namespace for the remaining factories, since they're attached to it as properties:

```ts
import { svg, circle, path } from 'factories/svg'

const icon = svg({ viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
    circle({ cx: 12, cy: 12, r: 10, fill: "none", stroke: "currentColor", "stroke-width": 2 }),
    svg.path({ d: "M12 8v4l3 3", stroke: "currentColor", "stroke-width": 2, "stroke-linecap": "round" })
)
```

SVG elements use `SVGElement` and `SVGAttributes` internally, so unknown attributes are never prefixed with `data-`. Chainable attribute methods cover the most common presentation attributes: `fill`, `stroke`, `strokeWidth`, `opacity`, `transform`, `cx`, `cy`, `r`, `x`, `y`, `x1`, `y1`, `x2`, `y2`, `width`, `height`, `d`, `points`, `viewBox`, `href`, and others.

Available factories: `svg`, `g`, `defs`, `symbol`, `use`, `marker`, `a`, `image`, `circle`, `rect`, `line`, `ellipse`, `polyline`, `polygon`, `path`, `text`, `tspan`, `textPath`, `linearGradient`, `radialGradient`, `pattern`, `stop`, `clipPath`, `mask`, `filter`, `animate`, `animateTransform`, `animateMotion`, `set`, `title`, `desc`, `style`, `script`

Filter primitives: `feBlend`, `feColorMatrix`, `feComponentTransfer`, `feComposite`, `feConvolveMatrix`, `feDiffuseLighting`, `feDisplacementMap`, `feDropShadow`, `feFlood`, `feGaussianBlur`, `feImage`, `feMerge`, `feMergeNode`, `feMorphology`, `feOffset`, `feSpecularLighting`, `feTile`, `feTurbulence`


## MathML

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


## Attributes

### Passing Attributes

Attributes are passed as a plain object to the first argument of any factory function. Unknown keys that are not valid HTML attribute names are automatically prefixed with `data-`:

```ts
div({ id: "app", myCustomThing: "x" })
// → <div id="app" data-my-custom-thing="x">
```

Keys in `snake_case`, `camelCase`, and `PascalCase` are normalized to `kebab-case`:

```ts
div({ httpEquiv: "refresh" })    // → http-equiv="refresh"
div({ accept_charset: "utf-8" }) // → accept-charset="utf-8"
```

Attributes can also be added or overwritten after construction using the `set()` method:

```ts
const el = div("Hello")
el.set({ id: "main" })
el.set("hidden")                  // Boolean attribute by string
el.set({ id: "main" }, "hidden")  // Multiple at once
```

### Attribute Methods

All global and most element-specific attributes are available as chainable setter methods:

```ts
div().id("main").lang("de").tabindex(-1)
input.text({ name: "q" }).placeholder("Search…").required()
```

Global attribute methods: `accesskey`, `class`, `contenteditable`, `dir`, `draggable`, `enterkeyhint`, `hidden`, `id`, `inert`, `inputmode`, `lang`, `popover`, `spellcheck`, `style`, `tabindex`, `title`, `translate`

Element-specific attribute methods: `alt`, `autofocus`, `charset`, `checked`, `cols`, `colspan`, `disabled`, `for`, `formnovalidate`, `height`, `href`, `max`, `min`, `multiple`, `name`, `placeholder`, `readonly`, `required`, `rows`, `rowspan`, `selected`, `size`, `src`, `step`, `type`, `value`, `width`

### Boolean Attributes

A value of `null` renders the attribute without a value:

```ts
input.checkbox({ name: "agree", checked: null })
// → <input type="checkbox" name="agree" checked>
```

Methods for boolean attributes accept an optional `boolean` argument (default `true`) and add the attribute only if it is truthy:

```ts
input.text({ name: "q" }).required(isRequired)
```

### Data Attributes

Any key starting with `data` or unknown to the HTML attribute list is automatically prefixed with `data-` during expansion:

```ts
div({ dataUserId: 42 }) // → data-user-id="42"
div({ fooBar: "x" })    // → data-foo-bar="x"
```

### Event Handlers

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


## Expansion

### expand()

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

### Sibling Elements

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


## Content Manipulation

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


## Querying

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


## Script Element

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


## Meta Helpers

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
