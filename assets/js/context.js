window.onload = function () {
	var $contextMenu = $("#contextMenu");

	$("body").on("contextmenu", "table tr", function (e) {
		item = e;
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

//Get Item 
var item;
// Get the modal
var modalInfo = document.getElementById('infoModal');
var modalChange = document.getElementById('changeModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal Info
function showModalInfo() {
	//var list = item.currentTarget.children;
	//document.getElementById("Name").innerHTML = 'Họ tên: ' + list[1].innerHTML + ' ' + list[2].innerHTML;
	//document.getElementById("Category").innerHTML = 'Chuyên mục:' + list[3].innerHTML;
	modalInfo.style.display = "block";
}

// When the user clicks on the button, open the modal Change
function showModalChange(){
	var list = item.currentTarget.children;
	document.getElementById('categoryChange').innerHTML = list[3].innerHTML;
	modalChange.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
function closeModal() {
	modalInfo.style.display = "none";
	modalChange.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target == modalChange || event.target == modalInfo) {
		closeModal();
	}
}