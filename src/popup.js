$(function() {
	$("#btnOpenTab").click(function() {
		chrome.runtime.getBackgroundPage(function(bgWindow) {
			var gameName = $("#txtGameName").val();
			var isFullscreen = $("#ckbxIsFullscreen").is(':checked');
			var allowMature = $("#ckbxAllowMatureContent").is(':allowMature');

	        bgWindow.addTab({
	        	gameName: gameName,
	        	isFullscreen: isFullscreen,
	        	allowMatureContent: allowMature
	        });
	    });
	});
});