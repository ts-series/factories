
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { basename } from "node:path";

import {
	div,
	escape,
	p,
	script,
	span
} from "#factories";


describe(basename(import.meta.filename), () => {
	describe("escaping", () => {
		it("escapes text", () => {
			assert.equal(p('a < b & c > d "q"').expand(), "<p>a &lt; b &amp; c &gt; d &quot;q&quot;</p>");
		});

		it("escapes attribute values", () => {
			assert.equal(div({ title: 'Das "Beste" <b>' }).expand(), '<div title="Das &quot;Beste&quot; &lt;b&gt;"></div>');
		});

		it("does not escape script text", () => {
			assert.equal(script({}, ["if (a && b) {}"]).expand(), "<script>if (a && b) {}</script>");
		});

		it("disables text escaping but keeps attribute escaping", () => {
			assert.equal(div({ title: "<x>" }, "<b>").expand(null, 0, false), '<div title="&lt;x&gt;"><b></div>');
		});

		it("embeds an expanded fragment", () => {
			const inner = div(p("<x>")).expand();
			assert.equal(span(inner).expand(null, 0, false), "<span><div><p>&lt;x&gt;</p></div></span>");
		});

		it("escape leaves clean strings unchanged", () => {
			assert.equal(escape("abc"), "abc");
		});
	});


	describe("script element", () => {
		it("serializes call arguments safely", () => {
			assert.equal(
				script().call("f", 'a"</script>', 1, true, null, undefined, [1], { k: "v" }).expand(),
				'<script>f("a\\"\\u003c/script>", 1, true, null, undefined, [1], {"k": "v"}); </script>'
			);
		});

		it("escapes import paths and ignores empty names", () => {
			assert.equal(script().import('/a"b.js', "x", null, undefined).expand(), '<script>import { x } from "/a\\"b.js"; </script>');
			assert.equal(script().import("/a.js", null).expand(), '<script>import "/a.js"; </script>');
		});

		it("importmap does not break out of the script", () => {
			assert.equal(script.importmap({ x: "</script>" }).expand().includes("</script><"), false);
		});

		it("importOnly", () => {
			assert.equal(
				script.module().importOnly("/c.js", "render", { a: 1 }).expand(),
				'<script type="module">import { render } from "/c.js"; render({"a": 1}); </script>'
			);
		});
	});
});
