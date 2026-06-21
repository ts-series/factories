

import * as HTML from '../src/html.ts'

import {
	a, article, aside, body, br, div, head, header, html, input, link, main, meta, nav, p, section, title
} from '../src/html.ts'


//

const t = HTML.a("", "Test")

console.log("tag:", t); // The tag content

// Safe access to symbol property
console.log("symbol:", t.symbol ? `<${t.symbol.description}>` : "No symbol");

// Example page generation
let page = html(
	{ lang: "de" },
	head(
		title("Kafka Blindtext")
	),
	body(
		p("Aber sie überwanden sich, umdrängten den Käfig und wollten sich gar nicht fortrühren.Jemand musste Josef K. verleumdet haben, denn ohne dass er etwas Böses getan hätte, wurde er eines Morgens verhaftet.")
	)
);

console.log(page.expand());