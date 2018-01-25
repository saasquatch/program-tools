import { render } from '@stencil/core/testing';
import { TextComponent } from './text-component';

describe('my-app', () => {
  it('should build', () => {
    expect(new TextComponent()).toBeTruthy();
  });

  describe('rendering', () => {
    beforeEach(async () => {
      await render({
        components: [TextComponent],
        html: '<text-component></text-component>'
      });
    });
  });
});