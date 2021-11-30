const express = require("express");
const Corrosion = require("corrosion");

const path = require("path");

const paths = {
	views: path.resolve(__dirname, "..", "views"),
	static: path.resolve(__dirname, "..", "static"),
};

const cfg = require("../config.json");
const port = cfg.port ?? process.env.PORT ?? 8080;

const app = express();

const server = app.listen(port, () => console.log("PORT", port));

const proxy = new Corrosion({
	prefix: cfg.prefix ?? "/go/",
	codec: cfg.codec ?? "xor",
	ws: true,
	cookie: true,
	title: cfg.title ?? "Google",
});

proxy.bundleScripts();

server.on("request", (req, res) => {
	if (req.path.startsWith(proxy.prefix))
		proxy.request(req, res);
});

server.on("upgrade", proxy.upgrade);

app.use(express.static(paths.static));

app.set("view engine", "pug");
app.set("views", paths.views);

app.set("strict routing", true);

const descriptions = [
	"Stay safe, friend!",
	"There is no way this is safe.",
	"Safety is for cowards.",
];

app.get("/", (_, res) => res.render("index", {
	description: descriptions[Math.floor(Math.random() * descriptions.length)],
}));

app.get("/settings", (_, res) => res.render("settings"));

// app.get("/bookmarklets", (_, res) => res.render("bookmarklets"));

app.get("/go", (_, res) => res.redirect("/"));

app.get("*", (req, res) => {
	if (req.path.startsWith(proxy.prefix)) return;
	if (!req.accepts("text/html")) return;

	res.status(404);

	res.render("not-found", {
		path: req.path,
	});
});
