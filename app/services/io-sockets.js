import Ember from 'ember';
var $ = Ember.$;

export default Ember.Service.extend({
socketinit(sockettoken){
		var socket = io.connect('http://10.0.0.3:9000/');
		socket.on('connect', function () {
                     socket.on('authenticated', function () {
                       console.log('authenticated');
                       console.log("success hosting");
                       $('.hostingindicator').css('display', 'block');
                       $('.host-settings').css('display', 'none');
                       //document.cookie = 'socket=' + socket.io.engine.id + '; expires=Fri, 3 Aug 2070 20:47:11 UTC; path=/'
                     })
                     .emit('authenticate', {token: sockettoken}); // send the jwt
                   });
}
});
