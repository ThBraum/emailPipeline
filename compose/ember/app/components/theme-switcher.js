import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ThemeSwitcherComponent extends Component {
  @tracked current = 'light';

  constructor() {
    super(...arguments);
    try {
      this.current = window.localStorage.getItem('theme') || 'light';
      document.documentElement.setAttribute('data-theme', this.current);
    } catch (e) {
      this.current = 'light';
    }
  }

  @action
  toggle() {
    this.current = this.current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', this.current);
    try {
      window.localStorage.setItem('theme', this.current);
    } catch (e) {}
  }
}
