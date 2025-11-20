import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class SnackbarService extends Service {
  @tracked visible = false;
  @tracked message = '';
  hideTimeout = null;

  show(message, ms = 4000) {
    this.message = message;
    this.visible = true;
    if (this.hideTimeout) { clearTimeout(this.hideTimeout); }
    this.hideTimeout = setTimeout(() => { this.visible = false; }, ms);
  }

  hide() {
    this.visible = false;
    if (this.hideTimeout) { clearTimeout(this.hideTimeout); this.hideTimeout = null; }
  }
}
