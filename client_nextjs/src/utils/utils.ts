export function isAdminPage() {
	const currentUrl = window.location.href;
	console.log(currentUrl);
	// return currentUrl.startsWith(`${window.location.origin}/dashboard`);
	return currentUrl.includes("/dashboard");
}
