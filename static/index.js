function go() {
	const query = document.getElementById("search").value;

	/^https?:\/\//.test(query)
		? url(query)
		: google(query);
}

function url(dest) {
	console.log("url");
	return location.assign(`/go/${xor(dest)}`);
}

function xor(str) {
	return encodeURIComponent(str
		.split("")
		.map((ch, idx) =>
			idx % 2
				? String.fromCharCode(ch.charCodeAt() ^ 2)
				: ch)
		.join(""));
}

function google(query) {
	console.log("google");
	return url(`https://www.google.com/search?q=${encodeURIComponent(query)}`);
}
