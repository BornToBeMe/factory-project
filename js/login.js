$(function() {

	var login = [];

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
	}
	console.log(login);

})