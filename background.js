chrome.runtime.onInstalled.addListener(() => {
	chrome.alarms.create("refreshNetflix", { periodInMinutes: 5 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
	if (alarm.name === "refreshNetflix") {
		chrome.tabs.query({ url: "https://www.netflix.com/manageaccountaccess" }, (tabs) => {
			if (tabs.length > 0) {
				chrome.scripting.executeScript({
					target: { tabId: tabs[0].id },
					files: ["content.js"],
				});
			}
		});
	}
});
