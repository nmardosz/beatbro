import Ember from 'ember';
var $ = Ember.$;

export default Ember.Component.extend({
	didInsertElement: function() {
			$('.slim-scroller').slimScroll({
				height: '100%',
				disableFadeOut: true,
				color: '#535357',
				size: '8px'
			});
			//$('.slim-scroller').slimScroll().bind('slimscroll', function(e, pos){
			//	alert("Reached " + pos);
			//});
	}
});
