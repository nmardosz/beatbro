import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params) {
		return {
			//album_artist: params.album_artist,
			artist: decodeURIComponent(params.album_artist),
			album: decodeURIComponent(params.album_title)
		};
	}
});