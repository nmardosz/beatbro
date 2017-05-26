import Ember from 'ember';
var $ = Ember.$;


export default Ember.Component.extend({
	didInsertElement: function() {
		$('.pageloader').removeClass('pageloaderhidden');
		$('.pageloaderanim').animateSprite({
			columns: 1,
			fps: 15,
			animations: {
				albumLoading: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
			},
			loop: true,
			autoplay: false
		});
		$('.pageloaderanim').animateSprite('play', 'albumLoading');
		var thiscontext = this;
		//if($(".popularalbumsgrid").hasClass( "populargridnotloaded" )) {
		//	alert("loading");
		$.ajax({
			url: "static/html/popularalbums.html",
			cache: true
			}).done(function( html ) {
				$( ".popularalbumsgrid" ).append( html );
				$('.pageloaderanim').animateSprite('stop');
				$('.pageloader').addClass("pageloaderhidden");
		//		$(".popularalbumsgrid").removeClass( "populargridnotloaded" )
				$( ".albumimage" ).click(function() {
					//alert( $(this).attr("data-artist") );
					var clickedartist = $(this).attr("data-artist");
					var clickedalbum = $(this).attr("data-album");
					if(clickedartist == "Soundtrack" || clickedartist == "soundtrack") {
						clickedartist = "various";
					}
					clickedartist = clickedartist.replace("#", "%23");
					clickedalbum = clickedalbum.replace("#", "%23");
					clickedartist = clickedartist.replace("/", "%2f");
					clickedalbum = clickedalbum.replace("/", "%2f");
					clickedalbum = clickedalbum.replace(/ *\([^)]*\) */g, "");
					thiscontext.sendAction('complete', clickedartist, clickedalbum);
				});
			});
				//gotoalbum();
				//alert(this);
			//$( ".popularalbumsgrid" ).load( "static/html/popularalbums.html", function() {
				//localStorage.setItem("popularalbumsloaded", "true");
				//$( ".albumimage" ).click(function() {
					//alert( $(this).attr("data-artist") );
					//thiscontext.triggerAction({
					//action:'recenter',
					//target: thiscontext
					//});
				//});
		//$( ".slim-scroller" ).load( "static/html/popularalbums.html", function() {
   },
   actions: {
		gotoalbum: function() {
			this.sendAction('complete', );
		}
   }
});
