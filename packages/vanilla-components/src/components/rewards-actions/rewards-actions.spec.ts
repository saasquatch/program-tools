import { render } from '@stencil/core/testing';
import { RewardsActions } from './rewards-actions';

describe('my-app', () => {
  it('should build', () => {
    expect(new RewardsActions()).toBeTruthy();
  });

  describe('rendering', () => {
    beforeEach(async () => {
      await render({
        components: [RewardsActions],
        html: '<rewards-actions></rewards-actions>'
      });
    });
  });
});