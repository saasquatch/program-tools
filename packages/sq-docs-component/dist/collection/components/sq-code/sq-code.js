import { h } from '@stencil/core';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-bash';
export class SqCode {
    constructor() {
        this.loaded = false;
    }
    connectedCallback() {
        this.highlightedCode = "";
    }
    async componentWillLoad() {
        //await Prism.plugins.toolbar.registerButton()
        //console.log(Prism.plugins.toolbar);
        if (!this.open)
            this.elem.classList.add('hidden');
        this.text = this.elem.textContent;
        this.highlightedCode = Prism.highlight(this.elem.textContent, Prism.languages[this.syntax]);
        if (this.elem.firstChild.nodeName == "#text")
            this.elem.firstChild.remove();
        this.loaded = true;
    }
    componentDidRender() {
        //console.log(this.newElement)
        this.newElement.innerHTML = this.highlightedCode;
    }
    componentDidUpdate() {
        //console.log("sq-code open", this.open, this.syntax)
        if (this.open) {
            this.elem.classList.remove('hidden');
        }
        else {
            this.elem.classList.add('hidden');
        }
    }
    getText() {
        return h("div", null, this.highlightedCode);
    }
    render() {
        return h("pre", { class: `language-${this.syntax} ${this.copied}`, hidden: !this.open },
            h("code", { class: `language-${this.syntax}` },
                h("span", { ref: (el) => this.newElement = el })),
            h("span", { class: `hidden original` }, this.text));
    }
    static get is() { return "sq-code"; }
    static get originalStyleUrls() { return {
        "$": ["sq-code.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["sq-code.css"]
    }; }
    static get properties() { return {
        "open": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "open",
            "reflect": false
        },
        "syntax": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "syntax",
            "reflect": false
        },
        "tabname": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "tabname",
            "reflect": false
        },
        "copied": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "copied",
            "reflect": false
        }
    }; }
    static get states() { return {
        "highlightedCode": {},
        "text": {},
        "loaded": {},
        "newElement": {}
    }; }
    static get elementRef() { return "elem"; }
}
