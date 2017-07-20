$(function() {
	$("#btnOpenTab").click(function() {
		chrome.runtime.getBackgroundPage(function(bgWindow) {
			var gameName = $("#txtGameName").val();
			var isFullscreen = $("#ckbxIsFullscreen").is(':checked');

	        bgWindow.addTab(gameName, isFullscreen);
	    });
	});
});