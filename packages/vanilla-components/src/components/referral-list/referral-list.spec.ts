import { render } from '@stencil/core/testing';
import { ReferralList } from './referral-list';

describe('referral-list', () => {
  it('should build', () => {
    expect(new ReferralList()).toBeTruthy();
  });

  describe('rendering', () => {
    beforeEach(async () => {
      await render({
        components: [ReferralList],
        html: '<referral-list></referral-list>'
      });
    });
  });
});