import Ember from 'ember';
var $ = Ember.$;

export default Ember.Component.extend({
	didInsertElement: function() {
			$('.signupusername').blur(function() {
				if($('.signupusername').val() == "") {
					$("label[for=username]").text("Please choose a username.");
					$("label[for=username]").css('display', 'block');
					$('.signupusername').css('border', 'solid 1px #ff0000');
				}
				if($('.signupusername').val().length < 4 && $('.signupusername').val().length > 0) {
					$("label[for=username]").text("Your username is too short.");
					$("label[for=username]").css('display', 'block');
					$('.signupusername').css('border', 'solid 1px #ff0000');
				}
				if($('.signupusername').val().length >= 4) {
					$("label[for=username]").css('display', 'none');
					$('.signupusername').css('border', '0');
				}
			});
			$('.signuppassword').blur(function() {
				if($('.signuppassword').val().length < 4) {
					$("label[for=password]").text("Your password is too short.");
					$("label[for=password]").css('display', 'block');
					$('.signuppassword').css('border', 'solid 1px #ff0000');
				}
				if($('.signuppassword').val().length >= 4) {
					$("label[for=password]").css('display', 'none');
					$('.signuppassword').css('border', '0');
				}
			});
			$('.signupemail').blur(function() {
				var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
				if(!pattern.test($('.signupemail').val())) {
					$("label[for=email]").text("The email address you supplied is invalid.");
					$("label[for=email]").css('display', 'block');
					$('.signupemail').css('border', 'solid 1px #ff0000');
				}
				if(pattern.test($('.signupemail').val())) {
					$("label[for=email]").css('display', 'none');
					$('.signupemail').css('border', '0');
				}
			});
			$('.signupconfemail').blur(function() {
				var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
				if(!pattern.test($('.signupconfemail').val())) {
					$("label[for=confemail]").text("The email address you supplied is invalid.");
					$("label[for=confemail]").css('display', 'block');
					$('.signupconfemail').css('border', 'solid 1px #ff0000');
				}
				if($('.signupconfemail').val() != $('.signupemail').val() && pattern.test($('.signupconfemail').val())) {
					$("label[for=confemail]").text("Email address doesn't match.");
					$("label[for=confemail]").css('display', 'block');
					$('.signupconfemail').css('border', 'solid 1px #ff0000');
				}
				if($('.signupconfemail').val() == "") {
					$("label[for=confemail]").text("The email address you supplied is invalid.");
					$("label[for=confemail]").css('display', 'block');
					$('.signupconfemail').css('border', 'solid 1px #ff0000');
				}
				if($('.signupconfemail').val() == $('.signupemail').val() && $('.signupconfemail').val() != "") {
					$("label[for=confemail]").css('display', 'none');
					$('.signupconfemail').css('border', '0');
				}
			});
			$('.signupdobday').blur(function() {
				if($('.signupdobday').val() > 31) {
					$("label[for=signupdob]").text("Please enter a valid day of the month.");
					$("label[for=signupdob]").css('display', 'block');
					$('.signupdobday').css('border', 'solid 1px #ff0000');
				}
				if($('.signupdobday').val() < 1) {
					$("label[for=signupdob]").text("Please enter a valid day of the month.");
					$("label[for=signupdob]").css('display', 'block');
					$('.signupdobday').css('border', 'solid 1px #ff0000');
				}
				if($('.signupdobday').val() == "") {
					$("label[for=signupdob]").text("When were you born?");
					$("label[for=signupdob]").css('display', 'block');
					$('.signupdobday').css('border', 'solid 1px #ff0000');
				}
				if($('.signupdobday').val() >= 1 && $('.signupdobday').val() <= 31) {
					$("label[for=signupdob]").css('display', 'none');
					$('.signupdobday').css('border', '0');
				}
			});
			$('.signupdobyear').blur(function() {
				if($('.signupdobyear').val() >= 2004) {
					$("label[for=signupdob]").text("Sorry, but you don't meet beatbro's age requirements.");
					$("label[for=signupdob]").css('display', 'block');
					$('.signupdobyear').css('border', 'solid 1px #ff0000');
				}
				if($('.signupdobyear').val() < 1900) {
					$("label[for=signupdob]").text("Sorry, but you don't meet beatbro's age requirements.");
					$("label[for=signupdob]").css('display', 'block');
					$('.signupdobyear').css('border', 'solid 1px #ff0000');
				}
				if($('.signupdobyear').val() == "") {
					$("label[for=signupdob]").text("When were you born?");
					$("label[for=signupdob]").css('display', 'block');
					$('.signupdobyear').css('border', 'solid 1px #ff0000');
				}
				if($('.signupdobyear').val() >= 1900 && $('.signupdobyear').val() <= 2003) {
					$("label[for=signupdob]").css('display', 'none');
					$('.signupdobyear').css('border', '0');
				}
			});
			$('.sendsignup').click(function() {
				var usernamevalid = false;
				var passwordvalid = false;
				var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
				var emailvalid = false;
				var confemailvalid = false;
				var dobmonthvalid = false;
				var dobdayvalid = false;
				var dobyearvalid = false;
				var gendervalid = false;
				var usernameval;
				var passwordval;
				var confemailval;
				var dobmonthval;
				var dobdayval;
				var dobyearval;
				var genderval;
				var marketingval;
				if($('.signupusername').val() == "") {
					$("label[for=username]").text("Please choose a username.");
					$("label[for=username]").css('display', 'block');
					$('.signupusername').css('border', 'solid 1px #ff0000');
				}
				if($('.signupusername').val().length < 4 && $('.signupusername').val().length > 0) {
					$("label[for=username]").text("Your username is too short.");
					$("label[for=username]").css('display', 'block');
					$('.signupusername').css('border', 'solid 1px #ff0000');
				}
				if($('.signupusername').val().length >= 4) {
					$("label[for=username]").css('display', 'none');
					$('.signupusername').css('border', '0');
					usernamevalid = true;
				}
				if($('.signuppassword').val().length < 4) {
					$("label[for=password]").text("Your password is too short.");
					$("label[for=password]").css('display', 'block');
					$('.signuppassword').css('border', 'solid 1px #ff0000');
					passwordvalid = false;
				}
				if($('.signuppassword').val().length >= 4) {
					$("label[for=password]").css('display', 'none');
					$('.signuppassword').css('border', '0');
					passwordvalid = true;
				}
				if(!pattern.test($('.signupemail').val())) {
					$("label[for=email]").text("The email address you supplied is invalid.");
					$("label[for=email]").css('display', 'block');
					$('.signupemail').css('border', 'solid 1px #ff0000');
					emailvalid = false;
				}
				if(pattern.test($('.signupemail').val())) {
					$("label[for=email]").css('display', 'none');
					$('.signupemail').css('border', '0');
					emailvalid = true;
				}
				if(!pattern.test($('.signupconfemail').val())) {
					$("label[for=confemail]").text("The email address you supplied is invalid.");
					$("label[for=confemail]").css('display', 'block');
					$('.signupconfemail').css('border', 'solid 1px #ff0000');
					confemailvalid = false;
				}
				if($('.signupconfemail').val() != $('.signupemail').val() && pattern.test($('.signupconfemail').val())) {
					$("label[for=confemail]").text("Email address doesn't match.");
					$("label[for=confemail]").css('display', 'block');
					$('.signupconfemail').css('border', 'solid 1px #ff0000');
					confemailvalid = false;
				}
				if($('.signupconfemail').val() == "") {
					$("label[for=confemail]").text("The email address you supplied is invalid.");
					$("label[for=confemail]").css('display', 'block');
					$('.signupconfemail').css('border', 'solid 1px #ff0000');
					confemailvalid = false;
				}
				if($('.signupconfemail').val() == $('.signupemail').val() && $('.signupconfemail').val() != "") {
					$("label[for=confemail]").css('display', 'none');
					$('.signupconfemail').css('border', '0');
					confemailvalid = true;
				}
				if($('.signupdobday').val() > 31) {
					$("label[for=signupdob]").text("Please enter a valid day of the month.");
					$("label[for=signupdob]").css('display', 'block');
					$('.signupdobday').css('border', 'solid 1px #ff0000');
					dobdayvalid = false;
				}
				if($('.signupdobday').val() < 1) {
					$("label[for=signupdob]").text("Please enter a valid day of the month.");
					$("label[for=signupdob]").css('display', 'block');
					$('.signupdobday').css('border', 'solid 1px #ff0000');
					dobdayvalid = false;
				}
				if($('.signupdobday').val() == "") {
					$("label[for=signupdob]").text("When were you born?");
					$("label[for=signupdob]").css('display', 'block');
					$('.signupdobday').css('border', 'solid 1px #ff0000');
					dobdayvalid = false;
				}
				if($('.signupdobday').val() >= 1 && $('.signupdobday').val() <= 31) {
					$("label[for=signupdob]").css('display', 'none');
					$('.signupdobday').css('border', '0');
					dobdayvalid = true;
				}
				if($('.signupdobyear').val() >= 2004) {
					$("label[for=signupdob]").text("Sorry, but you don't meet beatbro's age requirements.");
					$("label[for=signupdob]").css('display', 'block');
					$('.signupdobyear').css('border', 'solid 1px #ff0000');
					dobyearvalid = false;
				}
				if($('.signupdobyear').val() < 1900) {
					$("label[for=signupdob]").text("Sorry, but you don't meet beatbro's age requirements.");
					$("label[for=signupdob]").css('display', 'block');
					$('.signupdobyear').css('border', 'solid 1px #ff0000');
					dobyearvalid = false;
				}
				if($('.signupdobyear').val() == "") {
					$("label[for=signupdob]").text("When were you born?");
					$("label[for=signupdob]").css('display', 'block');
					$('.signupdobyear').css('border', 'solid 1px #ff0000');
					dobyearvalid = false;
				}
				if($('.signupdobyear').val() >= 1900 && $('.signupdobyear').val() <= 2003) {
					$("label[for=signupdob]").css('display', 'none');
					$('.signupdobyear').css('border', '0');
					dobyearvalid = true;
				}
				if($('.signupdobmonth option:selected').val() == "month") {
					$("label[for=signupdob]").text("When were you born?");
					$("label[for=signupdob]").css('display', 'block');
					$('.signupdobmonth').css('border', 'solid 1px #ff0000');
					dobmonthvalid = false;
				}
				if($('.signupdobmonth option:selected').val() != "month") {
					$('.signupdobmonth').css('border', 'none');
					dobmonthvalid = true;
				}
				if(!$('.gendermale').is(':checked') && !$('.genderfemale').is(':checked')) {
					$("label[for=gender]").text("Please indicate your gender.");
					$("label[for=gender]").css('display', 'block');
					gendervalid = false;
				}
				if($('.gendermale').is(':checked') || $('.genderfemale').is(':checked')) {
					$("label[for=gender]").css('display', 'none');
					gendervalid = true;
				}
				if (usernamevalid == true && passwordvalid == true && emailvalid == true && confemailvalid == true && dobmonthvalid == true && dobdayvalid == true && dobyearvalid == true && gendervalid == true) {
					$('.signupform').css('display', 'none');
					$('.pageloaderhidden').css('display', 'block');
					usernameval = $('.signupusername').val();
					passwordval = $('.signuppassword').val();
					confemailval = $('.signupconfemail').val();
					dobmonthval = $('.signupdobmonth option:selected').val();
					dobdayval = $('.signupdobday').val();
					dobyearval = $('.signupdobyear').val();
					if($('.gendermale').is(':checked')) {
						genderval = "male";
					}
					if($('.genderfemale').is(':checked')) {
						genderval = "female";
					}
					if($('.marketingallowed').is(':checked')) {
						marketingval = 1;
					}
					if(!$('.marketingallowed').is(':checked')) {
						marketingval = 0;
					}
					
					ajaxsignup(usernameval, passwordval, confemailval, dobmonthval, dobdayval, dobyearval, genderval, marketingval);
					//$.when(ajaxsignup(usernameval, passwordval, confemailval, dobmonthval, dobdayval, dobyearval, genderval, marketingval)).done(function(){
					//	$('.pageloaderhidden').css('display', 'none');
					//});
				}
			});
	}
});

function ajaxsignup(usernameval, passwordval, confemailval, dobmonthval, dobdayval, dobyearval, genderval, marketingval) {
	var url = "http://10.0.0.1:8000/user?username=" + encodeURIComponent(usernameval) + "&password=" + encodeURIComponent(passwordval) + "&confemail=" + encodeURIComponent(confemailval) + "&dobmonth=" + dobmonthval + "&dobday=" + dobdayval + "&dobyear=" + dobyearval + "&gender=" + genderval + "&allowmarketing=" + marketingval;
	return $.ajax({
			type: 'GET',
			url: url,
			async: true,
			contentType: "application/json",
			dataType: 'json',
			success: function(json) {
				var returnresults = json.status;
				if (returnresults == "successfully saved") {
					$('.pageloaderhidden').css('display', 'none');
					$('.activateinstructions').css('display', 'block');
				}
			},
			error: function(e) {
				console.log(e.message);
			}
		});
}