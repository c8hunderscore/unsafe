document.addEventListener("DOMContentLoaded", () => {
	const theme = localStorage.getItem("theme") || "light";
	const title = localStorage.getItem("title") || "unsafe";
	const icon = localStorage.getItem("icon") || "/favicon.ico";

	document.forms.settings.theme.value = theme;
	document.forms.settings.title.value = title;
	document.forms.settings.icon.value = icon;
});
