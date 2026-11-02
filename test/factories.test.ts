
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { basename } from "node:path";

import {
	a,
	br,
	button,
	head,
	html,
	input,
	meta,
	title
} from "#factories";

import { circle, svg } from "#factories/svg";


describe(basename(import.meta.filename), () => {
	describe("special factories", () => {
		it("anchor", () => {
			assert.equal(a("/about", "About").expand(), '<a href="/about">About</a>');
			assert.equal(a.blank("https://x.de", "X").expand(), '<a href="https://x.de" target="_blank" rel="noopener noreferrer">X</a>');
		});

		it("button presets", () => {
			assert.equal(button("x").expand(), '<button type="button">x</button>');
			assert.equal(button({ type: "submit" }, "x").expand(), '<button type="submit">x</button>');
			assert.equal(button.submit({ type: "reset" }, "x").expand(), '<button type="submit">x</button>');
			const user = { id: "b" };
			button.submit(user, "x");
			assert.deepEqual(user, { id: "b" });
		});

		it("input presets", () => {
			assert.equal(input({}).expand(), '<input type="text">');
			assert.equal(input({ type: "email" }).expand(), '<input type="email">');
			assert.equal(input.email({ type: "text" }).expand(), '<input type="email">');
		});

		it("void elements have no closing tag", () => {
			assert.equal(br().expand(), "<br>");
		});
	});


	describe("svg", () => {
		it("uses registered spellings", () => {
			assert.equal(svg({ xlinkHref: "#a", viewBox: "0 0 1 1" }).expand(), '<svg xlink:href="#a" viewBox="0 0 1 1"></svg>');
		});

		it("setters write kebab-case names", () => {
			assert.equal(circle().strokeWidth(2).fillOpacity(0.5).expand(), '<circle stroke-width="2" fill-opacity="0.5"></circle>');
		});
	});


	describe("document", () => {
		it("prepends the doctype and inserts charset", () => {
			assert.equal(html("de", head(title("T"))).expand(), '<!DOCTYPE html><html lang="de"><head><meta charset="utf-8"><title>T</title></head></html>');
		});

		it("meta helpers", () => {
			assert.equal(meta.tags({ a: "b" })[0].expand(), '<meta name="a" content="b">');
		});
	});
});
