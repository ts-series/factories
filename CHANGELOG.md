# Changelog

## 1.2 Node.js

**Deno support is being discontinued**: The packages on JSR remain available, but will no longer be updated.

### Security

- Text content and attribute values are now HTML-escaped by default. `expand()` and `expandAll()` accept a new `escaping` parameter to disable escaping of text content; attribute values are always escaped, and the content of `script` and `style` elements is never escaped.
- Added `Attributes.escape` for escaping `&`, `<`, `>` and `"`.
- Values passed to `HTMLScriptElement.call` and `importOnly` are now serialized as safe JavaScript literals, so quotes, backslashes and `</script>` no longer break the generated script.

### Elements

- Factories, `append` and `insertAt` accept nested arrays as content and flatten them automatically, so spreading arrays in application code is no longer necessary.
- Added `define` to `HTMLElement` and `HTMLAttributes` for registering custom elements and attributes at runtime; the internal `Symbol` registries were made extensible for this purpose.
- Added `itemscope` and `itemprop` methods for setting microdata attributes.
- The `style` method also accepts a plain object of CSS properties, in addition to a string.

### Attributes

- All WAI-ARIA attributes are now supported in `HTMLAttributes` and `SVGAttributes`, written in camelCase (e.g. `ariaLabel`) and rendered in kebab-case (`aria-label`).
- Added `remove` and `removeMany` to `Attributes` for explicitly deleting one or more attributes.
- Clarified attribute value semantics: `undefined` removes an attribute; `null` and empty strings set a non-boolean attribute without a value (`attr=""`); boolean HTML attributes (`disabled`, `checked`, `hidden`, …) are set without a value only when `true` or `null`, and otherwise removed when `false` or `undefined`, now handled consistently across all setters.
- All global and specific attribute setters on `HTMLElement` now accept `null` and `undefined` to clear or remove the attribute.
- `SVGAttributes` now defines its attributes through a `Symbol` registry, consistent with `HTMLAttributes`.
- Removed the automatic `data-` prefixing of unknown attribute names; attribute names are now always rendered as given, only normalized to `kebab-case`.


## 1.1

- Added full SVG and MathML support through dedicated subclasses, cleanly separated from HTML.
- Improved general type safety across the library.
- Added `script.importmap()` to the script element.


## 1.0

Initial release, HTML only.
