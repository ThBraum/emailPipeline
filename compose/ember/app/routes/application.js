import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service emailService;
  @service router;

  async beforeModel() {
    try {
      const ok = await this.emailService.checkAuth();
      if (ok) {
        this.router.transitionTo('dashboard.received');
      }
    } catch (e) {}
  }
}
