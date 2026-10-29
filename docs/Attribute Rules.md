# Attribute Assignment Rules

* string → set as attribute value
* number → set as attribute value (via String conversion)
* undefined → attribute is removed
* null → attribute is set without a value (empty string)
* empty string "" → same as null, attribute set without a value
* Array → values joined with spaces, set as attribute value
* Plain object with attribute name "style" → each property set individually as a CSS property, no attribute string
* Boolean HTML attributes (e.g. disabled, checked, hidden, readonly, required, selected, ...): special handling
  * true → attribute set without a value (flag present)
  * false → attribute removed
  * null/"" on boolean attributes are treated like all other cases (attribute set without a value), not interpreted as "true"
* Non-boolean attributes with any other value (e.g. number, object without style special case) → converted to attribute value via String()