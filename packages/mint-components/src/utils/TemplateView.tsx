import { h } from "@stencil/core";
import marked from "marked";

export function TemplateView(props) {
  const { states, callbacks, readme } = props;

  return [
    <textarea
      style={{ width: "100%", height: "300px" }}
      onChange={(e: Event) =>
        callbacks.setEditedTemplate((e.target as HTMLInputElement).value)
      }
    >
      {states.editedTemplate}
    </textarea>,
    <button onClick={() => callbacks.setPreviewTemplate(states.editedTemplate)}>
      Update Preview
    </button>,
    readme ? (
      <details>
        <summary>Props readme</summary>
        <div innerHTML={marked(readme)}></div>
      </details>
    ) : (
      ""
    ),
    <div innerHTML={states.previewTemplate}></div>,
  ];
}
