import { r as registerInstance, h as h$1 } from './index-832bd454.js';
import { n as h } from './stencil-hooks.module-f4b05383.js';
import { B as BigStatView } from './sqm-big-stat-view-55b6aa0c.js';
import { u as useDemoBigStat, a as useBigStat } from './useDemoBigStat-604b848c.js';
import { j as jn } from './index.module-b74a7f69.js';
import './JSS-f59933eb.js';
import './extends-c31f1eff.js';
import './cjs-e829b75b.js';
import './index-eccbb333.js';

let BigStat = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /**
     * @uiName Flex Reverse - controls the order of the stat value & description column
     */
    this.flexReverse = false;
    this.ignored = true;
    h(this);
  }
  disconnectedCallback() { }
  render() {
    const { props, label } = jn() ? useDemoBigStat(this) : useBigStat(this);
    return (h$1(BigStatView, Object.assign({}, props), h$1("slot", null, label)));
  }
};

export { BigStat as sqm_big_stat };
