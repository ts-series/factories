
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { basename } from "node:path";

import {
	div,
	toCSS
} from "#factories";


describe(basename(import.meta.filename), () => {
	describe("attribute values", () => {
		it("omits undefined", () => {
			assert.equal(div({ title: undefined }).expand(), "<div></div>");
		});

		it("writes null and empty string as empty value", () => {
			assert.equal(div({ title: null, id: "" }).expand(), '<div title="" id=""></div>');
		});

		it("handles boolean attributes", () => {
			assert.equal(div({ inert: true }).expand(), "<div inert></div>");
			assert.equal(div({ inert: false }).expand(), "<div></div>");
			assert.equal(div({ inert: null }).expand(), "<div inert></div>");
		});

		it("writes false on non-boolean attributes as a value", () => {
			assert.equal(div({ ariaHidden: false }).expand(), '<div aria-hidden="false"></div>');
			assert.equal(div({ id: false }).expand(), '<div id="false"></div>');
		});

		it("joins arrays and removes blanks", () => {
			assert.equal(div({ class: ["a", false, null, undefined, "", "b", true] }).expand(), '<div class="a b"></div>');
			assert.equal(div({ class: [false, null] }).expand(), "<div></div>");
		});

		it("converts keys to kebab-case", () => {
			assert.equal(div({ dataUserId: 42, accept_charset: "x", my_thing: 1 }).expand(), '<div data-user-id="42" accept-charset="x" my-thing="1"></div>');
		});

		it("accepts hyphenated keys as the only attribute", () => {
			assert.equal(div({ "aria-label": "x" }).expand(), '<div aria-label="x"></div>');
		});

		it("writes style objects", () => {
			assert.equal(div({ style: { color: "red", fontSize: "1rem", margin: null, padding: false } }).expand(), '<div style="color: red; font-size: 1rem;"></div>');
			assert.equal(div({ style: { __icon: "x" } }).expand(), '<div style="--icon: x;"></div>');
		});

		it("handles hidden and popover", () => {
			assert.equal(div({ hidden: null }).expand(), '<div hidden=""></div>');
			assert.equal(div().hidden().expand(), '<div hidden=""></div>');
			assert.equal(div().hidden("until-found").expand(), '<div hidden="until-found"></div>');
			assert.equal(div().hidden(false).expand(), "<div></div>");
			assert.equal(div().popover("manual").expand(), '<div popover="manual"></div>');
		});

		it("toCSS skips empty values", () => {
			assert.equal(toCSS({ a: null, b: undefined, c: false, fontSize: 1 }), "font-size: 1;");
		});
	});


	describe("setters and attribute methods", () => {
		it("chains setters", () => {
			assert.equal(div().id("a").class("x", false, "y").lang("de").expand(), '<div id="a" class="x y" lang="de"></div>');
		});

		it("handles boolean setters", () => {
			assert.equal(div().inert().expand(), "<div inert></div>");
			assert.equal(div().inert(false).expand(), "<div></div>");
			assert.equal(div().inert(undefined).expand(), "<div></div>");
		});

		it("removes with undefined", () => {
			assert.equal(div({ id: "a" }).id(undefined).expand(), "<div></div>");
		});

		it("supports hasAttribute, getAttribute and removeAttributes", () => {
			const el = div({ id: "a", title: "t" });
			assert.equal(el.hasAttribute("id"), true);
			assert.equal(el.hasAttribute("x"), false);
			assert.equal(el.getAttribute("title"), "t");
			assert.equal(el.getAttribute("x"), undefined);
			el.removeAttributes("id", "title");
			assert.equal(el.expand(), "<div></div>");
		});

		it("set accepts objects and names", () => {
			assert.equal(div().set({ id: "a" }, "hidden").expand(), '<div id="a" hidden=""></div>');
		});
	});
});
