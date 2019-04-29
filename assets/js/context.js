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
//var modalInfo = document.getElementById('infoModal');
//var modalChange = document.getElementById('changeModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal Info
function showModalInfo_Category() {
	var modalInfo = document.getElementById('infoModal');
	var list = item.currentTarget.children;
	if (document.getElementById("Name") != undefined) {
		document.getElementById("Name").innerHTML = 'Họ tên: ' + list[1].innerHTML + ' ' + list[2].innerHTML;
	}
	if (document.getElementById("Category") != undefined){
		document.getElementById("Category").innerHTML = 'Chuyên mục:' + list[3].innerHTML;
	}
	modalInfo.style.display = "block";
}

function showModalInfo_Subcriber() {
	var modalInfo = document.getElementById('infoModal');
	var list = item.currentTarget.children;
	if (document.getElementById("Name") != undefined) {
		document.getElementById("Name").innerHTML = 'Họ tên: ' + list[1].innerHTML + ' ' + list[2].innerHTML;
	}
	if (document.getElementById("Category") != undefined){
		document.getElementById("Category").innerHTML = 'Chuyên mục:' + list[3].innerHTML;
	}
	modalInfo.style.display = "block";
}

function showModalInfo_Reporter() {
	var modalInfo = document.getElementById('infoModal');
	var list = item.currentTarget.children;
	if (document.getElementById("Name") != undefined) {
		document.getElementById("Name").innerHTML = 'Họ tên: ' + list[1].innerHTML + ' ' + list[2].innerHTML;
	}
	if (document.getElementById("Category") != undefined){
		document.getElementById("Category").innerHTML = 'Chuyên mục:' + list[3].innerHTML;
	}
	if (document.getElementById("Birthday") != undefined){
		document.getElementById("Birthday").innerHTML = 'Ngày sinh:' + list[4].innerHTML;
	}
	modalInfo.style.display = "block";
}

function showModalInfo_Editor() {
	var modalInfo = document.getElementById('infoModal');
	var list = item.currentTarget.children;
	if (document.getElementById("Name") != undefined) {
		document.getElementById("Name").innerHTML = 'Họ tên: ' + list[1].innerHTML + ' ' + list[2].innerHTML;
	}
	if (document.getElementById("Category") != undefined) {
		document.getElementById("Category").innerHTML = 'Chuyên mục:' + list[3].innerHTML;
	}
	if (document.getElementById("Birthday") != undefined) {
		document.getElementById("Birthday").innerHTML = 'Ngày sinh:' + list[4].innerHTML;
	}
	modalInfo.style.display = "block";
}

function showModalInfo_Posted() {
	/*var modalInfo = document.getElementById('infoModal');
	var list = item.currentTarget.children;
	if (document.getElementById("Name") != undefined) {
		document.getElementById("Name").innerHTML = 'Họ tên: ' + list[1].innerHTML + ' ' + list[2].innerHTML;
	}
	if (document.getElementById("Category") != undefined){
		document.getElementById("Category").innerHTML = 'Chuyên mục:' + list[3].innerHTML;
	}
	modalInfo.style.display = "block";*/
}

function showModalInfo_Draft() {
	/*var modalInfo = document.getElementById('infoModal');
	var list = item.currentTarget.children;
	if (document.getElementById("Name") != undefined) {
		document.getElementById("Name").innerHTML = 'Họ tên: ' + list[1].innerHTML + ' ' + list[2].innerHTML;
	}
	if (document.getElementById("Category") != undefined){
		document.getElementById("Category").innerHTML = 'Chuyên mục:' + list[3].innerHTML;
	}
	modalInfo.style.display = "block";*/
}

// When the user clicks on the button, open the modal Change
function showModalChange_Subcriber(){
	var modalChange = document.getElementById('changeModal');
	var list = item.currentTarget.children;
	//document.getElementById('categoryChange').innerHTML = list[3].innerHTML;
	modalChange.style.display = "block";
}

function showModalChange_Reporter(){
	var modalChange = document.getElementById('changeModal');
	var list = item.currentTarget.children;
	//document.getElementById('categoryChange').innerHTML = list[3].innerHTML;
	modalChange.style.display = "block";
}

function showModalChange_Editor(){
	var modalChange = document.getElementById('changeModal');
	var list = item.currentTarget.children;
	document.getElementById('firstNameChange').innerHTML = list[1].innerHTML;
	document.getElementById('lastNameChange').innerHTML = list[2].innerHTML;
	document.getElementById('categoryChange').innerHTML = list[3].innerHTML;
	document.getElementById('birthdayChange').innerHTML = list[4].innerHTML;
	modalChange.style.display = "block";
}

function showModalChange_Draft(){
	var modalChange = document.getElementById('changeModal');
	var list = item.currentTarget.children;
	document.getElementById('categoryChange').innerHTML = list[3].innerHTML;
	modalChange.style.display = "block";
}

function showModalChange_Posted(){
	var modalChange = document.getElementById('changeModal');
	var list = item.currentTarget.children;
	document.getElementById('categoryChange').innerHTML = list[3].innerHTML;
	modalChange.style.display = "block";
}

function showModalChange_Category(){
	var modalChange = document.getElementById('changeModal');
	var list = item.currentTarget.children;
	//document.getElementById('categoryChange').innerHTML = list[3].innerHTML;
	modalChange.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
function closeModal() {
	var modalInfo = document.getElementById('infoModal');
	var modalChange = document.getElementById('changeModal');
	modalInfo.style.display = "none";
	modalChange.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	var modalInfo = document.getElementById('infoModal');
	var modalChange = document.getElementById('changeModal');
	if (event.target == modalChange || event.target == modalInfo) {
		closeModal();
	}
}