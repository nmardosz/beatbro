import Ember from 'ember';
var $ = Ember.$;

export default Ember.Component.extend({
	didInsertElement: function() {
		//authcode nav
		var userToken = document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		var usersName = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		if (userToken && usersName) {
			$('.usernavlinks').css('display', 'block');
			$('.authnavlinks').css('display', 'none');
			$('.userbutton').text(usersName);
		} else {
			$('.authnavlinks').css('display', 'block');
			$('.usernavlinks').css('display', 'none');
		}

		$('.userdropdownbutton').click(function() {
			var oneclick = 0;
			var dropdownstatus = $('.user-dropdown').css('display');
			if(dropdownstatus == 'none' && oneclick == 0) {
				oneclick = 1;
				$('.user-dropdown').css('display', 'block');
			}
			if(dropdownstatus == 'block' && oneclick == 0) {
				oneclick = 1;
				$('.user-dropdown').css('display', 'none');
			}
		});

	},
	actions: {
		login: function() {
			var currentRoute = this.get('router.url');
			$('.loginfrom').val(currentRoute);
			this.sendAction('login');
		},
		signup: function() {
			this.sendAction('signup');
		},
		logout: function() {
			document.cookie = "access_token" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
			document.cookie = "username" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
			document.cookie = "hostingid" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
			document.cookie = "joinpassword" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
			this.send('logoutandtransition');
		},
		logoutandtransition: function(){
			this.sendAction('logout');
		}
	}
});
