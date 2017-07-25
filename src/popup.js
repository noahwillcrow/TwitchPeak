$(function() {
	$("#btnOpenTab").click(function() {
		chrome.runtime.getBackgroundPage(function(bgWindow) {
			var gameName = $("#txtGameName").val();
			var isFullscreen = $("#ckbxIsFullscreen").is(':checked');
			var allowMature = $("#ckbxAllowMatureContent").is(':checked');

	        bgWindow.addTab({
	        	gameName: gameName,
	        	isFullscreen: isFullscreen,
	        	allowMatureContent: allowMature
	        });
	    });
	});
});