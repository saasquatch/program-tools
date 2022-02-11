import { useState } from "@saasquatch/universal-hooks";
import { h } from "@stencil/core";
import { createHookStory } from "../components/sqm-stencilbook/HookStoryAddon";
import referralWidget from "../templates/ReferralWidget.html";
import monoWidget from "../templates/MonoWidget.html";

import marked from "marked";


import { navigation } from "@saasquatch/component-boilerplate";

export default {
  title: "Templates / Widgets",
};

// slot="footer"
// support-email="john@foodservicerewards.com"
// terms-link="example.com"
// faq-link="example.com"
// padding="large"
// show-powered-by="false"
// powered-by-link="https://www.saasquatch.com/"

function useTemplate(templateString: string) {
  const [editedTemplate, setEditedTemplate] = useState(templateString);
  const [previewTemplate, setPreviewTemplate] = useState(templateString);
  return {
    states: { previewTemplate, editedTemplate },
    callbacks: { setEditedTemplate, setPreviewTemplate },
  };
}

function Buttons({ callbacks, states, template }) {
  return (
    <div>
      <button
        onClick={() => callbacks.setPreviewTemplate(states.editedTemplate)}
      >
        Update Preview
      </button>
      <button
        style={{ marginLeft: "10px" }}
        onClick={() => callbacks.setPreviewTemplate(template)}
      >
        Preview Dashboard
      </button>
    </div>
  );
}

function DefaultTemplateView(props) {
  const { states, callbacks } = props;
  return (
    <div style={{ height: "50vh" }}>
      <textarea
        style={{ width: "100%", height: "300px" }}
        onChange={(e: Event) =>
          callbacks.setEditedTemplate((e.target as HTMLInputElement).value)
        }
      >
        {states.editedTemplate}
      </textarea>
      <Buttons
        states={states}
        callbacks={callbacks}
        template={props.template}
      />
      <br />
      <div innerHTML={states.previewTemplate}></div>
    </div>
  );
}

export const ReferralWidget = createHookStory(() => {
  const { states, callbacks } = useTemplate(referralWidget);
  return (
    <DefaultTemplateView
      states={states}
      callbacks={callbacks}
      template={referralWidget}
    />
  );
});

export const MonoWidget = createHookStory(() => {
  const { states, callbacks } = useTemplate(monoWidget);
  return (
    <DefaultTemplateView
      states={states}
      callbacks={callbacks}
      template={monoWidget}
    />
  );
});