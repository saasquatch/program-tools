import { h } from '@stencil/core';
export class SqDocs {
    render() {
        return h("div", null,
            h("slot", null));
    }
    static get is() { return "sq-docs"; }
    static get originalStyleUrls() { return {
        "$": ["sq-docs.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["sq-docs.css"]
    }; }
}
