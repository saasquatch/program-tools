import { render } from '@stencil/core/testing';
import { CTAComponent } from './cta-component';

describe('my-app', () => {
  it('should build', () => {
    expect(new CTAComponent()).toBeTruthy();
  });

  describe('rendering', () => {
    beforeEach(async () => {
      await render({
        components: [CTAComponent],
        html: '<sqh-cta-component></sqh-cta-component>'
      });
    });
  });
});