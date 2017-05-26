import Ember from 'ember';
var $ = Ember.$;

var audio = new Audio();


export default Ember.Component.extend({
	didUpdateAttrs: function() {
		$('.albumtracklist').empty();
		$('.pageloader').removeClass('pageloaderhidden');
		$('.pageloaderanim').animateSprite({
			columns: 1,
			fps: 30,
			animations: {
				albumLoading: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
			},
			loop: true,
			autoplay: false
		});
		$('.pageloaderanim').animateSprite('play', 'albumLoading');
		
		var thiscontext = this;
		//test single track no api
		/* $('.albumtracklist').append('<div class="track"><div class="tracknumberplay trackplayimghide"><div class="tracknumberplayimg"><div class="tracknumberplaying trackplayimghide"></div></div></div><div class="tracknumber">1</div><div class="tracktitle">Test Track</div><div class="trackduration">1:00</div></div>');
		
		$( ".track" ).mouseover(function() {
				if ($(this).hasClass('trackplaying')) {
					$(this).children('.tracknumber').hide();
					$(this).children('.tracknumberplay').removeClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').removeClass('trackplayimghide');
				}
				else{
					$(this).children('.tracknumber').hide();
					$(this).children('.tracknumberplay').removeClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').addClass('trackplayimghide');
					
				}
			});
			$( ".track" ).mouseout(function() {
				if ($(this).hasClass('trackplaying')) {
					$(this).children('.tracknumber').hide();
				}
				else {
					$(this).children('.tracknumber').show();
					$(this).children('.tracknumberplay').addClass('trackplayimghide');
				}
			});
		$( ".tracknumberplayimg" ).click(function() {
				$('.control-img-play').addClass('hideimg');
				$('.control-img-pause').removeClass('hideimg');
				audio.src = 'music/Intro.mp3';
				audio.play();
				$('.track').each(function() {
					if($(this).hasClass('trackplaying')) {
						$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').animateSprite('stop');
						$(this).removeClass('trackplaying');
						$(this).children('.tracknumberplay').addClass('trackplayimghide');
						$(this).children('.tracknumber').show();
					}
				});
				$(this).parents('.track').addClass('trackplaying');
				$(this).children('.tracknumberplaying').removeClass('trackplayimghide');
				
				$(this).children('.tracknumberplaying').animateSprite({
					fps: 12,
					animations: {
						audioPlaying: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1]
					},
					loop: true,
					autoplay: false
				});
				
				$(this).children('.tracknumberplaying').animateSprite('play', 'audioPlaying');
				$(this).children('.tracknumberplaying').animateSprite('restart');
				//$(this).children('.tracknumberplaying').animateSprite('fps', 12);
				//$(this).children('.tracknumberplaying').animateSprite('play', 'audioPlaying')
				
			});
		//End Test Track
		*/
		
		
		
		$(window).on("resize",function(){
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
		});
		
		
		
		var trackcount = 0;
		var tracksnotplaying = 0;
		
		var artist = this.get('artist');
		var album = this.get('album');
		album = album.replace(/ *\([^)]*\) */g, "");
		
		var regex = /\+\+\+/g;
		var sregex = /\+/g;
		var singleplusonlybeginning = /^[\+]$/g;
		var multiple = false;
		var amultiple = false;
		var notjustsingle = false;
		$('.albumpageartist').text(artist);
		$('.albumpagealbum').text(album);
		if(/\+\+\+/g.test(artist)) {
			var regartist = artist.replace(/\+\+\+/g, " " + '+' + " ");
			$('.albumpageartist').text(regartist);
			artist = regartist;
			multiple = true;
		}
		if(/\+/g.test(artist) && multiple === false) {
			var regartistm = artist.replace(/\+/g, " ");
			$('.albumpageartist').text(regartistm);
			artist = regartistm;
		}
		if(/^[\+]$/g.test(album)) {
			var regalbum = album.replace(/^[\+]$/g, '+');
			$('.albumpagealbum').text(regalbum);
			album = regalbum;
			notjustsingle = true;
		}
		if(/\+\+\+/g.test(album)) {
			var regalbum = album.replace(/\+\+\+/g, " " + '+' + " ");
			$('.albumpagealbum').text(regalbum);
			album = regalbum;
			amultiple = true;
		}
		if(/\+/g.test(album) && amultiple === false && notjustsingle === false) {
			var regalbums = album.replace(/\+/g, " ");
			$('.albumpagealbum').text(regalbums);
			album = regalbums;
		}
	
		
		
		$.when(ajax1(artist, album)).done(function(){
			$('.pageloaderanim').animateSprite('stop');
			$('.pageloader').addClass("pageloaderhidden");
			
			
			if ($('.clickedsongtitle').val() != "") {
				$('.track').each(function() {
					if($(this).children('.tracktitle').text() == $('.clickedsongtitle').val()) {
						$(this).addClass('fromsearch');
						$(this).children('.tracknumber').hide();
						$(this).children('.tracknumberplay').removeClass('trackplayimghide');
						$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').addClass('trackplayimghide');
						$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberpaused').addClass('trackplayimghide');
						$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberunpause').removeClass('trackplayimghide');
					}
				});
			}
			//add a check to see if music is already playing if not then auto select albums first track
			
			$( ".track" ).mouseover(function() {
				if ($(this).hasClass('trackplaying')) {
					$(this).children('.tracknumber').hide();
					$(this).children('.tracknumberplay').removeClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').addClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberpaused').removeClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberunpause').addClass('trackplayimghide');
				}
				if ($(this).hasClass('trackpaused')) {
					$(this).children('.tracknumber').hide();
					$(this).children('.tracknumberplay').removeClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').addClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberpaused').addClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberunpause').removeClass('trackplayimghide');
				}
				if ($(this).hasClass('notplaying') && $(this).hasClass('fromsearch')) {
					$(this).children('.tracknumber').hide();
					$(this).children('.tracknumberplay').removeClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').addClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberpaused').addClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberunpause').removeClass('trackplayimghide');
				}
				if ($(this).hasClass('notplaying') && !$(this).hasClass('fromsearch')) {
					$(this).children('.tracknumber').hide();
					$(this).children('.tracknumberplay').removeClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').addClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberpaused').addClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberunpause').addClass('trackplayimghide');
				}
			});
			$( ".track" ).mouseout(function() {
				if ($(this).hasClass('trackplaying')) {
					$(this).children('.tracknumber').hide();
					$(this).children('.tracknumberplay').removeClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').removeClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberpaused').addClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberunpause').addClass('trackplayimghide');
				}
				if ($(this).hasClass('trackpaused')) {
					$(this).children('.tracknumber').hide();
					$(this).children('.tracknumberplay').removeClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').addClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberpaused').addClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberunpause').removeClass('trackplayimghide');
				}
				if ($(this).hasClass('notplaying') && $(this).hasClass('fromsearch')) {
					$(this).children('.tracknumber').hide();
					$(this).children('.tracknumberplay').removeClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').addClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberpaused').addClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberunpause').removeClass('trackplayimghide');
				}
				if ($(this).hasClass('notplaying') && !$(this).hasClass('fromsearch')) {
					$(this).children('.tracknumber').show();
					$(this).children('.tracknumberplayimg').addClass('trackplayimghide');
					$(this).children('.tracknumberplay').addClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').addClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberpaused').addClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberunpause').addClass('trackplayimghide');
				}
			});
			$( ".tracknumberplayimg" ).click(function() {
				var onlyoneclick = 0;
				if($(this).parent('.tracknumberplay').parent('.track').hasClass('trackplaying') && onlyoneclick == 0) {
					onlyoneclick = 1;
					$(this).children('.tracknumberplaying').addClass('trackplayimghide');
					$(this).children('.tracknumberpaused').addClass('trackplayimghide');
					$(this).children('.tracknumberunpause').removeClass('trackplayimghide');
					$(this).parent('.tracknumberplay').parent('.track').removeClass('trackplaying');
					$(this).parent('.tracknumberplay').parent('.track').addClass('trackpaused');
					$('.currentlyplaying').children('.currenttracks').children('.currentstatus.trackactive').text("track paused").trigger('playthis');
				}
				if($(this).parent('.tracknumberplay').parent('.track').hasClass('trackpaused')  && onlyoneclick == 0) {
					onlyoneclick = 1;
					$(this).children('.tracknumberplaying').removeClass('trackplayimghide');
					$(this).children('.tracknumberpaused').addClass('trackplayimghide');
					$(this).parent('.tracknumberplay').parent('.track').removeClass('trackpaused');
					$(this).parent('.tracknumberplay').parent('.track').addClass('trackplaying');
					$('.currentlyplaying').children('.currenttracks').children('.currentstatus.trackactive').text("track resume").trigger('playthis');
				}
				if($(this).parent('.tracknumberplay').parent('.track').hasClass('notplaying')  && onlyoneclick == 0) {
					onlyoneclick = 1;
					if($(this).parent('.tracknumberplay').parent('.track').hasClass('fromsearch')) {
						$(this).parent('.tracknumberplay').parent('.track').removeClass('fromsearch');
					}
					var clickedartist = $('.albumpageartist').text();
					var clickedtitle = $(this).parents('.track').children('.tracktitle').text();
					var clickedvideoid = $(this).parents('.track').children('.trackvideoid').text();
					$('.audioinfo').text(clickedartist + " - " + clickedtitle);
					$('.currentartist').text($('.albumpageartist').text());
					$('.currenttitle').text($(this).parents('.track').children('.tracktitle').text());
					$('.currentvideoid').text($(this).parents('.track').children('.trackvideoid').text());
					$('.currentlyplaying').empty();
					$('.currentlyplaying').append('<div class="currenttracks playing"><div class="currenttrackalbumimage trackactive"></div><div class="currenttitle trackactive">' + clickedtitle + '</div><div class="currentartist trackactive">' + clickedartist + '</div><div class="currentvideoid trackactive">' + clickedvideoid + '</div><div class="currentstatus trackactive"></div></div>');
					$('.track').each(function() {
						if($(this).hasClass('trackplaying')) {
							$(this).children('.tracknumberplay').addClass('trackplayimghide');
							$(this).children('.tracknumber').show();
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').addClass('trackplayimghide');
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberpaused').addClass('trackplayimghide');
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberunpause').addClass('trackplayimghide');
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').animateSprite('stop');
							$(this).addClass('notplaying');
							$(this).removeClass('trackplaying');
						}
						if($(this).hasClass('trackpaused')) {
							$(this).children('.tracknumberplay').addClass('trackplayimghide');
							$(this).children('.tracknumber').show();
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').addClass('trackplayimghide');
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberpaused').addClass('trackplayimghide');
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberunpause').addClass('trackplayimghide');
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').animateSprite('stop');
							$(this).addClass('notplaying');
							$(this).removeClass('trackpaused');
						}
					});
					$(this).parent('.tracknumberplay').parent('.track').addClass('trackplaying');
					$(this).parent('.tracknumberplay').parent('.track').removeClass('notplaying');
					$(this).children('.tracknumberplaying').removeClass('trackplayimghide');
					$('.currentlyplaying').children('.currenttracks').children('.currentstatus.trackactive').text("new track playing").trigger('playthis');
					
					
					$('.track.trackplaying').nextAll().each(function() {
							//alert($(this).children('.tracktitle').text());
							$('.currentlyplaying').append('<div class="currenttracks"><div class="currenttrackalbumimage"></div><div class="currenttitle">' + $(this).children('.tracktitle').text() + '</div><div class="currentartist">' + clickedartist + '</div><div class="currentvideoid">' + $(this).children('.trackvideoid').text() + '</div><div class="currentstatus"></div></div>');
					});
					
					var playlistheight = $('.ember-application').height() - 171+"px";
					$('.playlistarea').css("height", playlistheight);
					
					$(this).children('.tracknumberplaying').animateSprite({
						fps: 12,
						animations: {
							audioPlaying: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1]
						},
						loop: true,
						autoplay: false
					});
					
					$(this).children('.tracknumberplaying').animateSprite('play', 'audioPlaying');
					$(this).children('.tracknumberplaying').animateSprite('restart');
					//$(this).children('.tracknumberplaying').animateSprite('fps', 12);
					//$(this).children('.tracknumberplaying').animateSprite('play', 'audioPlaying')
					
					if($('.currentlyplaying').children('.currenttracks').length > 1) {
						$('.nextbutton').addClass('nextenabled');
					}
					
				}
			});
			

			$( ".control-img-pause" ).click(function() {
					$('.track').each(function() {
						if($(this).hasClass('trackplaying')) {
							$(this).addClass('trackpaused');
							$(this).removeClass('trackplaying');
							$(this).children('.tracknumber').hide();
							$(this).children('.tracknumberplay').removeClass('trackplayimghide');
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').addClass('trackplayimghide');
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberpaused').addClass('trackplayimghide');
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberunpause').removeClass('trackplayimghide');
						}
					});
			});
				
			$( ".control-img-play" ).click(function() {
					$('.track').each(function() {
						if($(this).hasClass('trackpaused')) {
							$(this).addClass('trackplaying');
							$(this).removeClass('trackpaused');
							$(this).children('.tracknumber').hide();
							$(this).children('.tracknumberplay').removeClass('trackplayimghide');
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').removeClass('trackplayimghide');
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberpaused').addClass('trackplayimghide');
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberunpause').addClass('trackplayimghide');
						}
					});
			});
			
			$('.track').each(function() {
				trackcount += 1;
			});
			
			$('.track.notplaying').each(function() {
				tracksnotplaying += 1;
			});
			
			
			if(trackcount == tracksnotplaying) {
				if($('.playerstate').text() == "playing") {
					var playingartist = $('.currenttracks.playing').children('.currentartist').text();
					var playingtitle = $('.currenttracks.playing').children('.currenttitle').text();
					$('.track').each(function() {
						if(artist == playingartist && $(this).children('.tracktitle').text() == playingtitle) {
							$(this).addClass('trackplaying');
							$(this).removeClass('notplaying');
							$(this).children('.tracknumber').hide();
							$(this).children('.tracknumberplay').removeClass('trackplayimghide');
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').removeClass('trackplayimghide');
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').removeClass('trackplayimghide');
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').animateSprite({
								fps: 12,
								animations: {
									audioPlaying: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1]
								},
								loop: true,
								autoplay: false
							});
							
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').animateSprite('play', 'audioPlaying');
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').animateSprite('restart');
						}
					});
				}
				if($('.playerstate').text() == "paused") {
					var playingartist = $('.currenttracks.paused').children('.currentartist').text();
					var playingtitle = $('.currenttracks.paused').children('.currenttitle').text();
					$('.track').each(function() {
						if(artist == playingartist && $(this).children('.tracktitle').text() == playingtitle) {
							$(this).addClass('trackpaused');
							$(this).removeClass('notplaying');
							$(this).children('.tracknumber').hide();
							$(this).children('.tracknumberplay').removeClass('trackplayimghide');
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').removeClass('trackplayimghide');
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').animateSprite({
								fps: 12,
								animations: {
									audioPlaying: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1]
								},
								loop: true,
								autoplay: false
							});
							
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').animateSprite('play', 'audioPlaying');
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').animateSprite('restart');
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberunpause').removeClass('trackplayimghide');
						}
					});
				}
			}
			
		});
	
	
	//$.when(ajax1(artist, album)).done(function(){
    // the code here will be executed when all four ajax requests resolve.
    // a1, a2, a3 and a4 are lists of length 3 containing the response text,
    // status, and jqXHR object for each of the four ajax calls respectively.
		//$('.albumpage').removeClass("albumpageloading");
	//});
		

		//alert(artist.replace(regex, " " + '+' + " "))
		//console.log(this.get('artist'));
		//console.log(this.get('album'));
		
	},
	didInsertElement: function() {
		$('.pageloader').removeClass('pageloaderhidden');
		$('.pageloaderanim').animateSprite({
			columns: 1,
			fps: 30,
			animations: {
				albumLoading: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
			},
			loop: true,
			autoplay: false
		});
		$('.pageloaderanim').animateSprite('play', 'albumLoading');
		
		var thiscontext = this;
		//test single track no api
		/* $('.albumtracklist').append('<div class="track"><div class="tracknumberplay trackplayimghide"><div class="tracknumberplayimg"><div class="tracknumberplaying trackplayimghide"></div></div></div><div class="tracknumber">1</div><div class="tracktitle">Test Track</div><div class="trackduration">1:00</div></div>');
		
		$( ".track" ).mouseover(function() {
				if ($(this).hasClass('trackplaying')) {
					$(this).children('.tracknumber').hide();
					$(this).children('.tracknumberplay').removeClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').removeClass('trackplayimghide');
				}
				else{
					$(this).children('.tracknumber').hide();
					$(this).children('.tracknumberplay').removeClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').addClass('trackplayimghide');
					
				}
			});
			$( ".track" ).mouseout(function() {
				if ($(this).hasClass('trackplaying')) {
					$(this).children('.tracknumber').hide();
				}
				else {
					$(this).children('.tracknumber').show();
					$(this).children('.tracknumberplay').addClass('trackplayimghide');
				}
			});
		$( ".tracknumberplayimg" ).click(function() {
				$('.control-img-play').addClass('hideimg');
				$('.control-img-pause').removeClass('hideimg');
				audio.src = 'music/Intro.mp3';
				audio.play();
				$('.track').each(function() {
					if($(this).hasClass('trackplaying')) {
						$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').animateSprite('stop');
						$(this).removeClass('trackplaying');
						$(this).children('.tracknumberplay').addClass('trackplayimghide');
						$(this).children('.tracknumber').show();
					}
				});
				$(this).parents('.track').addClass('trackplaying');
				$(this).children('.tracknumberplaying').removeClass('trackplayimghide');
				
				$(this).children('.tracknumberplaying').animateSprite({
					fps: 12,
					animations: {
						audioPlaying: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1]
					},
					loop: true,
					autoplay: false
				});
				
				$(this).children('.tracknumberplaying').animateSprite('play', 'audioPlaying');
				$(this).children('.tracknumberplaying').animateSprite('restart');
				//$(this).children('.tracknumberplaying').animateSprite('fps', 12);
				//$(this).children('.tracknumberplaying').animateSprite('play', 'audioPlaying')
				
			});
		//End Test Track
		*/
		
		
		
		$(window).on("resize",function(){
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
		});
		
		
		
		var trackcount = 0;
		var tracksnotplaying = 0;
		
		var artist = this.get('artist');
		var album = this.get('album');
		album = album.replace(/ *\([^)]*\) */g, "");
		
		var regex = /\+\+\+/g;
		var sregex = /\+/g;
		var singleplusonlybeginning = /^[\+]$/g;
		var multiple = false;
		var amultiple = false;
		var notjustsingle = false;
		$('.albumpageartist').text(artist);
		$('.albumpagealbum').text(album);
		if(/\+\+\+/g.test(artist)) {
			var regartist = artist.replace(/\+\+\+/g, " " + '+' + " ");
			$('.albumpageartist').text(regartist);
			artist = regartist;
			multiple = true;
		}
		if(/\+/g.test(artist) && multiple === false) {
			var regartistm = artist.replace(/\+/g, " ");
			$('.albumpageartist').text(regartistm);
			artist = regartistm;
		}
		if(/^[\+]$/g.test(album)) {
			var regalbum = album.replace(/^[\+]$/g, '+');
			$('.albumpagealbum').text(regalbum);
			album = regalbum;
			notjustsingle = true;
		}
		if(/\+\+\+/g.test(album)) {
			var regalbum = album.replace(/\+\+\+/g, " " + '+' + " ");
			$('.albumpagealbum').text(regalbum);
			album = regalbum;
			amultiple = true;
		}
		if(/\+/g.test(album) && amultiple === false && notjustsingle === false) {
			var regalbums = album.replace(/\+/g, " ");
			$('.albumpagealbum').text(regalbums);
			album = regalbums;
		}
	
		
		
		$.when(ajax1(artist, album)).done(function(){
			$('.pageloaderanim').animateSprite('stop');
			$('.pageloader').addClass("pageloaderhidden");
			
			
			$('.track').draggable({
				scroll: false,
				appendTo: "body",
				zIndex: 10000,
				containment: 'window',
				cursorAt: { top: 0, left: -20 },
				helper: function( event ) {
					var tracktext = $(this).children('.tracktitle').text();
					return $( "<div class='ui-widget-header'>"+ tracktext +"</div>" );
				}
			});
			
			
			if ($('.clickedsongtitle').val() != "") {
				$('.track').each(function() {
					if($(this).children('.tracktitle').text() == $('.clickedsongtitle').val()) {
						$(this).addClass('fromsearch');
						$(this).children('.tracknumber').hide();
						$(this).children('.tracknumberplay').removeClass('trackplayimghide');
						$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').addClass('trackplayimghide');
						$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberpaused').addClass('trackplayimghide');
						$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberunpause').removeClass('trackplayimghide');
					}
				});
			}
			
			//add a check to see if music is already playing if not then auto select albums first track
			
			$( ".track" ).mouseover(function() {
				if ($(this).hasClass('trackplaying')) {
					$(this).children('.tracknumber').hide();
					$(this).children('.tracknumberplay').removeClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').addClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberpaused').removeClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberunpause').addClass('trackplayimghide');
				}
				if ($(this).hasClass('trackpaused')) {
					$(this).children('.tracknumber').hide();
					$(this).children('.tracknumberplay').removeClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').addClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberpaused').addClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberunpause').removeClass('trackplayimghide');
				}
				if ($(this).hasClass('notplaying') && $(this).hasClass('fromsearch')) {
					$(this).children('.tracknumber').hide();
					$(this).children('.tracknumberplay').removeClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').addClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberpaused').addClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberunpause').removeClass('trackplayimghide');
				}
				if ($(this).hasClass('notplaying') && !$(this).hasClass('fromsearch')) {
					$(this).children('.tracknumber').hide();
					$(this).children('.tracknumberplay').removeClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').addClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberpaused').addClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberunpause').addClass('trackplayimghide');
				}
			});
			$( ".track" ).mouseout(function() {
				if ($(this).hasClass('trackplaying')) {
					$(this).children('.tracknumber').hide();
					$(this).children('.tracknumberplay').removeClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').removeClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberpaused').addClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberunpause').addClass('trackplayimghide');
				}
				if ($(this).hasClass('trackpaused')) {
					$(this).children('.tracknumber').hide();
					$(this).children('.tracknumberplay').removeClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').addClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberpaused').addClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberunpause').removeClass('trackplayimghide');
				}
				if ($(this).hasClass('notplaying') && $(this).hasClass('fromsearch')) {
					$(this).children('.tracknumber').hide();
					$(this).children('.tracknumberplay').removeClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').addClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberpaused').addClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberunpause').removeClass('trackplayimghide');
				}
				if ($(this).hasClass('notplaying') && !$(this).hasClass('fromsearch')) {
					$(this).children('.tracknumber').show();
					$(this).children('.tracknumberplayimg').addClass('trackplayimghide');
					$(this).children('.tracknumberplay').addClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').addClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberpaused').addClass('trackplayimghide');
					$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberunpause').addClass('trackplayimghide');
				}
			});
			$( ".tracknumberplayimg" ).click(function() {
				var onlyoneclick = 0;
				if($(this).parent('.tracknumberplay').parent('.track').hasClass('trackplaying') && onlyoneclick == 0) {
					onlyoneclick = 1;
					$(this).children('.tracknumberplaying').addClass('trackplayimghide');
					$(this).children('.tracknumberpaused').addClass('trackplayimghide');
					$(this).children('.tracknumberunpause').removeClass('trackplayimghide');
					$(this).parent('.tracknumberplay').parent('.track').removeClass('trackplaying');
					$(this).parent('.tracknumberplay').parent('.track').addClass('trackpaused');
					$('.currentlyplaying').children('.currenttracks').children('.currentstatus.trackactive').text("track paused").trigger('playthis');
				}
				if($(this).parent('.tracknumberplay').parent('.track').hasClass('trackpaused')  && onlyoneclick == 0) {
					onlyoneclick = 1;
					$(this).children('.tracknumberplaying').removeClass('trackplayimghide');
					$(this).children('.tracknumberpaused').addClass('trackplayimghide');
					$(this).parent('.tracknumberplay').parent('.track').removeClass('trackpaused');
					$(this).parent('.tracknumberplay').parent('.track').addClass('trackplaying');
					$('.currentlyplaying').children('.currenttracks').children('.currentstatus.trackactive').text("track resume").trigger('playthis');
				}
				if($(this).parent('.tracknumberplay').parent('.track').hasClass('notplaying')  && onlyoneclick == 0) {
					onlyoneclick = 1;
					var clickedartist = $('.albumpageartist').text();
					var clickedtitle = $(this).parents('.track').children('.tracktitle').text();
					var clickedvideoid = $(this).parents('.track').children('.trackvideoid').text();
					$('.audioinfo').text(clickedartist + " - " + clickedtitle);
					$('.currentartist').text($('.albumpageartist').text());
					$('.currenttitle').text($(this).parents('.track').children('.tracktitle').text());
					$('.currentvideoid').text($(this).parents('.track').children('.trackvideoid').text());
					$('.currentlyplaying').empty();
					$('.currentlyplaying').append('<div class="currenttracks playing"><div class="currenttrackalbumimage trackactive"></div><div class="currenttitle trackactive">' + clickedtitle + '</div><div class="currentartist trackactive">' + clickedartist + '</div><div class="currentvideoid trackactive">' + clickedvideoid + '</div><div class="currentstatus trackactive"></div></div>');
					$('.track').each(function() {
						if($(this).hasClass('trackplaying')) {
							$(this).children('.tracknumberplay').addClass('trackplayimghide');
							$(this).children('.tracknumber').show();
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').addClass('trackplayimghide');
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberpaused').addClass('trackplayimghide');
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberunpause').addClass('trackplayimghide');
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').animateSprite('stop');
							$(this).addClass('notplaying');
							$(this).removeClass('trackplaying');
						}
						if($(this).hasClass('trackpaused')) {
							$(this).children('.tracknumberplay').addClass('trackplayimghide');
							$(this).children('.tracknumber').show();
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').addClass('trackplayimghide');
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberpaused').addClass('trackplayimghide');
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberunpause').addClass('trackplayimghide');
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').animateSprite('stop');
							$(this).addClass('notplaying');
							$(this).removeClass('trackpaused');
						}
					});
					$(this).parent('.tracknumberplay').parent('.track').addClass('trackplaying');
					$(this).parent('.tracknumberplay').parent('.track').removeClass('notplaying');
					$(this).children('.tracknumberplaying').removeClass('trackplayimghide');
					$('.currentlyplaying').children('.currenttracks').children('.currentstatus.trackactive').text("new track playing").trigger('playthis');
					
					
					$('.track.trackplaying').nextAll().each(function() {
							//alert($(this).children('.tracktitle').text());
							$('.currentlyplaying').append('<div class="currenttracks"><div class="currenttrackalbumimage"></div><div class="currenttitle">' + $(this).children('.tracktitle').text() + '</div><div class="currentartist">' + clickedartist + '</div><div class="currentvideoid">' + $(this).children('.trackvideoid').text() + '</div><div class="currentstatus"></div></div>');
					});
					
					var playlistheight = $('.ember-application').height() - 171+"px";
					$('.playlistarea').css("height", playlistheight);
					
					$(this).children('.tracknumberplaying').animateSprite({
						fps: 12,
						animations: {
							audioPlaying: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1]
						},
						loop: true,
						autoplay: false
					});
					
					$(this).children('.tracknumberplaying').animateSprite('play', 'audioPlaying');
					$(this).children('.tracknumberplaying').animateSprite('restart');
					//$(this).children('.tracknumberplaying').animateSprite('fps', 12);
					//$(this).children('.tracknumberplaying').animateSprite('play', 'audioPlaying')
					
					if($('.currentlyplaying').children('.currenttracks').length > 1) {
						$('.nextbutton').addClass('nextenabled');
					}
					
				}
			});
			

			$( ".control-img-pause" ).click(function() {
					$('.track').each(function() {
						if($(this).hasClass('trackplaying')) {
							$(this).addClass('trackpaused');
							$(this).removeClass('trackplaying');
							$(this).children('.tracknumber').hide();
							$(this).children('.tracknumberplay').removeClass('trackplayimghide');
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').addClass('trackplayimghide');
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberpaused').addClass('trackplayimghide');
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberunpause').removeClass('trackplayimghide');
						}
					});
			});
				
			$( ".control-img-play" ).click(function() {
					$('.track').each(function() {
						if($(this).hasClass('trackpaused')) {
							$(this).addClass('trackplaying');
							$(this).removeClass('trackpaused');
							$(this).children('.tracknumber').hide();
							$(this).children('.tracknumberplay').removeClass('trackplayimghide');
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').removeClass('trackplayimghide');
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberpaused').addClass('trackplayimghide');
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberunpause').addClass('trackplayimghide');
						}
					});
			});
			
			$('.track').each(function() {
				trackcount += 1;
			});
			
			$('.track.notplaying').each(function() {
				tracksnotplaying += 1;
			});
			
			
			if(trackcount == tracksnotplaying) {
				if($('.playerstate').text() == "playing") {
					var playingartist = $('.currenttracks.playing').children('.currentartist').text();
					var playingtitle = $('.currenttracks.playing').children('.currenttitle').text();
					$('.track').each(function() {
						if(artist == playingartist && $(this).children('.tracktitle').text() == playingtitle) {
							$(this).addClass('trackplaying');
							$(this).removeClass('notplaying');
							$(this).children('.tracknumber').hide();
							$(this).children('.tracknumberplay').removeClass('trackplayimghide');
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').removeClass('trackplayimghide');
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').removeClass('trackplayimghide');
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').animateSprite({
								fps: 12,
								animations: {
									audioPlaying: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1]
								},
								loop: true,
								autoplay: false
							});
							
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').animateSprite('play', 'audioPlaying');
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').animateSprite('restart');
						}
					});
				}
				if($('.playerstate').text() == "paused") {
					var playingartist = $('.currenttracks.paused').children('.currentartist').text();
					var playingtitle = $('.currenttracks.paused').children('.currenttitle').text();
					$('.track').each(function() {
						if(artist == playingartist && $(this).children('.tracktitle').text() == playingtitle) {
							$(this).addClass('trackpaused');
							$(this).removeClass('notplaying');
							$(this).children('.tracknumber').hide();
							$(this).children('.tracknumberplay').removeClass('trackplayimghide');
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').removeClass('trackplayimghide');
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').animateSprite({
								fps: 12,
								animations: {
									audioPlaying: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1]
								},
								loop: true,
								autoplay: false
							});
							
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').animateSprite('play', 'audioPlaying');
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberplaying').animateSprite('restart');
							$(this).children('.tracknumberplay').children('.tracknumberplayimg').children('.tracknumberunpause').removeClass('trackplayimghide');
						}
					});
				}
			}
			
		});
	
	
	//$.when(ajax1(artist, album)).done(function(){
    // the code here will be executed when all four ajax requests resolve.
    // a1, a2, a3 and a4 are lists of length 3 containing the response text,
    // status, and jqXHR object for each of the four ajax calls respectively.
		//$('.albumpage').removeClass("albumpageloading");
	//});
		

		//alert(artist.replace(regex, " " + '+' + " "))
		//console.log(this.get('artist'));
		//console.log(this.get('album'));
		
	},
	actions: {
		playthis: function() {
			alert("Called It");
		}
	}
});

//get info from my api first
function ajax1(artist, album) {
	var ytvidartist = artist;
	var tracklisturl = "http://10.0.0.1:8000/album?artist=" + encodeURIComponent(artist) + "&album=" + encodeURIComponent(album);
	return $.ajax({
			type: 'GET',
			url: tracklisturl,
			async: true,
			contentType: "application/json",
			dataType: 'json',
			success: function(json) {
				//$('.albumtracklist').text(json.result.tracklist);
				if(json.result != null) {
					//console.log(json.result[0]);
					$.each(json.result.tracklist, function(index, value) {
						var tracknumber = JSON.stringify(value.track_position);
						var tracktitle = JSON.stringify(value.track_title);
						var ytvidurl = "http://10.0.0.1:8000/video?artist=" + encodeURIComponent(ytvidartist) + "&title=" + encodeURIComponent(tracktitle);
						if(value.track_duration) {
							var trackduration = JSON.stringify(value.track_duration);
							var trackplays = JSON.stringify(value.playcount);
							var tracklikes = JSON.stringify(value.likecount);
							var trackdislikes = JSON.stringify(value.dislikecount);
							var trackvideoid = JSON.stringify(value.videoid);
							if (!trackplays && !tracklikes && !trackdislikes && !trackvideoid) {
								trackplays = 0;
								tracklikes = 0;
								trackdislikes = 0;
								trackvideoid = 'none';
							}
							if (trackplays) {
								trackplays = parseInt(trackplays.replace(/\"/g, ""));
								trackplays = trackplays.toLocaleString('en');
							}
							if (!tracklikes) {
								tracklikes = 0;
							}
							if (tracklikes) {
								tracklikes = parseInt(tracklikes.replace(/\"/g, ""));
							}
							if (!trackdislikes) {
								trackdislikes = 0;
							}
							if (trackdislikes) {
								trackdislikes = parseInt(trackdislikes.replace(/\"/g, ""));
							}
							if (!trackplays) {
								trackplays = 0;
							}
							if (trackdislikes != 0 || !trackdislikes && tracklikes != 0 || !tracklikes) {
								var poppercinv = (trackdislikes / tracklikes) * 100;
								var popperc = 100 - poppercinv;
							}
							if (trackdislikes == 0 || trackdislikes == null && tracklikes != 0 || tracklikes != null) {
								var poppercinv = (trackdislikes / tracklikes) * 100;
								var popperc = parseInt(100 - poppercinv);
							}
							if (!trackdislikes || trackdislikes == 0 && !tracklikes || tracklikes == 0) {
								tracklikes = 0;
								trackdislikes = 0;
								var popperc = 0;
							}
							$('.albumtracklist').append('<div class="track notplaying"><div class="tracknumberplay trackplayimghide"><div class="tracknumberplayimg"><div class="tracknumberplaying trackplayimghide"></div><div class="tracknumberpaused trackplayimghide"></div><div class="tracknumberunpause trackplayimghide"></div></div></div><div class="tracknumber">' + tracknumber.replace(/\"/g, "") + '</div><div class="tracktitle">' + tracktitle.replace(/\"/g, "") + '</div><div class="trackduration">' + trackduration.replace(/\"/g, "") + '</div><div class="trackpopularity"><progress class="trackpopprogress" max="100" value="' + popperc + '"></progress></div><div class="trackplays">' + trackplays + '</div><div class="trackvideoid">' + trackvideoid.replace(/\"/g, "") + '</div></div>');
						}
						else {
							var trackplays = JSON.stringify(value.playcount);
							var tracklikes = JSON.stringify(value.likecount);
							var trackdislikes = JSON.stringify(value.dislikecount);
							var trackvideoid = JSON.stringify(value.videoid);
							if (!trackplays && !tracklikes && !trackdislikes && !trackvideoid) {
								trackplays = 0;
								tracklikes = 0;
								trackdislikes = 0;
								trackvideoid = 'none';
							}
							if (trackplays) {
								trackplays = parseInt(trackplays.replace(/\"/g, ""));
								trackplays = trackplays.toLocaleString('en');
							}
							if (tracklikes) {
								tracklikes = parseInt(tracklikes.replace(/\"/g, ""));
							}
							if (trackdislikes) {
								trackdislikes = parseInt(trackdislikes.replace(/\"/g, ""));
							}
							if (!trackplays) {
								trackplays = 0;
							}
							if (trackdislikes != 0 || trackdislikes != null && tracklikes != 0 || tracklikes != null) {
								var poppercinv = (trackdislikes / tracklikes) * 100;
								var popperc = 100 - poppercinv;
							}
							if (trackdislikes == 0 || trackdislikes == null && tracklikes != 0 || tracklikes != null) {
								var poppercinv = (trackdislikes / tracklikes) * 100;
								var popperc = parseInt(100 - poppercinv);
							}
							if (!trackdislikes || trackdislikes == 0 && !tracklikes || tracklikes == 0) {
								tracklikes = 0;
								trackdislikes = 0;
								var popperc = 0;
							}
							$('.albumtracklist').append('<div class="track notplaying"><div class="tracknumberplay trackplayimghide"><div class="tracknumberplayimg"><div class="tracknumberplaying trackplayimghide"></div><div class="tracknumberpaused trackplayimghide"></div><div class="tracknumberunpause trackplayimghide"></div></div></div><div class="tracknumber">' + tracknumber.replace(/\"/g, "") + '</div><div class="tracktitle">' + tracktitle.replace(/\"/g, "") + '</div><div class="trackduration">Unknown</div><div class="trackpopularity"><progress class="trackpopprogress" max="100" value="' + popperc + '"></progress></div><div class="trackplays">' + trackplays + '</div><div class="trackvideoid">' + trackvideoid.replace(/\"/g, "") + '</div></div>');
						}
						$.ajax({
							url: ytvidurl,
							type: 'GET',
							success: function(json){
								if(json.result != null) {
									console.log('Retrieved video id from ');
								}
							},
							error: function() {
								//I dont have the image locally so get it from external source
								//ajax2(artist, album).done(function(){
								//$('.albumpage').removeClass("albumpageloading");
								console.log('Error do something here');
								//});
							}
						});
						
					});
					//$('.albumpage').removeClass("albumpageloading");
						/* var bcode = json.result.barcode;
						var bcodenos = bcode.replace(/\s/g, '');
						var bcodenod = bcodenos.replace("-", '');
						var bcodetourl = bcodenod.match(/.{1,4}/g);
						var imgurl = bcodetourl.join('/');
						//console.log(bcodenod);
						//console.log(imgurl + "/" + bcodenod + ".jpg");
						var locimgurl = "http://localhost:4200/coverart/" + imgurl + '/' + bcodenod + '.jpg';
						
						$.ajax({
							url: locimgurl,
							type: 'GET',
							success: function(){ 
								$('.albumimgsrc').attr('src', locimgurl);
								$('.albumpage').removeClass("albumpageloading");
								console.log('Retrieved image from local');
							},
							error: function() {
								//I dont have the image locally so get it from external source
								ajax2(artist, album).done(function(){
									 $('.albumpage').removeClass("albumpageloading");
									 console.log('Retrieving from external');
								});
							}
						}); */
					
				}
			},
			error: function(e) {
				console.log(e.message);
			}
		});
}

function ajax2(artist, album) {
	var url = "https://itunes.apple.com/search?term=" + artist + "+" + album + "&country=US&media=music&entity=album&limit=1";
	return $.ajax({
			type: 'GET',
			url: url,
			async: true,
			jsonpCallback: 'jsonCallback',
			contentType: "application/json",
			dataType: 'jsonp',
			success: function(json) {
				var coverurl = json.results[0].artworkUrl100;
				var largercover = coverurl.replace("100x100bb.jpg", "400x400bb.jpg");
				$('.albumimgsrc').attr('src', largercover);
				//tell server to get and save the image
				var albumimgurl = "http://10.0.0.1:8000/albumimg?artist=" + artist + "&album=" + album;
					$.ajax({
						url: albumimgurl,
						type: 'GET',
						success: function(){ 
						},
						error: function() {
						}
					});
			},
			error: function(e) {
				console.log(e.message);
			}
		});
}

function ajaxvideoid(artist, album) {


}
