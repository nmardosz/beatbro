import Ember from 'ember';

export default Ember.Route.extend({
	//model() {
	//	return this.store.findAll('rental');
	//}
	beforeModel() {
		this.transitionTo('popular-albums');
	},
	actions: {
		complete: function() {
			var route = this;
			//$( ".slim-scroller" ).unload("static/html/popularalbums.html");
			route.transitionTo('about');
			//alert('Triggered complete!');
		}
	}
});
