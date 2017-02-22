$(function() {

	function getQueryVariable(variable)
	{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
	}

	getQueryVariable("yourname");

	console.log(getQueryVariable("yourname"));

	var name = getQueryVariable("yourname");
	if(typeof name !== 'undefined') {
		console.log("name" + name);
		$("#username").text(name);
	}

	getQueryVariable("yourmail");

	console.log(getQueryVariable("yourmail"));

	var mail = getQueryVariable("yourmail");
	if (typeof name !== "undefined") {
		$(".usermail").text(unescape(mail));
	}

	var storedMessages = [];

	var limit = 5;

	$("#submit-button").on("click", function(e) {
		e.preventDefault();
		var message = $(".your-message").val();
		if(message !== "") {
			var messages = $(".messages").prepend("<p>" + message + "</p>");
			storedMessages.push(message);
		}

		$('.messages > p:gt('+(limit-1)+')').hide();
		if ($('.messages > p').length > limit) {
		    $('.all-messages').show();
		}
		localStorage.setItem("every-message", JSON.stringify(storedMessages));

	})

	storedMessages = JSON.parse(localStorage.getItem("every-message"));

	console.log(storedMessages);

	$.each(storedMessages, function( index, value ) {
		var storagemessages = $(".messages").prepend("<p>" + storedMessages[index] + "</p>");
		$('.messages > p:gt('+(limit-1)+')').hide();
	});
	

}) 
