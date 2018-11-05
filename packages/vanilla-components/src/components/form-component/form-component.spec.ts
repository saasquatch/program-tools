import { render } from '@stencil/core/testing';
import { FormComponent } from './form-component';

describe('my-app', () => {
  it('should build', () => {
    expect(new FormComponent()).toBeTruthy();
  });

  describe('rendering', () => {
    beforeEach(async () => {
      await render({
        components: [FormComponent],
        html: '<form-component></form-component>'
      });
    });
  });
});