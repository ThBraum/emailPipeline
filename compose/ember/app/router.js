import EmberRouter from '@embroider/router';
import config from 'email-frontend/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('login');
  this.route('dashboard', { path: '/' }, function () {
    this.route('send');
    this.route('sent');
    this.route('received');
  });
});
