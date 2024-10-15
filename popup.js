document.addEventListener("DOMContentLoaded", () => {
	chrome.storage.sync.get(["keywords"], (result) => {
		document.getElementById("keywords").value = result.keywords || "";
	});

	document.getElementById("save").addEventListener("click", () => {
		const keywords = document.getElementById("keywords").value;
		chrome.storage.sync.set({ keywords }, () => {
			alert("Keywords saved!");
		});
	});

	document.getElementById("refresh").addEventListener("click", () => {
		chrome.tabs.query({ url: "https://www.netflix.com/manageaccountaccess" }, (tabs) => {
			if (tabs.length > 0) {
				chrome.scripting.executeScript({
					target: { tabId: tabs.id },
					files: ["content.js"],
				});
			}
		});
	});
});
