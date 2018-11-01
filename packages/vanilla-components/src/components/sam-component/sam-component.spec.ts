import { render } from '@stencil/core/testing';
import { SamComponent } from './sam-component';

describe('my-app', () => {
  it('should build', () => {
    expect(new SamComponent()).toBeTruthy();
  });

  describe('rendering', () => {
    beforeEach(async () => {
      await render({
        components: [SamComponent],
        html: '<sam-component></sam-component>'
      });
    });
  });
});