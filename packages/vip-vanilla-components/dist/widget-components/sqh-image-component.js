/*! Built with http://stenciljs.com */
const { h } = window.WidgetComponents;

import { a as css } from './chunk-06494afc.js';
import './chunk-7081a6f1.js';

class ImageComponent {
    constructor() {
        this.ishidden = false;
    }
    render() {
        const imageString = this.url;
        const alignment = css `{
      text-align: ${this.alignment};
    }`;
        const myStyle = css `{
      width: ${this.width}px;
      border-radius: ${this.borderradius}px;
      ${this.css}
    }`;
        return !this.ishidden &&
            h("div", { class: alignment },
                h("img", { src: imageString, class: myStyle }));
    }
    static get is() { return "sqh-image-component"; }
    static get properties() { return {
        "alignment": {
            "type": String,
            "attr": "alignment"
        },
        "borderradius": {
            "type": Number,
            "attr": "borderradius"
        },
        "css": {
            "type": String,
            "attr": "css"
        },
        "ishidden": {
            "type": Boolean,
            "attr": "ishidden"
        },
        "url": {
            "type": String,
            "attr": "url"
        },
        "width": {
            "type": Number,
            "attr": "width"
        }
    }; }
    static get style() { return "sqh-image-component {\n  display: block; }\n  sqh-image-component div {\n    position: relative; }\n  sqh-image-component img {\n    max-width: 100%;\n    height: auto; }"; }
}

export { ImageComponent as SqhImageComponent };
