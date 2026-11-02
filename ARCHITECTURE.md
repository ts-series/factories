# Architecture

## Goals

Factories.ts is a runtime-agnostic library: it has no dependencies on Node.js or any other runtime, and its code behaves like a pure function: It performs no I/O, causes no unintended cross-mutations and throws no errors of its own, so HTML generation remains deterministic and predictable. All input is processed by fixed rules, which are listed in the Reference.



## Principles

**No side effects.** Building and expanding an element tree reads the input and produces a string. Neither the arguments nor any other object outside the tree are modified.

**No errors of its own.** Every value has a defined result: it is skipped, written as text, or converted with `String()`. Invalid input is not rejected but handled by the rules.

**Deterministic.** The same input gives the same output. Attributes are written in insertion order, and children in the order they were passed.



## Implementation details

### Ownership of arrays

The `Element` constructor takes ownership of the content array and uses it as `children` when it contains nothing to flatten. The factories pass a fresh rest array each time, so nothing is shared. Constructors are meant for building custom factories, not for direct use.


### Copies in constructors

Where a caller can keep a reference to what it passes in, the constructor copies it. `HTMLScriptElement` copies its content array, so `script({}, lines).call(...)` never changes `lines`. Without the copy, the element and the caller would share one array, and a later change on either side would show up on the other.


### Attributes are copied

The attributes constructor copies the passed object with `Object.assign`. Presets such as `button.submit` and `a.blank` build a new object with a spread. The object a user passes in is never modified, and later changes to it do not reach the element.


### Stable identities

`children` and the attributes object keep their identity for the lifetime of an element. `append`, `insertAt` and `modifyChildren` change the existing array in place, and `attributes` is a read-only property. A reference taken earlier is never silently outdated.


### No spread in calls

Entries are moved with loops, `concat` and array literals, never with `push(...list)` or `splice(i, 0, ...list)`. Spreading into a call turns every entry into an argument, which fails with a `RangeError` for very large lists (roughly 150,000 entries in Node). Loops have no such limit.


### Iterables

Arrays and other iterables are flattened when an element is created, and an iterator is consumed once at that point. The results of functions are resolved when the element is expanded.


### Allocation

Expansion collects strings in one array and joins it once. Attributes are written with a single string and no intermediate pair arrays, and `escape` makes one pass over the text. Results are not cached, to avoid hidden state and invalidation rules.


### Text, not markup

Strings are always text and are escaped on output. Markup comes only from elements. Attribute values are always escaped, and only the text escaping can be switched off in `expand`.



## Known impurities

Two things are outside the pure model. First, `define` registers names in global registries, which affects all later output. Second, code supplied by the caller runs during expansion, such as functions as children or a custom `toString()`. Errors thrown there are not caught.