import { useParentState } from "@saasquatch/component-boilerplate";
import { useHost, withHooks } from "@saasquatch/stencil-hooks";
import { useCallback, useEffect, useState } from "@saasquatch/universal-hooks";
import { Component, h, Host, Prop } from "@stencil/core";
import debugFn from "debug";
import { VERIFICATION_EVENT_KEY, VERIFICATION_PARENT_NAMESPACE } from "./keys";
import { getProps } from "../../utils/utils";
const debug = debugFn("sq:widget-verification");

function useTemplateChildren({ parent, callback }) {
  const parentObserver = new MutationObserver(listenForTemplateChanges);
  const childTemplateObserver = new MutationObserver(callback);

  parentObserver.observe(parent, {
    childList: true,
    // We only care about immediate children templates
    subtree: false,
  });
  listenForTemplateChanges({ addedNodes: parent.querySelectorAll("template") });

  function listenForTemplateChanges(mutationList) {
    // Be smart, only look at the mutation list
    mutationList.addedNodes?.forEach((t) => {
      childTemplateObserver.observe(t.content, {
        childList: true,
        attributes: true,
        // Look deep into the templates for re-rendering
        subtree: true,
      });
    });
  }

  return () => {
    parentObserver.disconnect();
    childTemplateObserver.disconnect();
  };
}

/**
 * @uiName Widget Verification Gate
 * @slots [{"name":"not-verified","title":"Not verified template"},{"name":"verified","title":"Verified template"}]
 * @canvasRenderer always-replace
 * @exampleGroup Widget Verification
 * @example Widget Verification Gate - <sqm-widget-verification-controller><template slot="verified"><sqm-tax-and-cash></sqm-tax-and-cash></template></sqm-widget-verification-controller>
 */
@Component({
  tag: "sqm-widget-verification-controller",
})
export class WidgetVerificationController {
  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const [context, setContext] = useParentState<boolean>({
      namespace: VERIFICATION_PARENT_NAMESPACE,
      initialValue: false,
    });

    const [container, setContainer] = useState<HTMLDivElement>(undefined);
    const [slot, setSlot] = useState<HTMLDivElement>(undefined);

    const updateTemplates = useCallback(() => {
      const isAuth = context;
      const templates = slot.querySelectorAll<HTMLTemplateElement>(`template`);
      const template = Array.from(templates).find(
        (t) => t.slot === (isAuth ? "verified" : "not-verified")
      );

      if (template) {
        // use outerHTML if template's innerHTML is unset (only happens in Stencilbook)
        const newContent =
          template.innerHTML || template.firstElementChild.outerHTML;

        // if template contents are an exact match
        if (newContent === container.innerHTML) {
          debug("don't rerender");
        } else if (template) {
          container.innerHTML = newContent;
        }
      }

      const plopTargets = Array.from(slot.children).filter(
        (el) => el.tagName === "RAISINS-PLOP-TARGET"
      );

      // if editing in raisins
      if (plopTargets.length) {
        const loggedInPlopTargets = plopTargets.filter(
          (el) => el.slot === "verified"
        );

        const loggedOutPlopTargets = plopTargets.filter(
          (el) => el.slot === "not-verified"
        );

        loggedOutPlopTargets.forEach((target: HTMLElement, i) => {
          if (isAuth) {
            target.style.display = "none";
            return;
          }
          // Place last plop target at the bottom of the parent
          if (i === loggedOutPlopTargets.length - 1) {
            target.style.bottom = "0px";
            target.style.left = "0px";
            target.style.right = "0px";
            target.style.position = "absolute";
          }

          target.style.height = "25px";
        });

        loggedInPlopTargets.forEach((target: HTMLElement, i) => {
          if (!isAuth) {
            target.style.display = "none";
            return;
          }
          // Place last plop target at the bottom of the parent
          if (i === loggedInPlopTargets.length - 1) {
            target.style.bottom = "0px";
            target.style.left = "0px";
            target.style.right = "0px";
            target.style.position = "absolute";
          }

          target.style.height = "25px";
        });
      }
    }, [container, slot, context]);

    useEffect(() => {
      if (!container || !slot) {
        debug("DOM not ready:");
        return;
      }

      // Run on first render
      updateTemplates();

      return useTemplateChildren({ parent: slot, callback: updateTemplates });
    }, [slot, container, context]);

    return (
      <Host>
        <div ref={setSlot} style={{ display: "contents" }}>
          <slot name="not-verified"></slot>
          <slot name="verified" />
        </div>
        <div ref={setContainer}>
          <slot name="shown"></slot>
        </div>
      </Host>
    );
  }
}
