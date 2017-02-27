$(function() {

	"use strict";
	
	var login = [];

	if(localStorage.getItem("login-info") != null) {
		login = JSON.parse(localStorage.getItem("login-info"));
	}

	if(login == "") {

		function validateEmail(email) {
		    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		    return re.test(email);
		}


		$("#login").on("click", function(e) {
			e.preventDefault();
			var username = $("#inputName").val();
			var usermail = $("#inputEmail").val();
			if(username !== "" && validateEmail(usermail)) {
				login.push(username);
				login.push(usermail);
				$(location).attr("href", "./index.html");
			} else if(validateEmail(usermail) == false) {
				$("#inputEmail").css("border", "1px solid #FF3333");
			}
			console.log(login);
			localStorage.setItem("login-info", JSON.stringify(login));

		});
	} else {
		$(location).attr("href", "./index.html");
	}
	console.log(login);

})