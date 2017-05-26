import Ember from 'ember';
var $ = Ember.$;

var audio = new Audio();
var thevideoid;
var progressbar;


export default Ember.Component.extend({
	didInsertElement: function() {
		var thiscontext = this;
		//var tag = document.createElement('script');

		//tag.src = "https://www.youtube.com/iframe_api";
		//var firstScriptTag = document.getElementById('ytapicode');
		//firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		
		var player;
		var done = false;
		window.onYouTubeIframeAPIReady = function () {
			player = new YT.Player('ytplayer', {
				height: '100%',
				width: '100%',
				videoId: '',
				events: {
					'onReady': onPlayerReady,
					'onStateChange': onPlayerStateChange
				},
				playerVars: {autoplay: 0, showinfo: 0,  controls: 0, modestbranding: 1, rel: 0, iv_load_policy: 3}
			});
		};
		
		function onPlayerReady(event) {
			//console.log(event.data);
		}
		
		function onPlayerStateChange(event) {
			//console.log(event.data);
			if(event.data == 1) {
				clearInterval(progressbar);
				$('.control-img-play').addClass('hideimg');
				$('.control-img-pause').removeClass('hideimg');
				$('.playerstate').text("playing");
				var vidduration = player.getDuration();
				$(".duration").text(formatTime(vidduration));
				progressbar = setInterval(function () {
					$(".currprogress").text(formatTime(player.getCurrentTime()));
					var vidduration = player.getDuration();
					var percent = (player.getCurrentTime() / vidduration) * 100;
					$(".musicprogress").slider('value', percent);
					//$(".progresshandle").css('left', (precent + 16.7) - 0.47 );
					//var elemperc = (6 / $('.progressindicator').width()) * 100;
					//var handleperc = percent - elemperc + "%";
					//$('.progresshandle').css('left', handleperc);
				}, 200)
			}
			if(event.data == 2) {
				clearInterval(progressbar);
				$('.control-img-pause').addClass('hideimg');
				$('.control-img-play').removeClass('hideimg');
				$('.playerstate').text("paused");
			}
			if(event.data == 0) {
				clearInterval(progressbar);
				$(".duration").text("0:00");
				$(".currprogress").text("0:00");
				$(".musicprogress").val(0);
				if($('.track.trackplaying').next('.track.notplaying').children('.tracknumberplay').children('.tracknumberplayimg').length) {
					var nextartist = $('.albumpageartist').text();
					var nexttitle = $('.track.trackplaying').next('.track.notplaying').children('.tracktitle').text();
					var nextvideoid = $('.track.trackplaying').next('.track.notplaying').children('.trackvideoid').text();
					$('.audioinfo').text(nextartist + " - " + nexttitle);
					$('.track').each(function() {
						if($(this).hasClass('trackplaying')) {
							$(this).children('.tracknumberplay').addClass('trackplayimghide');
							$(this).children('.tracknumber').show();
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').addClass('trackplayimghide');
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberpaused').addClass('trackplayimghide');
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberunpause').addClass('trackplayimghide');
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').animateSprite('stop');
						}
					});
					$('.track.trackplaying').addClass('finished');
					$('.track.trackplaying').next('.track.notplaying').addClass('trackplaying');
					$('.track.trackplaying.notplaying').removeClass('notplaying');
					$('.track.finished').removeClass('trackplaying');
					$('.track.finished').addClass('notplaying');
					$('.track.finished').removeClass('finished');
					$('.track.trackplaying').children('.tracknumber').hide();
					$('.track.trackplaying').children('.tracknumberplay').removeClass('trackplayimghide');
					$('.track.trackplaying').children('.tracknumberplay').children('.tracknumberplayimg').removeClass('trackplayimghide');
					$('.track.trackplaying').children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').removeClass('trackplayimghide');
					
					$('.track.trackplaying').children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').animateSprite({
						fps: 12,
						animations: {
							audioPlaying: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1]
						},
						loop: true,
						autoplay: false
					});
					
					$('.track.trackplaying').children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').animateSprite('play', 'audioPlaying');
					$('.track.trackplaying').children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').animateSprite('restart');
					
					$('.currenttracks.playing').addClass('finished');
					$('.currenttracks.finished').removeClass('playing');
					$('.currenttracks.finished').next('.currenttracks').addClass('playing');
					$('.currenttracks.finished').removeClass('finished');
					
					player.loadVideoById({videoId: nextvideoid});
					var vidduration = player.getDuration();
					$(".duration").text(formatTime(vidduration));
				}
				if(!$('.track.trackplaying').next('.track.notplaying').children('.tracknumberplay').children('.tracknumberplayimg').length) {
					if($('.currenttracks.playing').next('.currenttracks').length) {
						var nextartist = $('.currenttracks.playing').next('.currenttracks').children('.currentartist').text();
						var nexttitle = $('.currenttracks.playing').next('.currenttracks').children('.currenttitle').text();
						var nextvideoid = $('.currenttracks.playing').next('.currenttracks').children('.currentvideoid').text();
						$('.audioinfo').text(nextartist + " - " + nexttitle);
						player.loadVideoById({videoId: nextvideoid});
						$('.currenttracks.playing').addClass('finished');
						$('.currenttracks.finished').removeClass('playing');
						$('.currenttracks.finished').next('.currenttracks').addClass('playing');
						$('.currenttracks.finished').removeClass('finished');
					}
					
				}
				
				$('.playerstate').text("ended");
				//$('.control-img-play').addClass('hideimg');
				//$('.control-img-pause').removeClass('hideimg');
				//$( ".tracknumberplayimg" ).next().trigger('click', function() {
					//alert("Ended go to next track");
				//});

			}
		}
		
		//Seeking Code Here
		
		$(".musicprogress").slider({
			range: "min",
			min: 0.00,
			max: 100,
			value: 0,
			step: 0.01,
			slide: function( event, ui ) {
				clearInterval(progressbar);
			},
			stop: function( event, ui ) {
				var elemperc = $( ".musicprogress" ).slider( "value" );
				var convperc = elemperc / 100;
				var vidduration = player.getDuration();
				var seektosec = vidduration * convperc;
				player.seekTo(seektosec, true);
			}
		});
		
		//End Seeking Code
		
		$('.currentlyplaying').on('playthis', '.currentstatus.trackactive', function(){
			if($('.currentstatus.trackactive').text() == "new track playing") {
				console.log('New Track');
				$('.control-img-play').addClass('hideimg');
				$('.control-img-pause').removeClass('hideimg');
				
				var artist = $('.currentartist.trackactive').text();
				var title = $('.currenttitle.trackactive').text();
				var videoid = $('.currentvideoid.trackactive').text();
				player.loadVideoById({videoId: videoid});
			}
			
			if($('.currentstatus.trackactive').text() == "track paused") {
				console.log('Track paused');
				$('.currenttracks.playing').addClass('paused');
				$('.currenttracks.playing').removeClass('playing');
				$('.control-img-pause').addClass('hideimg');
				$('.control-img-play').removeClass('hideimg');
				player.pauseVideo();
				clearInterval(progressbar);
			}
			
			if($('.currentstatus.trackactive').text() == "track resume") {
				console.log('Track Resumed');
				$('.currenttracks.paused').addClass('playing');
				$('.currenttracks.paused').removeClass('paused');
				$('.control-img-play').addClass('hideimg');
				$('.control-img-pause').removeClass('hideimg');
				player.playVideo();
			}
		});

		
		
		$( ".control-img-play" ).click(function() {
			if($('.currentartist.trackactive').text() == "" && $('.currenttitle.trackactive').text() ==  "") {
				
			}
			if($('.currentartist.trackactive').text() != "" && $('.currenttitle.trackactive').text() !=  "") {
				$('.control-img-play').addClass('hideimg');
				$('.control-img-pause').removeClass('hideimg');
				if($('.currenttracks.paused').length) {
					$('.currenttracks.paused').addClass('playing');
					$('.currenttracks.paused').removeClass('paused');
				}
				player.playVideo();
			}
			if($('.currenttracks.playing').prev('.currenttracks').length) {
				$('.prevbutton').addClass('prevenabled');
			}
			if(!$('.currenttracks.playing').prev('.currenttracks').length) {
				$('.prevbutton').removeClass('prevenabled');
			}
		});
		
		$( ".control-img-pause" ).click(function() {
			$('.control-img-pause').addClass('hideimg');
			$('.control-img-play').removeClass('hideimg');
			if($('.currenttracks.playing').length) {
				$('.currenttracks.playing').addClass('paused');
				$('.currenttracks.playing').removeClass('playing');
			}
			if($('.currenttracks.paused').prev('.currenttracks').length) {
				$('.prevbutton').addClass('prevenabled');
			}
			if(!$('.currenttracks.paused').prev('.currenttracks').length) {
				$('.prevbutton').removeClass('prevenabled');
			}
			player.pauseVideo();
			clearInterval(progressbar);
		});
		
		$('.nextbutton').click(function() {
				if($('.nextbutton').hasClass('nextenabled')) {
					if($('.track.trackplaying').next('.track.notplaying').children('.tracknumberplay').children('.tracknumberplayimg').length) {
						var nextartist = $('.albumpageartist').text();
						var nexttitle = $('.track.trackplaying').next('.track.notplaying').children('.tracktitle').text();
						var nextvideoid = $('.track.trackplaying').next('.track.notplaying').children('.trackvideoid').text();
						$('.audioinfo').text(nextartist + " - " + nexttitle);
						$('.track').each(function() {
							if($(this).hasClass('trackplaying')) {
								$(this).children('.tracknumberplay').addClass('trackplayimghide');
								$(this).children('.tracknumber').show();
								$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').addClass('trackplayimghide');
								$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberpaused').addClass('trackplayimghide');
								$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberunpause').addClass('trackplayimghide');
								$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').animateSprite('stop');
							}
						});
						$('.track.trackplaying').addClass('finished');
						$('.track.trackplaying').next('.track.notplaying').addClass('trackplaying');
						$('.track.trackplaying.notplaying').removeClass('notplaying');
						$('.track.finished').removeClass('trackplaying');
						$('.track.finished').addClass('notplaying');
						$('.track.finished').removeClass('finished');
						$('.track.trackplaying').children('.tracknumber').hide();
						$('.track.trackplaying').children('.tracknumberplay').removeClass('trackplayimghide');
						$('.track.trackplaying').children('.tracknumberplay').children('.tracknumberplayimg').removeClass('trackplayimghide');
						$('.track.trackplaying').children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').removeClass('trackplayimghide');
						
						$('.track.trackplaying').children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').animateSprite({
							fps: 12,
							animations: {
								audioPlaying: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1]
							},
							loop: true,
							autoplay: false
						});
						
						$('.track.trackplaying').children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').animateSprite('play', 'audioPlaying');
						$('.track.trackplaying').children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').animateSprite('restart');
						
						$('.currenttracks.playing').addClass('finished');
						$('.currenttracks.finished').removeClass('playing');
						$('.currenttracks.finished').next('.currenttracks').addClass('playing');
						$('.currenttracks.finished').removeClass('finished');
						
						if($('.currenttracks.playing').prev('.currenttracks').length) {
							$('.prevbutton').addClass('prevenabled');
						}
						
						player.loadVideoById({videoId: nextvideoid});
					}
					
					if(!$('.track.trackplaying').next('.track.notplaying').children('.tracknumberplay').children('.tracknumberplayimg').length) {
						if($('.currenttracks.playing').next('.currenttracks').length) {
							var nextartist = $('.currenttracks.playing').next('.currenttracks').children('.currentartist').text();
							var nexttitle = $('.currenttracks.playing').next('.currenttracks').children('.currenttitle').text();
							var nextvideoid = $('.currenttracks.playing').next('.currenttracks').children('.currentvideoid').text();
							$('.audioinfo').text(nextartist + " - " + nexttitle);
							player.loadVideoById({videoId: nextvideoid});
							$('.currenttracks.playing').addClass('finished');
							$('.currenttracks.finished').removeClass('playing');
							$('.currenttracks.finished').next('.currenttracks').addClass('playing');
							$('.currenttracks.finished').removeClass('finished');
						}
						if($('.currenttracks.paused').next('.currenttracks').length) {
							var nextartist = $('.currenttracks.paused').next('.currenttracks').children('.currentartist').text();
							var nexttitle = $('.currenttracks.paused').next('.currenttracks').children('.currenttitle').text();
							var nextvideoid = $('.currenttracks.paused').next('.currenttracks').children('.currentvideoid').text();
							$('.audioinfo').text(nextartist + " - " + nexttitle);
							player.loadVideoById({videoId: nextvideoid});
							$('.currenttracks.paused').addClass('finished');
							$('.currenttracks.finished').removeClass('paused');
							$('.currenttracks.finished').next('.currenttracks').addClass('playing');
							$('.currenttracks.finished').removeClass('finished');
						}
						if($('.currenttracks.playing').prev('.currenttracks').length) {
							$('.prevbutton').addClass('prevenabled');
						}
					
					}
				}
		});
			
		
		$('.prevbutton').click(function() {
			if($('.prevbutton').hasClass('prevenabled')) {
				if($('.track.trackplaying').prev('.track.notplaying').children('.tracknumberplay').children('.tracknumberplayimg').length) {
						var prevartist = $('.albumpageartist').text();
						var prevtitle = $('.track.trackplaying').prev('.track.notplaying').children('.tracktitle').text();
						var prevvideoid = $('.track.trackplaying').prev('.track.notplaying').children('.trackvideoid').text();
						$('.audioinfo').text(prevartist + " - " + prevtitle);
						$('.track').each(function() {
							if($(this).hasClass('trackplaying')) {
								$(this).children('.tracknumberplay').addClass('trackplayimghide');
								$(this).children('.tracknumber').show();
								$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').addClass('trackplayimghide');
								$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberpaused').addClass('trackplayimghide');
								$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberunpause').addClass('trackplayimghide');
								$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').animateSprite('stop');
							}
						});
						$('.track.trackplaying').addClass('finished');
						$('.track.trackplaying').prev('.track.notplaying').addClass('trackplaying');
						$('.track.trackplaying.notplaying').removeClass('notplaying');
						$('.track.finished').removeClass('trackplaying');
						$('.track.finished').addClass('notplaying');
						$('.track.finished').removeClass('finished');
						$('.track.trackplaying').children('.tracknumber').hide();
						$('.track.trackplaying').children('.tracknumberplay').removeClass('trackplayimghide');
						$('.track.trackplaying').children('.tracknumberplay').children('.tracknumberplayimg').removeClass('trackplayimghide');
						$('.track.trackplaying').children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').removeClass('trackplayimghide');
						
						$('.track.trackplaying').children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').animateSprite({
							fps: 12,
							animations: {
								audioPlaying: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1]
							},
							loop: true,
							autoplay: false
						});
						
						$('.track.trackplaying').children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').animateSprite('play', 'audioPlaying');
						$('.track.trackplaying').children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').animateSprite('restart');
						
						$('.currenttracks.playing').addClass('finished');
						$('.currenttracks.finished').removeClass('playing');
						$('.currenttracks.finished').prev('.currenttracks').addClass('playing');
						$('.currenttracks.finished').removeClass('finished');
						
						if($('.currenttracks.playing').prev('.currenttracks').length) {
							$('.prevbutton').addClass('prevenabled');
						}
						
						if(!$('.currenttracks.playing').prev('.currenttracks').length) {
							$('.prevbutton').removeClass('prevenabled');
						}
						
						player.loadVideoById({videoId: prevvideoid});
				}
					
				if(!$('.track.trackplaying').next('.track.notplaying').children('.tracknumberplay').children('.tracknumberplayimg').length) {
					if($('.currenttracks.playing').prev('.currenttracks').length) {
						var prevartist = $('.currenttracks.playing').prev('.currenttracks').children('.currentartist').text();
						var prevtitle = $('.currenttracks.playing').prev('.currenttracks').children('.currenttitle').text();
						var prevvideoid = $('.currenttracks.playing').prev('.currenttracks').children('.currentvideoid').text();
						$('.audioinfo').text(prevartist + " - " + prevtitle);
						player.loadVideoById({videoId: prevvideoid});
						$('.currenttracks.playing').addClass('finished');
						$('.currenttracks.finished').removeClass('playing');
						$('.currenttracks.finished').prev('.currenttracks').addClass('playing');
						$('.currenttracks.finished').removeClass('finished');
					}
					if($('.currenttracks.paused').prev('.currenttracks').length) {
						var prevartist = $('.currenttracks.paused').prev('.currenttracks').children('.currentartist').text();
						var prevtitle = $('.currenttracks.paused').prev('.currenttracks').children('.currenttitle').text();
						var prevvideoid = $('.currenttracks.paused').prev('.currenttracks').children('.currentvideoid').text();
						$('.audioinfo').text(prevartist + " - " + prevtitle);
						player.loadVideoById({videoId: prevvideoid});
						$('.currenttracks.paused').addClass('finished');
						$('.currenttracks.finished').removeClass('paused');
						$('.currenttracks.finished').prev('.currenttracks').addClass('playing');
						$('.currenttracks.finished').removeClass('finished');
					}
					if(!$('.currenttracks').prev('.currenttracks').length) {
						$('.prevbutton').removeClass('prevenabled');
					}
				}
			}
			
		});
		
		$( ".modal-close" ).click(function() {
			$('.modal-fog').removeClass('foglarge');
			$('.modal-fog').addClass('fogsmall');
			$('.modal-frame').removeClass('framelarge');
			$('.modal-frame').addClass('framesmall');
			$('.modal-close').addClass('hidemodalclose');
		});
		
	}
});

//get info from my api first
function getvideoid(artist, title) {
	var videoidurl = "http://10.0.0.1:8000/video?artist=" + artist + "&title=" + title;
	return $.ajax({
			type: 'GET',
			url: videoidurl,
			async: true,
			contentType: "application/json",
			dataType: 'json',
			success: function(json) {
				//$('.albumtracklist').text(json.result.tracklist);
				if(json.videoid != null) {
					//console.log(json.result[0]);
					thevideoid = json.videoid;
					console.log(thevideoid);
				}
			},
			error: function(e) {
				console.log(e.message);
			}
		});
}

function formatTime(s, m) {
    s = Math.floor( s );    
    m = Math.floor( s / 60 );    
    s = Math.floor( s % 60 );
    s = s >= 10 ? s : '0' + s;    
    return m + ':' + s;
}