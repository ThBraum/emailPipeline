import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class DashboardSentRoute extends Route {
  @service('email-service') emailService;

  @tracked emails = [];
  @tracked selectedEmail = null;
  @tracked selectedEmailDetails = '';

  async model() {
    this.emails = await this.emailService.getSentEmails();
    return this.emails;
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.emails = this.emails;
    controller.selectedEmail = this.selectedEmail;
    controller.selectedEmailDetails = this.selectedEmailDetails;
    controller.refresh = this.refresh.bind(this);
    controller.viewDetails = this.viewDetails.bind(this);
  }

  @action
  async refresh() {
    this.emails = await this.emailService.getSentEmails();
    this.controller.emails = this.emails;
  }

  @action
  async viewDetails(id) {
    this.selectedEmail = id;
    const details = await this.emailService.getEmailDetails(id);
    this.selectedEmailDetails = JSON.stringify(details, null, 2);
    this.controller.selectedEmail = this.selectedEmail;
    this.controller.selectedEmailDetails = this.selectedEmailDetails;
  }
}
