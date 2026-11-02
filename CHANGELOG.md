# Changelog

## 1.3

Version 1.3 is mainly a consolidation release: child content and attribute handling were reworked and are now precisely defined and documented, with a few ergonomic additions and some breaking changes.

### Breaking Changes

- If the first argument of a factory is a plain object, it is always treated as attributes, regardless of its keys. A plain object can no longer be passed as first content argument; class instances (such as `Date`, or objects with their own `toString()`) are still content.
- `Element.content` was renamed to `children`, `modifyContent` to `modifyChildren`.
- `Attributes.remove` and `removeMany` were replaced by `removeAttributes` on elements. The `attributes` setter and `newAttributes` were removed.
- `Attributes.escape` is now the standalone function `escape`. `Attributes.compact` is now `Attributes.omitBlanks` and also removes empty strings.
- `HTMLAttributes.define` takes a key and an options object (`name`, `boolean`) and no longer affects the detection of attribute objects.
- `hidden` and `popover` are no longer boolean attributes: use the setters, `null` for the bare attribute, or a string keyword (`"until-found"`, `"manual"`).
- `tabindex` takes a `number` instead of a `bigint`.
- Booleans (`true` and `false`) as children are skipped.
- Iterables that are not strings (`Map`, `Set`, generators, iterator helpers) are expanded entry by entry. To write such an object as text, convert it with `String()` first.
- `button.submit`, `button.reset` and the `input` subtypes always set their `type`; a `type` passed by the caller no longer overrides it. `button` and `input` themselves default to `type="button"` and `type="text"`, which can be overridden.

### Fixes

- Children passed as functions or as factories without a call (`div(() => p("x"))`, `div(p)`) were written as an opening tag only, without content and closing tag.
- Non-string children are converted with `String()` before escaping instead of throwing.
- `script.importmap` and the paths of `import` and `importOnly` are escaped, so `</script>` and quotes can no longer break the script.
- `button.submit` and `button.reset` no longer modify the object passed by the user.
- `inert` and `nomodule` are boolean attributes; `inert(false)` no longer writes `inert="false"`.

### Additions

- Arrays, iterables and functions are accepted as children. Functions are called without arguments, and their results follow the same rules as any other child. The rules are listed in the Reference (Child Content Rules).
- WAI-ARIA attributes and `role` are shared by HTML, SVG and MathML.
- Registered attribute names keep their exact spelling, so `xlinkHref` is written as `xlink:href`.
- Attribute types are derived from the symbol lists and can be extended with module augmentation.
- New element methods `hasAttribute`, `getAttribute` and `removeAttributes`, modelled on the DOM API.
- Setters for nearly all HTML attributes. Boolean setters set the attribute without an argument and remove it with `false` or `undefined`. List setters (`class`, `role`, `rel`, `part`, `headers`, `sandbox`) ignore `false`, `null`, `undefined` and empty strings, so `class("a", cond && "b")` works.
- New attributes `exportparts`, `fetchpriority`, `is`, `nonce`, `part`, `popovertarget` and `popovertargetaction`.
- New SVG elements `view`, `switch` (`switch_` as a standalone import), `foreignObject`, `metadata` and `mpath`, and the filter primitives `feDistantLight`, `feFuncA`, `feFuncB`, `feFuncG`, `feFuncR`, `fePointLight` and `feSpotLight`.
- `style()` and `toCSS` skip `null`, `undefined` and `false` values.
- `escape` and `toCSS` are exported.


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
