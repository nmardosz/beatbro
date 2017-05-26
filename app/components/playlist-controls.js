import Ember from 'ember';
var $ = Ember.$;


export default Ember.Component.extend({
		didInsertElement: function() {
			//authcode playlist
			var userToken = document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			var usersName = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			if (userToken && usersName) {
				$('.playlistnav').css('display', 'block');
			} else {
				$('.playlistnav').css('display', 'none');
			}
			if($('.rightbar').hasClass('rightbarhidden')) {
				$('.rightbar').css("width", '0px');
				//$('.centercontent').css("width", 'calc(100% - 224px)');
			}
			$( ".playlistbutton" ).click(function() {
				var oneclick = 0;
				if($('.rightbar').hasClass('rightbarhidden') && oneclick == 0) {
					oneclick = 1;
					var centerwidth = $('.centercontent').width();
					$('.rightbar').removeClass('rightbarhidden');
					$('.rightbar').addClass('rightbarvisible');
					$('.rightbar').animate({ 'width': '250px' }, 300);
					//$('.centercontent').css("width", 'calc(100% - 474px)');
					$('.centercontent').animate({"width": centerwidth - 250}, {duration: 300, step: function(amount) {
						//alert(amount);
						$('.centercontent').css("width", centerwidth - amount);
						if($('.centercontent').width() < 774) {
							$('.tracklistheaderplays').addClass('trackelementhidden');
							$('.trackplays').addClass('trackelementhidden');
						}
						if($('.centercontent').width() >= 774) {
							$('.tracklistheaderplays').removeClass('trackelementhidden');
							$('.trackplays').removeClass('trackelementhidden');
						}
					}, complete: function() {
						if($('.centercontent').width() < 774) {
							$('.tracklistheaderplays').addClass('trackelementhidden');
							$('.trackplays').addClass('trackelementhidden');
							$('.tracklistheadertitle').css("width", "60%");
							$('.tracktitle').css("width", "60%");
						}
						if($('.centercontent').width() >= 774) {
							$('.tracklistheaderplays').removeClass('trackelementhidden');
							$('.trackplays').removeClass('trackelementhidden');
							$('.tracklistheadertitle').css("width", "50%");
							$('.tracktitle').css("width", "50%");
						}
					}});
				}
				if($('.rightbar').hasClass('rightbarvisible') && oneclick == 0) {
					oneclick = 1;
					var centerwidth = $('.centercontent').width();
					$('.rightbar').animate({ 'width': '0px' }, {duration: 300, step: function(amount) { 
						if($('.centercontent').width() <= 774) {
							$('.tracklistheaderplays').addClass('trackelementhidden');
							$('.trackplays').addClass('trackelementhidden');
							$('.tracklistheadertitle').css("width", "60%");
							$('.tracktitle').css("width", "60%");
						}
						if($('.centercontent').width() > 774) {
							$('.tracklistheaderplays').removeClass('trackelementhidden');
							$('.trackplays').removeClass('trackelementhidden');
							$('.tracklistheadertitle').css("width", "50%");
							$('.tracktitle').css("width", "50%");
						}
					}, complete: function() {
						$('.rightbar').addClass('rightbarhidden');
						$('.rightbar').removeClass('rightbarvisible');
						if($('.centercontent').width() <= 774) {
							$('.tracklistheaderplays').addClass('trackelementhidden');
							$('.trackplays').addClass('trackelementhidden');
							$('.tracklistheadertitle').css("width", "60%");
							$('.tracktitle').css("width", "60%");
						}
						if($('.centercontent').width() > 774) {
							$('.tracklistheaderplays').removeClass('trackelementhidden');
							$('.trackplays').removeClass('trackelementhidden');
							$('.tracklistheadertitle').css("width", "50%");
							$('.tracktitle').css("width", "50%");
						}
					}});
					var centerwidth = $('.centercontent').width();
					$('.centercontent').animate({"width": centerwidth + 250}, 300);
				}
			});
			$(window).on("resize",function(){
				if($('.rightbar').hasClass('rightbarhidden')) {
					var bodywidth = $('.ember-application').width() - 224+"px";
					var playlistheight = $('.ember-application').height() - 171+"px";
					$('.centercontent').css("width", bodywidth);
					$('.playlistarea').css("height", playlistheight);
				}
				if($('.rightbar').hasClass('rightbarvisible')) {
					var bodywidth = $('.ember-application').width() - 474+"px";
					var playlistheight = $('.ember-application').height() - 171+"px";
					$('.centercontent').css("width", bodywidth);
					$('.playlistarea').css("height", playlistheight);
				}
			});
			
			$('.playlistcurrentbutton').click(function() {
				if($('.playlistcurrent').hasClass('playlisthidden')) {
					$('.playlistcurrent').removeClass('playlisthidden');
					$('.myplaylists').addClass('playlisthidden');
					$('.playlistbuilder').addClass('playlisthidden');
					$('.playlistcurrent').animate({ 'width': '250px' }, 200, function() { 
						$('.myplaylists').css('width', '500px');
						$('.playlistbuilder').css('width', '500px');
					});
				}
			});
			
			$('.myplaylistsbutton').click(function() {
				if($('.myplaylists').hasClass('playlisthidden')) {
					$('.myplaylists').removeClass('playlisthidden');
					$('.playlistcurrent').addClass('playlisthidden');
					$('.playlistbuilder').addClass('playlisthidden');
					$('.myplaylists').animate({ 'width': '250px' }, 200, function() { 
						$('.playlistcurrent').css('width', '500px');
						$('.playlistbuilder').css('width', '500px');
					});
				}
			});
			
			$('.playlistbuilderbutton').click(function() {
				if($('.playlistbuilder').hasClass('playlisthidden')) {
					$('.playlistbuilder').removeClass('playlisthidden');
					$('.myplaylists').addClass('playlisthidden');
					$('.playlistcurrent').addClass('playlisthidden');
					$('.playlistbuilder').animate({ 'width': '250px' }, 200, function() { 
						$('.myplaylists').css('width', '500px');
						$('.playlistcurrent').css('width', '500px');
					});
				}
			});
			
		}
});