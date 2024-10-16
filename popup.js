document.addEventListener("DOMContentLoaded", () => {
	chrome.storage.sync.get(["keywords", "autoRefresh"], (result) => {
		document.getElementById("keywords").value = result.keywords || "";
		document.getElementById("toggle-refresh").checked = result.autoRefresh || false;
	});

	document.getElementById("save").addEventListener("click", () => {
		const keywords = document.getElementById("keywords").value;
		const autoRefresh = document.getElementById("toggle-refresh").checked;
		chrome.storage.sync.set({ keywords, autoRefresh }, () => {
			alert("Keywords saved!");
		});
	});

	document.getElementById("refresh").addEventListener("click", () => {
		chrome.tabs.query({ url: "https://www.netflix.com/manageaccountaccess" }, (tabs) => {
			if (tabs.length > 0) {
				chrome.scripting.executeScript({
					target: { tabId: tabs[0].id },
					// files: ["content.js"],
					func: () => window.location.reload(),
				});
			}
		});
	});
});
