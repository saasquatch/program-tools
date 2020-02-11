import { render } from '@stencil/core/testing';
import { ProgramComponent } from './program-component';

describe('my-app', () => {
  it('should build', () => {
    expect(new ProgramComponent()).toBeTruthy();
  });

  describe('rendering', () => {
    beforeEach(async () => {
      await render({
        components: [ProgramComponent],
        html: '<sqh-text-component></sqh-text-component>'
      });
    });
  });
});