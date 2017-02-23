$(function() {

	var login = [];

	if(localStorage.getItem("login-info") != null) {
		login = JSON.parse(localStorage.getItem("login-info"));
	}

	if(login == "") {

		$("#login").on("click", function(e) {
			e.preventDefault();
			var username = $("#inputName").val();
			var usermail = $("#inputEmail").val();
			if(username !== "" && usermail !== "") {
				login.push(username);
				login.push(usermail);
				$(location).attr("href", "./index.html");
			}
			console.log(login);
			localStorage.setItem("login-info", JSON.stringify(login));

		});
	} else {
		$(location).attr("href", "./index.html");
	}
	console.log(login);

})