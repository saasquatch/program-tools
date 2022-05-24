import { r as registerInstance, h as h$1 } from './index-832bd454.js';
import { n as h } from './stencil-hooks.module-f4b05383.js';
import { u as useChildElements } from './useChildElements-7ccc20a7.js';
import './index.module-b74a7f69.js';
import './extends-c31f1eff.js';

let Timeline = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ignored = true;
    /**
     * @uiName Icon
     * @uiType string
     * @uiEnum ["gift", "circle"]
     */
    this.icon = "gift";
    h(this);
  }
  disconnectedCallback() { }
  render() {
    //@ts-ignore
    const rewards = useChildElements();
    rewards.forEach((reward, idx) => {
      if (rewards.length > 1 && idx != rewards.length - 1) {
        reward.line = true;
      }
      reward.icon = this.icon;
    });
    const vanillaStyle = `
		:host{
			display: block;   
		}

		// ::slotted(*:not(:only-child):not(:last-child)) {
		// 	margin-bottom: var(--sl-spacing-xx-large);
		// }

		// ::slotted(*:not(:only-child):not(:last-child))::before {
		// 	display: block;
		// 	content: "";
		// 	height: 100%;
		// 	background: var(--sl-color-primary-300);
		// }

		// ::slotted(*:not(:first-child))::before {
		// 	display: block;
		// 	position: relative;
		// 	content: "";
		// 	background: var(--sl-color-primary-300);
		// 	height: 90px;
		// 	width: 4px;
		// 	top: 12px;
		// 	left: 10px;
		// 	margin-top: -44px;
		// 	margin-bottom: 8px;
		// 	border-radius: 4px;
		// }


    // ZH: Temporary Patch fix
    // ::slotted(*:not(:first-child))::before {
	// 		display: block;
	// 		position: relative;
	// 		content: "";
	// 		background: var(--sl-color-primary-300);
	// 		min-height: 150px;
	// 		max-height: 300px;
	// 		width: 4px;
	// 		top: 12px;
	// 		left: 10px;
	// 		margin-top: -85px;
	// 		margin-bottom: 8px;
	// 		border-radius: 4px;
	// 	}
	`;
    return (h$1("div", null, h$1("style", { type: "text/css" }, vanillaStyle), h$1("slot", null)));
  }
};

export { Timeline as sqm_timeline };
