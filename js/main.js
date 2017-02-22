$(function() {

	var login = [];

	var storedMessages = [];


	login = JSON.parse(localStorage.getItem("login-info"));

	// storedMessages = JSON.parse(localStorage.getItem("every-message"));

	console.log(login);

	var limit = 5;

	var username = $("#username");
	var usermail = $(".usermail");

	username.text(login[0]);
	usermail.text(login[1]);


	document.getElementById('edit1').addEventListener('change', readCover, true);
		function readCover(){
	   		var file = document.getElementById("edit1").files[0];
	   		var reader = new FileReader();
	    	reader.onloadend = function(){
	        document.getElementById('background-img').style.backgroundImage = "url(" + reader.result + ")";        
	    }
	    if(file){
	        reader.readAsDataURL(file);
	    }else{
	    }
	};
	document.getElementById('edit2').addEventListener('change', readProfile, true);
		function readProfile(){
	   		var file = document.getElementById("edit2").files[0];
	   		var reader = new FileReader();
	    	reader.onloadend = function(){
	        document.getElementById('profile-img').style.backgroundImage = "url(" + reader.result + ")";        
	    }
	    if(file){
	        reader.readAsDataURL(file);
	    }else{
	    }
	};

	$("#submit-button").on("click", function(e) {
		e.preventDefault();
		var message = $(".your-message").val();
		if(message !== "") {
			var messages = $(".messages").prepend("<p>" + message + "</p>");
			storedMessages.push(message);
		}

		$(".messages > p:gt("+(limit-1)+")").hide();

		localStorage.setItem("every-message", JSON.stringify(storedMessages));
		$(".your-message").val("");

	})
	
	console.log(storedMessages);

	$.each(storedMessages, function( index, value ) {
		var storagemessages = $(".messages").prepend("<p>" + storedMessages[index] + "</p>");
		$('.messages > p:gt('+(limit-1)+')').hide();
	});

	$(".logout").on("click", function(e) {
		localStorage.clear();
		$(location).attr("href", "./login.html");
	});
	

}) 
