import { render } from '@stencil/core/testing';
import { ReferralCode } from './referral-code';

describe('my-app', () => {
  it('should build', () => {
    expect(new ReferralCode()).toBeTruthy();
  });

  describe('rendering', () => {
    beforeEach(async () => {
      await render({
        components: [ReferralCode],
        html: '<sqh-referral-code></sqh-referral-code>'
      });
    });
  });
});