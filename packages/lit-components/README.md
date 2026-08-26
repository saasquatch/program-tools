# @saasquatch/lit-components

A high-performance web components library built with **Lit** and **Haunted** for modern, reactive component development.

## Features

- ⚡ **Lit** - Fast, lightweight web components with no overhead
- 👻 **Haunted** - Functional state management with hooks for web components
- 📦 **Vite** - Lightning-fast build tool and dev server
- 🎯 **TypeScript** - Full type safety and excellent IDE support
- 📚 **Tree-shakeable** - Only ship what you use
- 🌍 **Fully compatible** - Works with any framework or vanilla JS

## Installation

```bash
npm install @saasquatch/lit-components
```

Or with yarn:

```bash
yarn add @saasquatch/lit-components
```

## Quick Start

### Usage in HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <script type="module">
      import '@saasquatch/lit-components';
    </script>
  </head>
  <body>
    <lit-counter title="Counter Demo" counter="0"></lit-counter>
  </body>
</html>
```

### Usage in JavaScript/TypeScript

```typescript
import { CounterComponent } from '@saasquatch/lit-components';

// Create and customize the component
const counter = document.createElement('lit-counter');
counter.setAttribute('title', 'My Counter');
counter.setAttribute('counter', '5');

document.body.appendChild(counter);
```

### Usage in React

```jsx
import '@saasquatch/lit-components';

export function App() {
  return (
    <div>
      <lit-counter 
        title="React Integration"
        counter="0"
      />
    </div>
  );
}
```

### Usage in Vue

```vue
<template>
  <div>
    <lit-counter 
      title="Vue Integration"
      :counter="count"
    />
  </div>
</template>

<script>
import '@saasquatch/lit-components';
import { ref } from 'vue';

export default {
  setup() {
    const count = ref(0);
    return { count };
  }
}
</script>
```

## Available Components

### CounterComponent (`<lit-counter>`)

A simple counter component demonstrating Lit and Haunted integration.

**Attributes:**
- `title` (string) - The title displayed above the counter
- `counter` (number) - The initial counter value

**Example:**
```html
<lit-counter title="My Counter" counter="10"></lit-counter>
```

## Development

### Install Dependencies

```bash
npm install
```

### Development Server

Start the development server with hot module reloading:

```bash
npm run dev
```

### Build

Build the library for production:

```bash
npm run build
```

Output files will be in the `dist/` directory.

### Type Check

Check TypeScript types without emitting files:

```bash
npm run type-check
```

### Lint

Lint TypeScript files:

```bash
npm run lint
```

### Format

Format code with Prettier:

```bash
npm run format
```

## Project Structure

```
src/
├── components/              # Web components
│   ├── CounterComponent.ts  # Example counter component
│   └── ...                  # Add more components here
├── index.ts                 # Entry point and exports
└── examples.ts              # Usage examples

dist/                        # Built output (generated)
├── index.js                 # Bundled JavaScript
├── index.d.ts              # TypeScript declarations
├── components/              # Component type definitions
└── ...

vite.config.ts              # Vite build configuration
tsconfig.json               # TypeScript configuration
package.json                # Package metadata
```

## Publishing to npm

1. Update the version in `package.json`:
   ```bash
   npm version minor
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Publish to npm:
   ```bash
   npm publish
   ```

## Creating New Components

### Step 1: Create a new component file

Create `src/components/MyComponent.ts`:

```typescript
import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';

export class MyComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  @property({ type: String }) title = 'Default Title';

  render() {
    return html`
      <h2>${this.title}</h2>
      <p>My custom component</p>
    `;
  }
}

customElements.define('my-component', MyComponent);
```

### Step 2: Export from index.ts

Update `src/index.ts`:

```typescript
export { CounterComponent } from './components/CounterComponent';
export { MyComponent } from './components/MyComponent';
```

### Step 3: Build and test

```bash
npm run build
npm run dev
```

## Browser Support

This library supports all modern browsers that support:
- Web Components
- ES2020+
- CSS Custom Properties

For older browser support, consider using polyfills.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Resources

- [Lit Documentation](https://lit.dev/)
- [Haunted Documentation](https://github.com/matthewp/haunted)
- [Web Components MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components)

