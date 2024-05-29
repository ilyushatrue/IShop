export function redirect(url: string, newTab: boolean = false) {
	if (newTab) {
		window?.open(url, "_blank")?.focus();
	} else {
		window.location.href = url;
	}
}