var clientId = "lz5fzvz4n25eiy8p99vzs4pjwyb15t";
var timeout = 30 * 1000;

var tabsToMonitor = [];

function goToTopStreamForGame(tabId, gameName) {
	chrome.tabs.get(tabId, function(tab) {
		var requestData = {
			"game": gameName,
			"client_id": clientId,
			"limit": 1
		};

		$.ajax({
			url: "https://api.twitch.tv/kraken/streams",
			data: requestData,
			method: "GET"
		}).done(function(responseData) {
			if (responseData.streams.length == 0) {
				return;
			}

			var topStream = responseData.streams[0];
			var streamUrl = "https://www.twitch.tv/" + topStream.channel.name;

			if (tab.url == streamUrl) {
				return;
			}

			chrome.tabs.update(tabId, {"url": streamUrl});
		});
	});
}

function checkTabs() {
	for (var i = 0; i < tabsToMonitor.length; i++) {
		var tabInfo = tabsToMonitor[i];
		goToTopStreamForGame(tabInfo.tabId, tabInfo.gameName)
	}

	setTimeout(checkTabs, timeout);
}

function addTab(gameName) {
	chrome.tabs.create({ "active": true }, function(tab) {
		goToTopStreamForGame(tab.id, gameName);
		tabsToMonitor.push({"tabId": tab.id, "gameName": gameName});
	});
}

chrome.tabs.onRemoved.addListener(function(tabId) {
	for (var i = 0; i < tabsToMonitor.length; i++) {
		var tabInfo = tabsToMonitor[i];
		if (tabInfo.tabId == tabId) {
			tabsToMonitor.splice(i);
			break;
		}
	}
});

$(function() {
	checkTabs();
});