
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { basename } from "node:path";

import {
	br,
	li,
	p,
	script,
	ul
} from "#factories";


describe(basename(import.meta.filename), () => {
	describe("append", () => {
		it("appends parts in order and returns the element", () => {
			const el = ul(li("a"));
			assert.equal(el.append(li("b"), li("c")), el);
			assert.equal(el.expand(), "<ul><li>a</li><li>b</li><li>c</li></ul>");
		});

		it("does nothing on a void element", () => {
			assert.equal(br().append("x").expand(), "<br>");
		});

		it("does not modify the passed array", () => {
			const list = [li("a"), [li("b")]];
			ul().append(list);
			assert.equal(list.length, 2);
			assert.equal((list[1] as unknown[]).length, 1);
		});
	});


	describe("insertAt", () => {
		it("inserts at the start", () => {
			assert.equal(ul(li("b")).insertAt(0, li("a")).expand(), "<ul><li>a</li><li>b</li></ul>");
		});

		it("inserts at the end", () => {
			assert.equal(ul(li("a")).insertAt(1, li("b")).expand(), "<ul><li>a</li><li>b</li></ul>");
		});

		it("appends when the index is beyond the length", () => {
			assert.equal(ul(li("a")).insertAt(99, li("b")).expand(), "<ul><li>a</li><li>b</li></ul>");
		});

		it("counts backwards for negative indices", () => {
			assert.equal(ul(li("a"), li("c")).insertAt(-1, li("b")).expand(), "<ul><li>a</li><li>b</li><li>c</li></ul>");
		});

		it("skips null and false on expand", () => {
			assert.equal(ul(li("a")).insertAt(1, null).insertAt(1, false).expand(), "<ul><li>a</li></ul>");
		});

		it("does nothing on a void element", () => {
			assert.equal(br().insertAt(0, "x").expand(), "<br>");
		});

		it("does not modify the passed array", () => {
			const list = [li("a"), [li("b")]];
			ul().insertAt(0, list);
			assert.equal(list.length, 2);
			assert.equal((list[1] as unknown[]).length, 1);
		});
	});


	describe("modifyChildren", () => {
		it("accepts a function that mutates and returns the same array", () => {
			const el = ul(li("a"), li("b"));
			el.modifyChildren((parts) => {
				parts.reverse();
				return parts;
			});
			assert.equal(el.expand(), "<ul><li>b</li><li>a</li></ul>");
		});

		it("accepts a function that returns a new array", () => {
			const el = ul(li("a"), li("b"), li("c"));
			assert.equal(el.modifyChildren((parts) => parts.slice(1)), el);
			assert.equal(el.expand(), "<ul><li>b</li><li>c</li></ul>");
		});

		it("does not call the function on a void element", () => {
			let calls = 0;
			br().modifyChildren((parts) => {
				calls++;
				return parts;
			});
			assert.equal(calls, 0);
		});
	});


	describe("identity", () => {
		it("keeps the children array", () => {
			const el = ul(li("a"));
			const children = el.children;
			el.append(li("b"));
			el.insertAt(0, li("c"));
			el.modifyChildren((parts) => parts.slice());
			el.modifyChildren((parts) => parts);
			assert.equal(el.children, children);
			assert.equal(children?.length, 3);
		});

		it("keeps the attributes object", () => {
			const el = ul({ id: "a" });
			const attributes = el.attributes;
			el.set({ title: "t" }, "hidden");
			el.removeAttributes("id");
			el.class("x").id("b");
			assert.equal(el.attributes, attributes);
		});

		it("returns the element itself from all mutating methods", () => {
			const el = ul(li("a"));
			assert.equal(el.append("x"), el);
			assert.equal(el.insertAt(0, "x"), el);
			assert.equal(el.modifyChildren((parts) => parts), el);
			assert.equal(el.set({ id: "a" }), el);
			assert.equal(el.removeAttributes("id"), el);
		});
	});


	describe("copies", () => {
		it("does not change the content array of a script element", () => {
			const lines = ["a"];
			script({}, lines).call("f");
			assert.deepEqual(lines, ["a"]);
		});

		it("does not share the content array with a script element", () => {
			const lines = ["a"];
			const el = script({}, lines);
			lines.push("b");
			assert.equal(el.expand(), "<script>a</script>");
		});
	});


	describe("large lists", () => {
		const size = 200_000;
		const list = Array.from({ length: size }, () => "a");
		const expected = `<p>${"a".repeat(size)}</p>`;

		it("accepts them in the factory", () => {
			assert.equal(p(list).expand(), expected);
		});

		it("accepts them in append", () => {
			assert.equal(p().append(list).expand(), expected);
		});

		it("accepts them in insertAt", () => {
			assert.equal(p().insertAt(0, list).expand(), expected);
		});

		it("accepts them in modifyChildren", () => {
			assert.equal(p("x").modifyChildren(() => list).expand(), expected);
		});
	});
});
