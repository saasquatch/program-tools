import { r as registerInstance, h as h$1, j as Host } from './index-832bd454.js';
import { d as browser, j as useRef, i as useEffect, n as h } from './stencil-hooks.module-f4b05383.js';
import { M, P, r as rn } from './index.module-b74a7f69.js';
import { g as getProps } from './utils-48175026.js';
import './extends-c31f1eff.js';

const debug = browser('sq:useProgramMenu');
const UPDATE_PROGRAM_EVENT = 'sq:update-program-id';
function useProgramMenu(props) {
  const programId = M();
  const host = P();
  debug({ programId, props });
  const ref = useRef();
  const [, rerender] = rn();
  useEffect(() => {
    var _a;
    (_a = ref.current) === null || _a === void 0 ? void 0 : _a.addEventListener('sl-select', (e) => {
      const programId = e.detail.item.value;
      // setProgramId(programId);
      host.dispatchEvent(new CustomEvent(UPDATE_PROGRAM_EVENT, {
        detail: programId,
        bubbles: true,
        composed: true,
      }));
    });
  }, [ref.current]);
  return {
    data: {
      programId,
    },
    callbacks: {
      rerender,
    },
    ref,
  };
}

let ProgramMenu = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ignored = true;
    h(this);
  }
  disconnectedCallback() { }
  render() {
    const { data, ref } = useProgramMenu(getProps(this));
    return (h$1(Host, { style: { display: "contents" } }, h$1("sl-select", { style: { paddingBottom: "var(--sl-spacing-large)" }, value: data.programId, ref: (r) => (ref.current = r) }, h$1("slot", null))));
  }
};

export { ProgramMenu as sqm_program_menu };
