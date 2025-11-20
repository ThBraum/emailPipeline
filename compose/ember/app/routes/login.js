import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class LoginRoute extends Route {
  @service emailService;
  @service router;

  async beforeModel() {
    const isLoggedIn = await this.emailService.checkAuth();
    if (isLoggedIn) {
      this.router.transitionTo('dashboard');
    }
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.login = () => this.emailService.login();
  }
}
