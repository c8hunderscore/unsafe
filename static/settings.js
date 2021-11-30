function changeSettings(event) {
	event.preventDefault();

	const theme = document.forms.settings.theme.value;

	document.documentElement.setAttribute("theme", theme);
	localStorage.setItem("theme", theme);

	const title = document.forms.settings.title.value;

	document.title = title;
	localStorage.setItem("title", title);

	const icon = document.forms.settings.icon.value;

	changeIcon(icon);
	localStorage.setItem("icon", icon);

	return false;
}

function changeIcon(url) {
	let link = document.querySelector("link[rel~=icon]");

	if (!link) {
		link = document.head.appendChild(document.createElement("link"));
		link.setAttribute("rel", "icon");
	}

	link.setAttribute("href", url);
}

document.addEventListener("DOMContentLoaded", () => {
	const theme = localStorage.getItem("theme") || "light";
	document.documentElement.setAttribute("theme", theme);

	const title = localStorage.getItem("title") || "unsafe";
	document.title = title;

	const icon = localStorage.getItem("icon") || "/favicon.ico";
	changeIcon(icon);
});
