import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service emailService;
  @service router;

  async beforeModel() {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    const tryLoadProfile = async () => {
      try {
        const profile = await this.emailService.getProfile();
        if (profile) {
          this.emailService.currentUser = profile;
          return profile;
        }
      } catch (e) {}
      return null;
    };

    try {
      const ok = await this.emailService.checkAuth();
      if (ok) {
        const profile = await tryLoadProfile();
        if (profile) {
          this.router.transitionTo('dashboard.received');
        }
        return;
      }

      // If we are on the OAuth callback route (served by nginx as /health)
      // the backend may set the cookie and the profile may become
      // available shortly. Try polling the profile endpoint a few times.
      const path = window.location.pathname || '';
      if (path === '/health' || path.startsWith('/auth')) {
        for (let i = 0; i < 6; i++) {
          const profile = await tryLoadProfile();
          if (profile) {
            this.router.transitionTo('dashboard.received');
            return;
          }
          await sleep(500);
        }
        // As a fallback, force a reload so browser sends cookies to backend.
        window.location.reload();
      }
    } catch (e) {}
  }
}
