import grapesjs from 'grapesjs';
import loadComponents from './components';
import loadBlocks from './blocks';

export default grapesjs.plugins.add('vanilla-components-grapesjs-plugin', (editor, opts = {}) => {
  const options = { ...{
    // default options
  },  ...opts };

  // Add components
  loadComponents(editor, options);

  // Add blocks
  loadBlocks(editor, options);

  // TODO Remove
  editor.on('load', () => editor.addComponents(`<sqh-global-container>
  <sqh-text-component type='banner'></sqh-text-component>
  <sqh-text-component type='header'></sqh-text-component>
  <sqh-text-component type='body'></sqh-text-component>
  <sqh-copy-link-button></sqh-copy-link-button>
  <sqh-share-button-container></sqh-share-button-container>
  <sqh-stats-component></sqh-stats-component>
  <sqh-rewards-list></sqh-rewards-list>
  <sqh-text-component type='footer'></sqh-text-component>
  </sqh-global-container>
  <link rel="stylesheet" type="text/css" href="https://unpkg.com/@saasquatch/vanilla-components-assets@latest/icons.css"></link>`, { at: 0 }))
});
