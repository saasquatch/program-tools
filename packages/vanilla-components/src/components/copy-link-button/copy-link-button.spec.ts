import { render } from '@stencil/core/testing';
import { CopyLinkButton } from './copy-link-button';

describe('my-app', () => {
  it('should build', () => {
    expect(new CopyLinkButton()).toBeTruthy();
  });

  describe('rendering', () => {
    beforeEach(async () => {
      await render({
        components: [CopyLinkButton],
        html: '<sqh-copy-link-button></sqh-copy-link-button>'
      });
    });
  });
});