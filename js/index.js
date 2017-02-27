$(function() {

	"use strict";

	var login = [];
	var storedMessages = [
		"Postcards have been consistently one of the more popular collectibles and used as promotional materials. More and more business owners are turning to color postcards as a good way of promoting their products and services.",
		"This is simply because postcards don't have to be opened. It won't get lumped in with all the mail envelopes that people usually toss without opening",
		"Postcards have been consistently one of the more popular collectibles and used as promotional materials. More and more business owners are turning to color postcards as a good way of promoting their products and services."
	];
	var coverImage = {img: "./img/cover-image.jpg", profile_img: "./img/profile-image.jpg"};

	////console.log(coverImage.img);

	if (localStorage.getItem("login-info") != null) {
		login = JSON.parse(localStorage.getItem("login-info"));
	}

	if (login != "") {

		if (localStorage.getItem("every-message") != null) {
			storedMessages = JSON.parse(localStorage.getItem("every-message"));
		}

		if (localStorage.getItem("images") != null) {
			coverImage = JSON.parse(localStorage.getItem("images"));
			$(".cover").attr("src", coverImage.img);
			$("#profile-img").attr("src", coverImage.profile_img);
		}
		//console.log(storedMessages);

		//console.log(login);

		var limit = 5;

		var username = $("#username");
		var usermail = $(".usermail");

		username.text(login[0]);
		usermail.text(login[1]);

		function cover(input) {
		    var urlCover = input.value;
		    var extCover = urlCover.substring(urlCover.lastIndexOf(".") + 1).toLowerCase();
		    if (input.files && input.files[0] && (extCover == "gif" || extCover == "png" || extCover == "jpeg" || extCover == "jpg")) {
		        var reader = new FileReader();

		        reader.onload = function (e) {
		        	coverImage.img = e.target.result;
		            $(".cover").attr("src", coverImage.img);
		            localStorage.setItem("images", JSON.stringify(coverImage));
		        }
		        reader.readAsDataURL(input.files[0]);
		    }
		};

		$("#edit1").change(function(){ 
			cover(this);
		});

		function profile(input) {
		    var urlProfile = input.value;
		    var extProfile = urlProfile.substring(urlProfile.lastIndexOf(".") + 1).toLowerCase();
		    if (input.files && input.files[0] && (extProfile == "gif" || extProfile == "png" || extProfile == "jpeg" || extProfile == "jpg")) {
		        var reader = new FileReader();

		        reader.onload = function (e) {
		        	coverImage.profile_img = e.target.result;
		            $("#profile-img").attr("src", coverImage.profile_img);
		            localStorage.setItem("images", JSON.stringify(coverImage))
		        }
		        reader.readAsDataURL(input.files[0]);
		    }
		};

		$("#edit2").change(function(){ 
			profile(this);
		});


		$("#charNum").text(500 + " characters left");
		function countChar(val) {
	        var len = val.value.length;
	        if (len >= 500) {
	          val.value = val.value.substring(0, 500);
	        } else {
	          $('#charNum').text(500 - len + " characters left");
	        }
      	};

      	$(".your-message").on("keyup", function() {
      		countChar(this);
      	})

		function checkMessages() {
			if ($(".messages li").length <= 5) {
				$(".all-messages").hide();
			} else {
				$(".all-messages").show();
			}
		};

		$("#submit-button").on("click", function(e) {
			e.preventDefault();
			var message = $(".your-message").val();
			var messages = $(".messages");
			if (message !== "") {
				messages.prepend('<li>' + message + '<button type="button" class="btn btn-info btn-lg buttonModal" data-toggle="modal" data-target="#myModal"><span class="glyphicon glyphicon-edit"></span></button></li>');
				storedMessages.push(message);
			}

			$(".messages > li:gt("+(limit-1)+")").hide();

			checkMessages();

			localStorage.setItem("every-message", JSON.stringify(storedMessages));
			$(".your-message").val("");

		})
		
		//console.log(storedMessages);

		var storageMessages = $(".messages");

		$.each(storedMessages, function( index, value ) {
			storageMessages.prepend('<li data-id="'+index+'">' + storedMessages[index] + '<button type="button" class="btn btn-info btn-lg buttonModal" data-toggle="modal" data-target="#myModal"><span class="glyphicon glyphicon-edit"></span></button></li>');
			$(".messages > li:gt("+(limit-1)+")").hide();
			checkMessages();
		});

		$( "li" )
		 .on("mouseenter", function() {
		  $(this).find(".buttonModal").show();
		})
		.on("mouseleave", function() {
		  $(".buttonModal").hide();
		});

		$(".buttonModal").on("click", function() {
			console.log($(this).parent());
			console.log($(this).parent().data("id"));
			$("#modal-input").val(storedMessages[$(this).parent().data("id")]);
			$("#save-message").attr("data-id", $(this).parent().data("id"));
		});

		$("#save-message").on("click", function() {
			storedMessages[$(this).data("id")] = $("#modal-input").val();
			console.log(storedMessages[$(this).data("id")]);
			localStorage.setItem("every-message", JSON.stringify(storedMessages));
			location.reload();
		});

		$("#delete-message").on("click", function() {
			storedMessages[$(this).data("id")] = $("#modal-input").val();
			var position = storedMessages.indexOf(storedMessages[$(this).data("id")]);
			console.log(position);
			storedMessages.splice(position, 1);
			localStorage.setItem("every-message", JSON.stringify(storedMessages));
			location.reload();
		});

		$(".logout").on("click", function(e) {
			localStorage.removeItem("login-info");
			localStorage.removeItem("images");
			$(location).attr("href", "./login.html");
		});

	} else {
		$(location).attr("href", "./login.html");
	}
});