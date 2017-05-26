import Ember from 'ember';

export default Ember.Route.extend({
	actions: {
		complete: function(artist, album) {
			var route = this;
			//$( ".slim-scroller" ).unload("static/html/popularalbums.html");
			//alert('Triggered complete!');
			artist = artist.replace(/\s+/g, '+');
			album = album.replace(/\s+/g, '+');
			route.transitionTo('album', artist, album);
		}
	}
});
