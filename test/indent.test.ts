
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { basename } from "node:path";

import {
	Element,
	div,
	p,
	span
} from "#factories";


describe(basename(import.meta.filename), () => {
	describe("indentation", () => {
		it("indents block elements and keeps phrasing content inline", () => {
			assert.equal(div(p("a"), div(span("b"))).expand(2), "<div>\n  <p>a</p>\n  <div>\n    <span>b</span>\n  </div>\n</div>");
		});

		it("uses tabs for negative values", () => {
			assert.equal(div(div("x")).expand(-1), "<div>\n\t<div>x</div>\n</div>");
		});

		it("expandAll joins siblings", () => {
			assert.equal(Element.expandAll([p("a"), p("b")]), "<p>a</p><p>b</p>");
			assert.equal(Element.expandAll([p("a"), p("b")], 0), "<p>a</p>\n<p>b</p>");
		});
	});
});
