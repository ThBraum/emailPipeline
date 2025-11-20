import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class UserProfileComponent extends Component {
  @service('email-service') emailService;

  get user() {
    return this.emailService.currentUser;
  }
}
