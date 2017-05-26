import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('about');
  this.route('contact');
  this.route('album', { path: '/album/:album_artist/:album_title' });
  this.route('popular-albums');
  this.route('new-releases');
  this.route('top-50');
  this.route('popular-genres');
  this.route('signup');
  this.route('login');
  this.route('remote');
});

export default Router;
