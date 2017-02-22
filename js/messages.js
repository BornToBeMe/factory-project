$(function() {

	var storedMessages = [];

	storedMessages = JSON.parse(localStorage.getItem("every-message"));

	console.log(storedMessages);

	var messages = $(".every-message");

	$.each(storedMessages, function( index, value ) {
		messages.prepend("<p>" + storedMessages[index] + "</p>");
	});

	

})