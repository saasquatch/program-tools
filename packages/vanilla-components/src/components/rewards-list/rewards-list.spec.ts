import { render } from '@stencil/core/testing';
import { RewardsList } from './rewards-list';

describe('my-app', () => {
  it('should build', () => {
    expect(new RewardsList()).toBeTruthy();
  });

  describe('rendering', () => {
    beforeEach(async () => {
      await render({
        components: [RewardsList],
        html: '<sqh-rewards-list></sqh-rewards-list>'
      });
    });
  });
});