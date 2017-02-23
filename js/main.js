$(function() {

	var login = [];
	var storedMessages = [];
	//var coverImage = [];
	var coverImage = {img: "../img/cover-image.jpg", profile_img: "../img/profile-image.jpg"};

	////console.log(coverImage.img);

	if(localStorage.getItem("login-info") != null) {
		login = JSON.parse(localStorage.getItem("login-info"));
	}

	if(login != "") {

		if(localStorage.getItem("every-message") != null) {
			storedMessages = JSON.parse(localStorage.getItem("every-message"));
		}

		if(localStorage.getItem("images") != null) {
			coverImage = JSON.parse(localStorage.getItem("images"));
			$(".cover").attr("src", coverImage.img);
		}
		if(localStorage.getItem("images") != null) {
			coverImage = JSON.parse(localStorage.getItem("images"));
			$(".cover").attr("src", coverImage.profile_img);
		}
		//console.log(storedMessages);

		//console.log(login);

		var limit = 5;

		var username = $("#username");
		var usermail = $(".usermail");

		username.text(login[0]);
		usermail.text(login[1]);

		// convert to jquery
		/*document.getElementById("edit1").addEventListener("change", readCover, true);
			function readCover(){
		   		var file = document.getElementById("edit1").files[0];
		   		var reader = new FileReader();
		    	reader.onloadend = function(){
		        document.getElementById("background-img").style.backgroundImage = "url(" + reader.result + ")";        
		    }
		    if(file){
		        reader.readAsDataURL(file);
		    }else{
		    }
		};*/

		function cover(input) {
		    var url = input.value;
		    var ext = url.substring(url.lastIndexOf(".") + 1).toLowerCase();
		    if (input.files && input.files[0] && (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")) {
		        var reader = new FileReader();

		        reader.onload = function (e) {
		        	coverImage.img = e.target.result;
		            $(".cover").attr("src", coverImage.img);
		            localStorage.setItem("images", JSON.stringify(coverImage));
		            coverImage = JSON.parse(localStorage.getItem("images"));
		            console.log(coverImage.img);
		        }

		        reader.readAsDataURL(input.files[0]);
		    }
		};

		$("#edit1").change(function(){ 
			cover(this);
			//coverImage.push($(".cover").attr("src"));
			//console.log(coverImage);
		});

		/* document.getElementById("edit2").addEventListener("change", readProfile, true);
			function readProfile(){
		   		var file = document.getElementById("edit2").files[0];
		   		var reader = new FileReader();
		    	reader.onloadend = function(){
		        document.getElementById("profile-img").style.backgroundImage = "url(" + reader.result + ")";        
		    }
		    if(file){
		        reader.readAsDataURL(file);
		    }else{
		    }
		}; */

		function profile(input) {
		    var url = input.value;
		    var ext = url.substring(url.lastIndexOf(".") + 1).toLowerCase();
		    if (input.files && input.files[0] && (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")) {
		        var reader = new FileReader();

		        reader.onload = function (e) {
		            $("#profile-img").attr("src", e.target.result);
		        }

		        reader.readAsDataURL(input.files[0]);
		    }
		};

		$("#edit2").change(function(){ 
			profile(this);
		});

		$("#submit-button").on("click", function(e) {
			e.preventDefault();
			var message = $(".your-message").val();
			if(message !== "") {
				var messages = $(".messages").prepend("<li>" + message + "</li>");
				storedMessages.push(message);
			}

			$(".messages > li:gt("+(limit-1)+")").hide();

			localStorage.setItem("every-message", JSON.stringify(storedMessages));
			$(".your-message").val("");

		})
		
		//console.log(storedMessages);

		$.each(storedMessages, function( index, value ) {
			var storagemessages = $(".messages").prepend("<li>" + storedMessages[index] + "</li>");
			$(".messages > li:gt("+(limit-1)+")").hide();
		});

		$(".logout").on("click", function(e) {
			localStorage.removeItem("login-info");
			$(location).attr("href", "./login.html");
		});
		
	} else {
		$(location).attr("href", "./login.html");
	}
});