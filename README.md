# Factories.ts

**Factories.ts** is a lightweight library which provides a domain-specific language (DSL) for coding markup directly in TypeScript to generate HTML, but also SVG and MathML on the server side.

## Installation

Available on JSR for Deno, and on npm for Node.js.

```bash
deno add jsr:@ts-series/factories
```

```bash
npm install @ts-series/factories
```

Import path is identical for both runtimes:

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

In fact, all non-void elements have a rest parameter, so they can contain any number of other elements or JavaScript values. Arguments that do not represent HTML elements and are not already strings get automatically converted. Therefore, by overriding the corresponding `toString` method, the output in HTML can be precisely defined. This is particularly useful for outputting specific data, without any additional abstraction layers needed.

### Attributes

Any attribute can be specified using an object whose keys are interpreted as such, and gets passed as the first argument; or specified subsequently using the `set` method. In addition, there are same-named methods for all global and element-specific HTML attributes, for example `x.id("about")`.

If an attribute has the value `null`, it is simply translated into HTML without a value representing Boolean attributes such as `checked`.

Another special feature offers the attribute `class`, to which an array of class names is assignable instead of concatenating them first.

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

### Post-Construction Manipulation

Until string expansion, inner elements and other content are held in plain arrays, which is not only quite efficient since no complex virtual DOM is involved, but also allows for modifications after the initial construction:

```javascript
const page = div(p("Hello"));
page.append(p("World"));
page.insertAt(0, p("First"));
```

However, such post-construction manipulation is not actually required, since markup can be assembled programmatically in advance through conditionals. Nonetheless, this capability is offered for edge cases.

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

This software is published under the Unlicense.
