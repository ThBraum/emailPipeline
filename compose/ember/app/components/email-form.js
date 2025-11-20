import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class EmailFormComponent extends Component {
  @service('email-service') emailService;
  @service('snackbar-service') snackbar;
  @tracked to = '';
  @tracked subject = '';
  @tracked body = '';
  @tracked idempotencyKey = '';
  @tracked loading = false;
  @tracked errors = { to: null, subject: null, body: null };

  validate() {
    this.errors = { to: null, subject: null, body: null };
    const isEmail = (v) => /\S+@\S+\.\S+/.test(v);
    if (!this.to || !isEmail(this.to)) { this.errors.to = 'Endereço de e-mail inválido'; }
    if (!this.subject || this.subject.trim() === '') { this.errors.subject = 'Assunto obrigatório'; }
    if (!this.body || this.body.trim() === '') { this.errors.body = 'Mensagem obrigatória'; }
    return !(this.errors.to || this.errors.subject || this.errors.body);
  }

  @action
  async send(event) {
    event?.preventDefault?.();
    if (!this.validate()) {
      this.snackbar.show('Preencha todos os campos.');
      return;
    }

    this.loading = true;
    try {
      const payload = {
        to: this.to,
        subject: this.subject,
        body: this.body,
        idempotencyKey: this.idempotencyKey || undefined,
      };
      await this.emailService.sendEmail(payload);
      this.snackbar.show('Email enviado com sucesso!');
      this.to = '';
      this.subject = '';
      this.body = '';
      this.idempotencyKey = '';
    } catch (err) {
      this.snackbar.show('Erro ao enviar o email. Tente novamente.');
      console.error(err);
    } finally {
      this.loading = false;
    }
  }

  @action
  updateTo(event) {
    this.to = event.target.value;
  }

  @action
  updateSubject(event) {
    this.subject = event.target.value;
  }

  @action
  updateBody(event) {
    this.body = event.target.value;
  }

  @action
  updateIdempotencyKey(event) {
    this.idempotencyKey = event.target.value;
  }
}
