
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { basename } from "node:path";

import {
	Element,
	br,
	div,
	li,
	p,
	ul
} from "#factories";


describe(basename(import.meta.filename), () => {
	describe("child content rules", () => {
		it("skips null, undefined and booleans", () => {
			assert.equal(div(null, undefined, true, false, "x").expand(), "<div>x</div>");
		});

		it("handles inline conditions", () => {
			assert.equal(ul(true && li("A"), false && li("B")).expand(), "<ul><li>A</li></ul>");
		});

		it("converts numbers, bigint and symbols with String()", () => {
			assert.equal(p(1, 2.5, 10n).expand(), "<p>12.510</p>");
			assert.equal(p(Symbol("s")).expand(), "<p>Symbol(s)</p>");
		});

		it("keeps zero", () => {
			assert.equal(p(0).expand(), "<p>0</p>");
		});

		it("uses toString of class instances and escapes it", () => {
			class Money { toString() { return "5 <EUR>"; } }
			assert.equal(p(new Money()).expand(), "<p>5 &lt;EUR&gt;</p>");
		});

		it("writes a plain object in later position as [object Object]", () => {
			assert.equal(p("a", { x: 1 }).expand(), "<p>a[object Object]</p>");
		});

		it("treats a plain object in first position as attributes", () => {
			assert.equal(p({ foo: 1 }, "a").expand(), '<p foo="1">a</p>');
		});

		it("does not treat a class instance in first position as attributes", () => {
			class Box { toString() { return "box"; } }
			assert.equal(p(new Box()).expand(), "<p>box</p>");
		});
	});


	describe("arrays and iterables", () => {
		it("flattens arrays at any depth", () => {
			assert.equal(ul([li("a"), [li("b"), [li("c")]]]).expand(), "<ul><li>a</li><li>b</li><li>c</li></ul>");
		});

		it("expands Set and Map", () => {
			assert.equal(p(new Set(["a", "b", "a"])).expand(), "<p>ab</p>");
			assert.equal(p(new Map([["k", "v"]])).expand(), "<p>kv</p>");
			assert.equal(p(new Map([["k", "v"]]).values()).expand(), "<p>v</p>");
		});

		it("expands generators and iterator helpers", () => {
			function* rows() { yield li("a"); yield li("b"); }
			assert.equal(ul(rows()).expand(), "<ul><li>a</li><li>b</li></ul>");
			assert.equal(ul([1, 2, 3].values().filter(n => n > 1).map(n => li(n))).expand(), "<ul><li>2</li><li>3</li></ul>");
		});

		it("does not split strings", () => {
			assert.equal(p("abc").expand(), "<p>abc</p>");
		});

		it("skips null and booleans inside arrays", () => {
			assert.equal(p(["a", null, false, "b"]).expand(), "<p>ab</p>");
		});

		it("keeps children flat", () => {
			const el = ul([li("a"), [li("b")]]);
			assert.equal(el.children?.length, 2);
			assert.ok(el.firstChild instanceof Element);
		});

		it("flattens in append and insertAt", () => {
			const el = ul(li("a"));
			el.append([li("c")], new Set([li("d")]));
			el.insertAt(1, [li("b")]);
			assert.equal(el.expand(), "<ul><li>a</li><li>b</li><li>c</li><li>d</li></ul>");
		});
	});


	describe("functions as children", () => {
		it("expands a thunk completely", () => {
			assert.equal(div(() => p("x")).expand(), "<div><p>x</p></div>");
		});

		it("calls factories passed without a call", () => {
			assert.equal(div(p).expand(), "<div><p></p></div>");
			assert.equal(p("a", br, "b").expand(), "<p>a<br>b</p>");
		});

		it("resolves nested functions", () => {
			assert.equal(div(() => () => li("x")).expand(), "<div><li>x</li></div>");
		});

		it("processes returned primitives", () => {
			assert.equal(p(() => "Hi", () => 1, () => null, () => false).expand(), "<p>Hi1</p>");
		});

		it("processes returned arrays and generators", () => {
			assert.equal(ul(() => [li("a"), li("b")]).expand(), "<ul><li>a</li><li>b</li></ul>");
			assert.equal(ul(() => (function* () { yield li("a"); })()).expand(), "<ul><li>a</li></ul>");
		});

		it("is lazy until expand", () => {
			let calls = 0;
			const el = div(() => { calls++; return p("x"); });
			assert.equal(calls, 0);
			el.expand();
			assert.equal(calls, 1);
		});
	});
});
