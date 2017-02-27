$(function() {

	"use strict";

	var storedMessages = [];

	storedMessages = JSON.parse(localStorage.getItem("every-message"));

	console.log(storedMessages);

	var messages = $(".every-message");

	$.each(storedMessages, function( index, value ) {
		messages.prepend('<li data-id="'+index+'">' + storedMessages[index] + '<button type="button" class="btn btn-info btn-lg buttonModal" data-toggle="modal" data-target="#myModal"><span class="glyphicon glyphicon-edit"></span></button></li>');
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

	$("#clear-button").on("click", function(e) {
		localStorage.removeItem("every-message");
		location.reload();
	});	

})