import Service from '@ember/service';

export default class SnackbarService extends Service {
  show(message, ms = 4000) {
    const sn = document.querySelector('.snackbar');
    if (sn && sn.__glimmerComponent__) {
      sn.__glimmerComponent__.show(message, ms);
    }
  }
}
