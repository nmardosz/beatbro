import Ember from 'ember';
var $ = Ember.$;

export default Ember.Route.extend({
	iosocket: Ember.inject.service('io-sockets'),
	actions: {
		popularalbums: function() {
			var route = this;
			//$( ".slim-scroller" ).unload("static/html/popularalbums.html");
			route.transitionTo('popular-albums');
			//alert('Triggered complete!');
		},
		newreleases: function() {
			var route = this;
			//$( ".slim-scroller" ).unload("static/html/popularalbums.html");
			route.transitionTo('new-releases');
			//alert('Triggered complete!');
		},
		top50: function() {
			var route = this;
			//$( ".slim-scroller" ).unload("static/html/popularalbums.html");
			route.transitionTo('top-50');
			//alert('Triggered complete!');
		},
		populargenres: function() {
			var route = this;
			//$( ".slim-scroller" ).unload("static/html/popularalbums.html");
			route.transitionTo('popular-genres');
			//alert('Triggered complete!');
		},
		beatbroremote: function() {
			var route = this;
			//$( ".slim-scroller" ).unload("static/html/popularalbums.html");
			route.transitionTo('remote');
			//alert('Triggered complete!');
		},
		gotoalbum: function(artist, album) {
			var route = this;
			//$( ".slim-scroller" ).unload("static/html/popularalbums.html");
			//alert('Triggered complete!');
			artist = artist.replace(/\s+/g, '+');
			album = album.replace(/\s+/g, '+');
			//this.send('fetchPage', nextPage, perPage);
			route.transitionTo('album', artist, album);
		},
		logout: function() {
			var route = this;
			$('.authnavlinks').css('display', 'block');
			$('.usernavlinks').css('display', 'none');
			$('.loginbutton').text("Login");
			$('.playlistnav').css('display', 'none');
			$('.beatbro-remote-nli').css('display', 'block');
			$('.beatbro-remote').css('display', 'none');

			//route.transitionTo('popular-albums');
		},
		login: function() {
			var route = this;
			//alert(prevpage);
			route.transitionTo('login');
		},
		signup: function() {
			var route = this;
			route.transitionTo('signup');
		},
		didTransition: function() {
			var userToken = document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			var usersName = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			var ishosting = document.cookie.replace(/(?:(?:^|.*;\s*)hostingid\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			if (userToken && usersName) {
				$('.usernavlinks').css('display', 'block');
				$('.authnavlinks').css('display', 'none');
				$('.userbutton').text(usersName);
				$('.playlistnav').css('display', 'block');
				$('.beatbro-remote-nli').css('display', 'none');
				$('.beatbro-remote').css('display', 'block');
				if (ishosting) {
					$('.hostingindicator').css('display', 'block');
				} else {
					$('.hostingindicator').css('display', 'none');
				}
			} else {
				$('.authnavlinks').css('display', 'block');
				$('.usernavlinks').css('display', 'none');
				$('.playlistnav').css('display', 'none');
				$('.beatbro-remote-nli').css('display', 'block');
				$('.beatbro-remote').css('display', 'none');
				$('.hostingindicator').css('display', 'none');
			}
		}
	}
});
