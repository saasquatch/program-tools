import { Component, h } from '@stencil/core';

@Component({
  tag: 'sq-docs',
  styleUrl: 'sq-docs.scss',
})
export class SqDocs {

  render() {
    return <div>
      <slot />
    </div>
  }
}
