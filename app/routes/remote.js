import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    login: function() {
			var route = this;
			//alert(prevpage);
			route.transitionTo('login');
		}
  }
});
