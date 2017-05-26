import Ember from 'ember';
var $ = Ember.$;

export default Ember.Component.extend({
	didInsertElement: function() {
		var thiscontext = this;
		var typingTimer;                //timer identifier
		var doneTypingInterval = 1250;  //time in ms, 5 second for example
		var searchbox = $('.topsearch');
		var start;
		$( ".topsearch" ).keyup(function() {
			if ($(".topsearch").val().length >= 2) {
				if (!$('.searchcontent').hasClass('searchcontenthidden')) {
					$('.searchcontent').addClass('searchcontenthidden');
				}
				if (!$('.searchartistarea').hasClass('searchartisthidden')) {
					$('.searchartistarea').addClass('searchartisthidden');
				}
				if (!$('.searchsongarea').hasClass('searchsonghidden')) {
					$('.searchsongarea').addClass('searchsonghidden');
				} 
				if (!$('.searchalbumarea').hasClass('searchalbumhidden')) {
					$('.searchalbumarea').addClass('searchalbumhidden');
				}
				if (!$('.searchartistheading').hasClass('searchartistheadinghidden')) {
					$('.searchartistheading').addClass('searchartistheadinghidden')
				}
				if (!$('.searchsongheading').hasClass('searchsongheadinghidden')) {
					$('.searchsongheading').addClass('searchsongheadinghidden')
				}
				if (!$('.searchalbumheading').hasClass('searchalbumheadinghidden')) {
					$('.searchalbumheading').addClass('searchalbumheadinghidden')
				}
				$('.searchwaiting').css('display', 'block');
				$('.searchclear').removeClass('clearablehidden');
				$('.searchclear').addClass('clearable');
				$('.searcharea').removeClass('searchareahidden');
				$('.searcharea').animate({"width": 362}, {duration: 300, complete: function() {
						//$('.searchcontent').removeClass('searchcontenthidden');
						$('.searcharea').css('border-right', '2px solid #1e2800');
				}});
				clearTimeout(typingTimer);
				typingTimer = setTimeout(doneTyping, doneTypingInterval);
			}
			if ($(".topsearch").val().length < 2) {
				$('.searchclear').removeClass('clearable');
				$('.searchclear').addClass('clearablehidden');
				$('.searcharea').animate({"width": 0}, {duration: 300, complete: function() {
						$('.searchcontent').addClass('searchcontenthidden');
						$('.searcharea').css('border-right', '0');
				}});
			}
		});
		$( ".topsearch" ).keydown(function() {
			clearTimeout(typingTimer);
		});
		$( ".topsearch" ).click(function() {
			if ($(".topsearch").val().length >= 2) {
				$('.searcharea').animate({"width": 362}, {duration: 300, complete: function() {
						$('.searchcontent').removeClass('searchcontenthidden');
						$('.searcharea').css('border-right', '2px solid #1e2800');
				}});
			}
		});
		$(".searchclear").click(function() {
			$('.topsearch').val("");
			$('.searchclear').removeClass('clearable');
			$('.searchclear').addClass('clearablehidden');
			$('.searcharea').animate({"width": 0}, {duration: 300});
		});
		$(document).click(function(e) {
			var target = e.target;

			if (!$(target).is('.topsearch') && !$(target).is('.searcharea') && !$(target).parents().is('.searcharea')) {
				$('.searcharea').animate({"width": 0}, {duration: 300, complete: function() {
						$('.searcharea').css('border-right', '0');
						$('.searchcontent').addClass('searchcontenthidden');
					}});
			}
		});
		$('.searchsongarea').on("click", ".searchsong", function() {
			var clickedsearchalbum = $(this).children('.searchsongalbum').val();
			var clickedsearchartist = $(this).children('.searchsongartist').val();
			var clickedsearchsong = $(this).children('.searchsongsong').val();
			$('.clickedsongtitle').val(clickedsearchsong);
			thiscontext.sendAction('gotoalbum', clickedsearchartist, clickedsearchalbum);
		});
		$('.searchalbumarea').on("click", ".searchalbum", function() {
			var clickedsearchalbum = $(this).children('.searchalbumalbum').val();
			var clickedsearchartist = $(this).children('.searchalbumartist').val();
			$('.clickedsongtitle').val("");
			thiscontext.sendAction('gotoalbum', clickedsearchartist, clickedsearchalbum);
		});
	}
});

function doneTyping () {
	var searchterm = $(".topsearch").val();
	var searchurl = "http://10.0.0.1:8000/search?q=" + searchterm;
	return $.ajax({
			type: 'GET',
			url: searchurl,
			async: true,
			contentType: "application/json",
			dataType: 'json',
			success: function(json) {
				//$('.albumtracklist').text(json.result.tracklist);
				if(json != null) {
					//console.log(json.result[0]);
					$('.searchartistarea').empty();
					$('.searchsongarea').empty();
					$('.searchalbumarea').empty();
					$('.searchwaiting').css('display', 'none');
					$('.searchcontent').removeClass('searchcontenthidden');
					$.each(json.result.results, function(index, value) {
						if(value["artist"]) {
							$('.searchartistheading').removeClass('searchartistheadinghidden');
							$('.searchartistarea').removeClass('searchartisthidden');
							$('.searchartistarea').append('<div class="searchartist">' + value["artist"][0].artist + '<input type="hidden" class="searchartistartist" value="' + value["artist"][0].artist + '"></div>');
							resultsReady();
						}
						if(value["song"]) {
							$('.searchsongheading').removeClass('searchsongheadinghidden');
							$('.searchsongarea').removeClass('searchsonghidden');
							$('.searchsongarea').append('<div class="searchsong">' + value["song"][0].song + '<br>' + value["song"][0].artist + '<input type="hidden" class="searchsongsong" value="' + value["song"][0].song + '"><input type="hidden" class="searchsongartist" value="' + value["song"][0].artist + '"><input type="hidden" class="searchsongalbum" value="' + value["song"][0].album + '"></div>');
						}
						if(value["album"]) {
							$('.searchalbumheading').removeClass('searchalbumheadinghidden');
							$('.searchalbumarea').removeClass('searchalbumhidden');
							$('.searchalbumarea').append('<div class="searchalbum">' + value["album"][0].album + '<br>' + value["album"][0].artist + '<input type="hidden" class="searchalbumalbum" value="' + value["album"][0].album + '"><input type="hidden" class="searchalbumartist" value="' + value["album"][0].artist + '"></div>');
						}
						//$('.searchcontent').append(value["artist"]);
						//obj[Object.keys(obj)[0]]
						//$('.searchcontent').append(JSON.stringify(value));
						//if (value[0].artist) {
						//	$('.searchcontent').append(JSON.stringify(value[0]));
						//}
					});
				}
			},
			error: function(e) {
				console.log(e.message);
			}
		});
  //alert("Done Typing");
}

function resultsReady () {
	$('.searchalbumarea').children('.searchalbum').click(function(thisalbum) {
		alert("hello");
		////	//var clickedsearchalbum = thisalbum.target;
		//alert(clickedsearchalbum);
	});
}