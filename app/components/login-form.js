import Ember from 'ember';
var $ = Ember.$;

export default Ember.Component.extend({
	actions: {
		login: function() {
			var thiscontext = this;
			var usernameval = $('.loginusername').val();
			var passwordval = $('.loginpassword').val();
			var url = "http://10.0.0.1:8000/authenticate?username=" + usernameval + "&password=" + passwordval;
			$.ajax({
				type: 'GET',
				url: url,
				async: true,
				contentType: "application/json",
				dataType: 'json',
				success: function(json) {
					var returnresults = json.success;
					if (returnresults == true) {
						//sessionStorage.setItem("accessToken", json.token);
						document.cookie = 'access_token=' + json.token + '; expires=Fri, 3 Aug 2070 20:47:11 UTC; path=/'
						document.cookie = 'username=' + json.username + '; expires=Fri, 3 Aug 2070 20:47:11 UTC; path=/'
						console.log("success check session storage");
						thiscontext.send('gotopage');
					}
				},
				error: function(e) {
					console.log(e.message);
				}
			})
		},
		gotopage: function() {
			this.sendAction('gotopage');
		}
	}
	//didInsertElement: function() {
	//	$('.loginbutton').click(function() {
	//		var usernameval = $('.loginusername').val();
	//		var passwordval = $('.loginpassword').val();
	//		ajaxlogin(usernameval, passwordval);
	//	});
	//}
});

/*
function ajaxlogin(usernameval, passwordval) {
	var url = "http://10.0.0.1:8000/authenticate?username=" + usernameval + "&password=" + passwordval;
	return $.ajax({
		   type: 'GET',
			url: url,
			async: true,
			contentType: "application/json",
			dataType: 'json',
			success: function(json) {
				var returnresults = json.success;
				if (returnresults == true) {
					//sessionStorage.setItem("accessToken", json.token);
					document.cookie = 'access_token=' + json.token + '; expires=Fri, 3 Aug 2070 20:47:11 UTC; path=/'
					document.cookie = 'username=' + json.username + '; expires=Fri, 3 Aug 2070 20:47:11 UTC; path=/'
					console.log("success check session storage");
					Ember.model.reload();
				}
			},
			error: function(e) {
			   console.log(e.message);
			}
		});
} */