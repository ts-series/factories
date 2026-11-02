
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { basename } from "node:path";

import {
	HTMLAttributes,
	HTMLElement,
	p
} from "#factories";


describe(basename(import.meta.filename), () => {
	const widget = HTMLElement.NonVoid(HTMLElement.define("my-widget"));
	const icon = HTMLElement.Void(HTMLElement.define("my-icon"));
	const box = HTMLElement.NonVoid(HTMLElement.define("my-box"));

	describe("custom elements", () => {
		it("registers a symbol with the tag name", () => {
			const symbol = HTMLElement.define("my-registered");
			assert.equal(symbol.description, "my-registered");
			assert.equal(HTMLElement.Symbol["my-registered"], symbol);
		});

		it("returns the existing symbol when defined again", () => {
			assert.equal(HTMLElement.define("my-twice"), HTMLElement.define("my-twice"));
		});

		it("creates a non-void element with attributes and content", () => {
			assert.equal(widget({ name: "og:title", "content-type": "text" }, "Hello").expand(), '<my-widget name="og:title" content-type="text">Hello</my-widget>');
		});

		it("creates a void element without closing tag", () => {
			assert.equal(icon({ name: "home" }).expand(), '<my-icon name="home">');
		});

		it("escapes text content", () => {
			assert.equal(widget("<x>").expand(), "<my-widget>&lt;x&gt;</my-widget>");
		});

		it("nests with built-in elements", () => {
			assert.equal(widget(p("a"), icon).expand(), "<my-widget><p>a</p><my-icon></my-widget>");
		});

		it("indents children because it is not phrasing content", () => {
			assert.equal(box(p("a")).expand(2), "<my-box>\n  <p>a</p>\n</my-box>");
		});

		it("supports setters", () => {
			assert.equal(widget().id("w").class("a", "b").expand(), '<my-widget id="w" class="a b"></my-widget>');
		});
	});


	describe("custom attributes", () => {
		it("writes unregistered keys in kebab-case", () => {
			assert.equal(widget({ otherThing: 1, dataFooBar: 2 }).expand(), '<my-widget other-thing="1" data-foo-bar="2"></my-widget>');
		});

		it("registers a key with its kebab-case name by default", () => {
			const symbol = HTMLAttributes.define("myAttrKey");
			assert.equal(symbol.description, "my-attr-key");
			assert.equal(HTMLAttributes.Symbol["myAttrKey"], symbol);
			assert.equal(HTMLAttributes.Names.has("my-attr-key"), true);
			assert.equal(widget({ myAttrKey: 1 }).expand(), '<my-widget my-attr-key="1"></my-widget>');
		});

		it("writes the given name instead of the key", () => {
			const symbol = HTMLAttributes.define("xlLike", { name: "xl:like" });
			assert.equal(symbol.description, "xl:like");
			assert.equal(widget({ xlLike: 1 }).expand(), '<my-widget xl:like="1"></my-widget>');
		});

		it("keeps the exact spelling when the name equals the key", () => {
			HTMLAttributes.define("spellMe", { name: "spellMe" });
			assert.equal(widget({ spellMe: 1 }).expand(), '<my-widget spellMe="1"></my-widget>');
		});

		it("keeps the first definition when a key is defined again", () => {
			const first = HTMLAttributes.define("myOnce", { name: "first-name" });
			const second = HTMLAttributes.define("myOnce", { name: "second-name" });
			assert.equal(second, first);
			assert.equal(second.description, "first-name");
		});

		it("writes a registered boolean attribute without a value", () => {
			HTMLAttributes.define("myFlag", { boolean: true });
			assert.equal(widget({ myFlag: true }).expand(), "<my-widget my-flag></my-widget>");
			assert.equal(widget({ myFlag: null }).expand(), "<my-widget my-flag></my-widget>");
			assert.equal(widget({ myFlag: false }).expand(), "<my-widget></my-widget>");
			assert.equal(widget({ "my-flag": true }).expand(), "<my-widget my-flag></my-widget>");
		});

		it("combines name and boolean", () => {
			HTMLAttributes.define("flagKey", { name: "x-flag", boolean: true });
			assert.equal(widget({ flagKey: true }).expand(), "<my-widget x-flag></my-widget>");
			assert.equal(widget({ flagKey: false }).expand(), "<my-widget></my-widget>");
		});

		it("does not treat an unregistered attribute as boolean", () => {
			assert.equal(widget({ "my-plain": false }).expand(), '<my-widget my-plain="false"></my-widget>');
		});
	});
});
