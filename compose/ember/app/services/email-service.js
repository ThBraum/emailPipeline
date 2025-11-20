import Service from '@ember/service';

const API_BASE =
  (typeof importMeta !== 'undefined' && importMeta.env?.VITE_EMAIL_API_URL) ||
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_EMAIL_API_URL) ||
  '/';

export default class EmailService extends Service {
  apiBase = API_BASE;

  async request(path, options = {}) {
    let response;

    try {
      response = await fetch(`${this.apiBase}${path}`, {
        credentials: 'include',
        headers: {
          Accept: 'application/json, text/plain, */*',
          ...(options.headers || {}),
        },
        ...options,
      });
    } catch (cause) {
      const err = new Error('Network error');
      err.isNetworkError = true;
      err.cause = cause;
      throw err;
    }

    if (response.status === 401 || response.status === 403) {
      const text = await response.text().catch(() => '');
      const err = new Error(`HTTP ${response.status}: ${text}`);
      err.status = response.status;
      err.isUnauthorized = true;
      throw err;
    }

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      const err = new Error(`HTTP ${response.status}: ${text}`);
      err.status = response.status;
      throw err;
    }

    const contentType =
      response && response.headers && typeof response.headers.get === 'function'
        ? response.headers.get('content-type') || ''
        : '';

    if (contentType.includes('application/json')) {
      return response.json();
    }

    try {
      return response.json();
    } catch (e) {
      return response.text();
    }
  }

  // --- Emails ---

  async sendEmail(payload) {
    return this.request('/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  }

  async getSentEmails() {
    return this.request('/emails/sent');
  }

  async getEmailDetails(id) {
    return this.request(`/emails/${id}`);
  }

  async syncReceivedEmails() {
    return this.request('/emails/sync-received', { method: 'POST' });
  }

  async getReceivedEmails() {
    return this.request('/emails/received');
  }



  login() {
    let target;
    try {
      const base = (this.apiBase || '/').replace(/\/+$/, '');
      if (base.startsWith('http://') || base.startsWith('https://')) {
        const safeBase = base.replace('host.docker.internal', 'localhost');
        target = `${safeBase}/auth/google`;
      } else {
        const proto = window.location.protocol || 'http:';
        const host = 'localhost';
        target = `${proto}//${host}:8080/auth/google`;
      }
    } catch (e) {
      target = `${window.location.protocol}//localhost:8080/auth/google`;
    }

    window.location.href = target;
  }

  logout() {
    return this.request('/auth/logout');
  }

  async checkAuth() {
    try {
      await this.request('/health');
      return true;
    } catch (err) {
      if (err.isUnauthorized) {
        return false;
      }
      return false;
    }
  }
}
