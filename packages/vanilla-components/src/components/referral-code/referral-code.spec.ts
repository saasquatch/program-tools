import { render } from '@stencil/core/testing';
import { TextComponent } from './referral-code';

describe('my-app', () => {
  it('should build', () => {
    expect(new TextComponent()).toBeTruthy();
  });

  describe('rendering', () => {
    beforeEach(async () => {
      await render({
        components: [TextComponent],
        html: '<sqh-referral-code></sqh-referral-code>'
      });
    });
  });
});