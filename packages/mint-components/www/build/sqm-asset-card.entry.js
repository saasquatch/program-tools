import { r as registerInstance, h as h$1 } from './index-832bd454.js';
import { j as jn } from './index.module-b74a7f69.js';
import { n as h } from './stencil-hooks.module-f4b05383.js';
import { A as AssetCardView } from './sqm-asset-card-view-d0b1e050.js';
import { c as cjs } from './cjs-e829b75b.js';
import './extends-c31f1eff.js';
import './JSS-f59933eb.js';

const useAssetCard = (_props) => {
  return {
    text: {
      titleText: "Marketing Banner",
    },
    imgUrl: null,
    callbacks: {},
  };
};

let AssetCard = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ignored = true;
    h(this);
  }
  disconnectedCallback() { }
  render() {
    const props = jn() ? useAssetCardDemo(this) : useAssetCard(this);
    return h$1(AssetCardView, Object.assign({}, props));
  }
  static get assetsDirs() { return ["../../assets"]; }
};
function useAssetCardDemo(props) {
  return cjs({
    text: {
      titleText: "Marketing Banner",
    },
    imgUrl: "../../assets/saasquatch-logo.png",
    callbacks: {},
  }, props.demoData || {}, { arrayMerge: (_, a) => a });
}

export { AssetCard as sqm_asset_card };
