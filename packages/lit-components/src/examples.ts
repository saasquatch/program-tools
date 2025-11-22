import { CounterComponent } from './index';

/**
 * Example usage of Lit Components
 * 
 * This demonstrates how to use the web components from this library.
 */

// Example 1: Using in HTML with custom attributes
const example1 = `
<html>
  <head>
    <script type="module" src="./dist/index.js"><\/script>
  </head>
  <body>
    <lit-counter title="My Counter" counter="5"><\/lit-counter>
  </body>
</html>
`;

// Example 2: Using with JavaScript
const example2 = () => {
  // The component auto-registers as 'lit-counter' custom element
  const counter = document.createElement('lit-counter');
  counter.setAttribute('title', 'My Counter');
  counter.setAttribute('counter', '10');
  document.body.appendChild(counter);
};

// Example 3: Importing and re-exporting in your own components
export { CounterComponent };

console.log('Lit Components examples loaded');
