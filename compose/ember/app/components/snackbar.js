import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class SnackbarComponent extends Component {
  @service snackbar;

  @action
  hide() {
    this.snackbar.hide();
  }
}
