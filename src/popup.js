$(function() {
	$("#btnOpenTab").click(function() {
		chrome.runtime.getBackgroundPage(function(bgWindow) {
			var gameName = $("#txtGameName").val();
	        bgWindow.addTab(gameName);
	    });
	});
});