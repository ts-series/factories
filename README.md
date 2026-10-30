# Factories.ts

**Factories.ts** is a lightweight library for server-side rendering, featuring an embedded domain-specific language (DSL) for writing HTML, as well as SVG and MathML, directly in JavaScript/TypeScript. It has no dependencies, escapes text and attribute values by default, supports WAI-ARIA, custom elements and flexible output formatting, while also making it convenient to import client-side JavaScript modules and call them with server data.


## Installation

Available as an npm package:

```bash
pnpm install @ts-series/factories
```

```javascript
import { html, head, body } from "@ts-series/factories"
```


## Usage

Instead of a separate template language with its own engine, the HTML structure can be built dynamically using ordinary JavaScript functions:

```javascript
import {
	body, br, div, head, html, p, title
} from '@ts-series/factories'


let page = html({lang: "de"},
    head(
        title("Kafka Blindtext")
    ),
    body(
        p("Aber sie überwanden sich, umdrängten den Käfig und wollten sich gar nicht fortrühren. Jemand musste Josef K. verleumdet haben, denn ohne dass er etwas Böses getan hätte, wurde er eines Morgens verhaftet.")
    )
);

console.log(page.expand());
```

Besides significantly better performance, this approach also allows direct use of JavaScript/TypeScript for the decision logic within the markup.

### Elements

Apart from the `var` element as `variable`, all HTML elements and attributes are available under their actual names as ordinary functions: Nesting their calls builds the HTML declaratively. This approach is not only much more efficient than running a separate text processing engine, but also eliminates the need to learn a template language with its own syntax.

Another intention behind **Factories.ts** is to provide a DSL with as little syntactical noise as possible: Void elements such as `br` or elements without attributes and content do not even have to be called as functions, but can be passed directly:

```javascript
let hello = p("Hallo,", br, "kaputte Welt!");
```

In fact, all non-void elements have a rest parameter, so they can contain any number of other elements or JavaScript values, including nested arrays, which are flattened automatically. Arguments that do not represent HTML elements and are not already strings get automatically converted. Therefore, by overriding the corresponding `toString` method, the output in HTML can be precisely defined. This is particularly useful for outputting specific data, without any additional abstraction layers needed. The result is HTML-escaped like any other string.

### Attributes

Any attribute can be specified using an object whose keys are interpreted as such, and gets passed as the first argument; or specified subsequently using the `set` method. In addition, there are same-named methods for all global and element-specific HTML attributes, for example `x.id("about")`.

### Escaping

The special characters `&`, `<` and `>` in text content and `&` and `"` in attribute values get escaped automatically. The content of `script` and `style` elements is never escaped, and `HTMLScriptElement.call` serializes its values as safe JavaScript literals.

Text escaping can be disabled with the `escaping` parameter of `expand` and `expandAll`, for example to embed an already expanded fragment. From then on, the caller is responsible for all strings in that tree. Attribute values are nonetheless always escaped.

```javascript
const inner = div(p(userInput)).expand();
const page = body(inner).expand(null, 0, false);
```

### Client-Side JavaScript

Instead of inline event handlers or hand-written glue code, a `script` element can import a client module and call its functions directly with data from the server. Strings, numbers, booleans, arrays and plain objects are passed as JavaScript literals, so no manual serialization or escaping is needed:

```javascript
import { script } from "@ts-series/factories"

script.module().importOnly("/chart.js", "render", { labels: ["A", "B"], values: [1, 2] })
// → <script type="module">import { render } from "/chart.js"; render({"labels": ["A", "B"], "values": [1, 2]}); </script>
```

### Custom Elements and Attributes

Elements and attributes outside the built-in HTML/SVG/MathML sets can be registered at runtime using `define`, for example `HTMLElement.define("my-widget")` or `HTMLAttributes.define("my-attr")`. This is useful for Web Components and other custom markup.

### String Expansion

The problem with the template approach is that it can only link markup with the backend programming language through detours such as an additional template language, which raises the question of why these two things should be separated in the first place. In **Factories.ts**, conversion to an HTML string using the `expand` method only happens at the very end, right before the response is sent:

```javascript
import { serve } from "hono"
import { html, head, title, body, p } from "@ts-series/factories"

serve((req) => {
    const page = html({lang: "en"},
        head(title("Hello")),
        body(p("Hello, World!"))
    );

    return new Response(page.expand(), {
        headers: { "Content-Type": "text/html" }
    });
});
```

Since strings are escaped, `expand` should only be called once on the outermost element; inner parts are nested as elements, not as expanded strings.

### Post-Construction Manipulation

Until string expansion, inner elements and other content are held in plain arrays, which is not only quite efficient but also allows for modifications after the initial construction:

```javascript
const page = div(p("Hello"));
page.append(p("World"));
page.insertAt(0, p("First"));
```

`append` and `insertAt` also flatten nested arrays. However, such post-construction manipulation is not actually required, since markup can be assembled programmatically in advance through conditionals. Nonetheless, this capability is offered for edge cases.


## API Reference

A complete list of available methods can be found in the [Reference](https://github.com/ts-series/factories/blob/main/REFERENCE.md).


## Changelog

See [CHANGELOG.md](https://github.com/ts-series/factories/blob/main/CHANGELOG.md) for version history.


## Internals

Exceptions are not thrown. Instead, necessary type conversions get performed to enable error-free expansion into valid HTML as far as possible, regardless of what values are passed.


## Development Status

**Factories.ts** contains fewer than 2,000 lines of code with no dependencies. The principle of how HTML is described in JavaScript is quite logical and so are the interfaces. Consequently, no breaks are to be expected in future versions.

Future versions are only intended to offer more methods, provided this seems sensible. The question that still needs to be clarified here is whether more type safety should be built in, which ensures that, for example, the `href` can only be called on those elements that are allowed to contain it according to the current HTML5 specification. Currently, no distinction is made here for the sake of simplicity, as well as to accommodate custom elements.


## License

This software is dual-licensed under the [0BSD](https://opensource.org/license/0bsd) and the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0), with the choice of license left to the user.
