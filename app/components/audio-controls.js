import Ember from 'ember';
var $ = Ember.$;

//var audio = new Audio('music/Intro.mp3');

export default Ember.Component.extend({
		iosocket: Ember.inject.service('io-sockets'),
		didInsertElement: function() {
		var userToken = document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		var usersName = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		var ishosting = document.cookie.replace(/(?:(?:^|.*;\s*)hostingid\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			var hasjpassword = document.cookie.replace(/(?:(?:^|.*;\s*)joinpassword\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			if(userToken && usersName && ishosting && hasjpassword) {
				if(userToken) {
					this.get('iosocket').socketinit(userToken);
					//var socket = thiscontext.get('socketIOService').socketFor('http://10.0.0.3:9000/', {query: 'token=' + connecttoken, reconnection: false});
					//connect_socket(connecttoken);
				}
			}
			$(".progressindicator").mouseenter(function() {
					$(".ui-slider-horizontal .ui-slider-handle").css('visibility', 'visible');
					$(".progresshandle").css('display', 'block');
					var elemperc = $(".musicprogress").val();
					var moveleft = (6 / $('.progressindicator').width()) * 100;
					var handleperc = elemperc - moveleft + "%";
					$('.progresshandle').css('left', handleperc);
			});

			$(".progressindicator").mouseleave(function() {
					$(".ui-slider-horizontal .ui-slider-handle").css('visibility', 'hidden');
			});


			$( ".showvideobutton" ).click(function() {
				var oneclick = 0;
				if($('.modal-fog').hasClass('fogsmall') && oneclick == 0) {
					oneclick = 1;
					$('.modal-fog').removeClass('fogsmall');
					$('.modal-fog').addClass('foglarge');
					$('.modal-frame').removeClass('framesmall');
					$('.modal-frame').addClass('framelarge');
					$('.modal-close').removeClass('hidemodalclose');
				}
				if($('.modal-fog').hasClass('foglarge') && oneclick == 0) {
					oneclick = 1;
					$('.modal-fog').removeClass('foglarge');
					$('.modal-fog').addClass('fogsmall');
					$('.modal-frame').removeClass('framelarge');
					$('.modal-frame').addClass('framesmall');
					$('.modal-close').addClass('hidemodalclose');
				}
			});



		},
		actions: {
			pause: function() {
				$('.control-img-pause').addClass('hideimg');
				$('.control-img-play').removeClass('hideimg');
				audio.pause();
			},
			play: function() {
				$('.control-img-play').addClass('hideimg');
				$('.control-img-pause').removeClass('hideimg');
				audio.play();
				audio.addEventListener("timeupdate", function() {
					$(".duration").text(formatTime(audio.duration));
					$(".currprogress").text(formatTime(audio.currentTime));
					var percent = (100 / audio.duration) * audio.currentTime;
					$(".musicprogress").val(percent);
				});
				audio.addEventListener("ended", function() {
					if(audio.ended) {
						$('.control-img-pause').addClass('hideimg');
						$('.control-img-play').removeClass('hideimg');
						$(".duration").text("0:00");
						$(".currprogress").text("0:00");
						$(".musicprogress").val(0);
					}
				});
			}
		}
});

function formatTime(s, m) {
    s = Math.floor( s );
    m = Math.floor( s / 60 );
    s = Math.floor( s % 60 );
    s = s >= 10 ? s : '0' + s;
    return m + ':' + s;
}
