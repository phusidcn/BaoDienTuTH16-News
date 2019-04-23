window.onload = function () {
	var $contextMenu = $("#contextMenu");

	$("body").on("contextmenu", "table tr", function (e) {
		$contextMenu.css({
			display: "block",
			left: e.pageX,
			top: e.pageY
		});
		return false;
	});

	$('html').click(function () {
		$contextMenu.hide();
	});
};