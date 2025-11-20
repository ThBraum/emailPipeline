import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | email-service', function(hooks) {
  setupTest(hooks);

  test('sendEmail posts and returns JSON on success', async function(assert) {
    const service = this.owner.lookup('service:email-service');

    // stub fetch
    const fakeResponse = { id: '123', status: 'queued' };
    window.fetch = async (url, options) => {
      assert.ok(url.endsWith('/emails'), 'calls correct endpoint');
      assert.equal(options.method, 'POST', 'uses POST');
      return {
        ok: true,
        json: async () => fakeResponse
      };
    };

    const res = await service.sendEmail({ to: 'a@b.com', subject: 'x', body: 'y' });
    assert.deepEqual(res, fakeResponse, 'returns parsed JSON');
  });

  test('request throws on non-ok response', async function(assert) {
    const service = this.owner.lookup('service:email-service');

    window.fetch = async () => ({ ok: false, status: 401, text: async () => 'unauthorized' });

    try {
      await service.getSentEmails();
      assert.ok(false, 'should have thrown');
    } catch (err) {
      assert.ok(err.message.includes('HTTP 401'), 'error contains status');
      assert.equal(err.status, 401, 'status preserved on error');
    }
  });
});
