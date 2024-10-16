function signOutDevices(keywords, autoRefresh) {
	if (!autoRefresh) {
		return;
	}
	const deviceListItems = document.querySelectorAll(".device-list-item");

	deviceListItems.forEach((item) => {
		const header = item.querySelector(".device-list-item-header h2");
		const profileName = item.querySelector(".profile-name");

		keywords.forEach((keyword) => {
			if ((header && header.textContent.toLowerCase().includes(keyword.toLowerCase())) || (profileName && profileName.textContent.toLowerCase().includes(keyword.toLowerCase()))) {
				const signOutButton = item.querySelector("button");
				if (signOutButton) {
					signOutButton.click();
				}
			}
		});
	});
}

chrome.storage.sync.get(["keywords", "autoRefresh"], (result) => {
	console.log(result);

	const keywords = result.keywords ? result.keywords.split(",") : [];
	const autoRefresh = result.autoRefresh ? result.autoRefresh : false;
	signOutDevices(keywords, autoRefresh);
});

setInterval(() => {
	window.location.reload();
}, 300000);
