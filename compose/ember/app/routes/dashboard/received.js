import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class DashboardReceivedRoute extends Route {
  @service emailService;
  @service router;

  async model() {
    try {
      return await this.emailService.getReceivedEmails();
    } catch (e) {
      console.error('Erro ao buscar emails recebidos:', e);
      this.router.transitionTo('login');
      return [];
    }
  }
}
