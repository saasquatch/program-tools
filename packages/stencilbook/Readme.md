# Stencilbook

A storybook inspired development environment for Stencil. Uses the [Component Story Format (CSF)](https://storybook.js.org/docs/web-components/api/csf) for portability but relies on the Stencil compiler to do all the lazy loading and bundling of imports.

## Usage

```
npm i @saasquatch/stencilbook
```

```js
import { withHooks } from "@saasquatch/stencil-hooks";
import { useStencilbook } from "@saasquatch/stencilbook";

// Import your stories here. Stencilbook doesn't auto-discover stories
import * as Footer from "../../stories/Footer.stories";
import * as Banner from "../../stories/Banner.stories";

const stories = [Banner, Footer];

@Component({
  tag: "customers-stencilbook",
})
export class Component {
  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}
  render() {
    return useStencilbook(stories);
  }
}
```
