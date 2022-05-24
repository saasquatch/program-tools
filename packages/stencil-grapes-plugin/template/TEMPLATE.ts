import { GrapesJSModel } from "../dist/generator";

/**
 * Provided by the generator
 */
declare const components: GrapesJSModel[];

type GrapesJSEditor = any;
export default (editor: GrapesJSEditor, config = {}) => {
  // Get DomComponents module
  const comps = editor.DomComponents;

  // Get the model and the view from the default Component type
  const defaultType = comps.getType("default");
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  function registerComponent({ tag, name, traits, uiSchema }: GrapesJSModel) {
    comps.addType(tag.toLowerCase(), {
      model: defaultModel.extend(
        {
          defaults: Object.assign({}, defaultModel.prototype.defaults, {
            name: name,
            // can be dropped only inside
            draggable: false,
            // these components can be dropped in here
            droppable: false,
            selectable: true,
            toolbar: [],
            traits: traits,
            uiSchema: uiSchema,
          }),
        },
        {
          isComponent: function (el: HTMLElement) {
            if (el.tagName === tag.toUpperCase()) {
              return { type: tag.toLowerCase() };
            }
          },
        }
      ),
      view: defaultView.extend({
        render: function () {
          defaultView.prototype.render.apply(this, arguments);
          return this;
        },
      }),
    });
  }
  if (!components) {
    throw new Error(
      "Error registering components. This is likely due to a build problem in the source library. See GrapesJS generator.ts"
    );
  }
  components.forEach(registerComponent);
};
