$(function() {

	var storedMessages = [];

	storedMessages = JSON.parse(localStorage.getItem("every-message"));

	console.log(storedMessages);

	var messages = $(".every-message");

	$.each(storedMessages, function( index, value ) {
		messages.prepend("<li>" + storedMessages[index] + "</li>");
	});

	$("#clear-button").on("click", function(e) {
		localStorage.removeItem("every-message");
		location.reload();
	});	

})