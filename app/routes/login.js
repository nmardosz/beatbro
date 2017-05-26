import Ember from 'ember';
var $ = Ember.$;

export default Ember.Route.extend({
	actions: {
		gotopage: function(artist, album) {
			var route = this;
			var prevroute = $('.loginfrom').val();
			route.transitionTo(prevroute);
		}
	}
});
