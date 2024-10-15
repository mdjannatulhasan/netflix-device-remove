function signOutDevices(keywords) {
	console.log(keywords);

	const deviceHeaders = document.querySelectorAll(".device-list-item-header h2");
	deviceHeaders.forEach((header) => {
		keywords.forEach((keyword) => {
			if (header.textContent.includes(keyword)) {
				const signOutButton = header.closest(".device-list-item").querySelector("button");
				if (signOutButton) {
					signOutButton.click();
				}
			}
		});
	});
}

chrome.storage.sync.get(["keywords"], (result) => {
	const keywords = result.keywords ? result.keywords.split(",") : [];
	signOutDevices(keywords);
});

setInterval(() => {
	window.location.reload();
}, 300000);
