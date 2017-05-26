import Ember from 'ember';

export function isAuthed() {
	var userToken = document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	if (userToken) {
		return "authed";
	}
}

export default Ember.Helper.helper(isAuthed);