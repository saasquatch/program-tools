import { css } from 'emotion';
import marked from 'marked';
export class TextComponent {
    constructor() {
        this.ishidden = false;
        this.ismarkdown = false;
        this.padding = '10px 20px 15px';
    }
    render() {
        const regex = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/i;
        const textStyle = css `
      font-family: ${this.fontfamily || 'inherit'};
      font-size: ${this.fontsize ? this.fontsize + 'px' : 'inherit'};
      text-align: ${this.textalign};
      color: ${this.color || 'inherit'};
      padding-top: ${this.paddingtop ? this.paddingtop + 'px' : 'inherit'};
      padding-bottom: ${this.paddingbottom ? this.paddingbottom + 'px' : 'inherit'};
      overflow-wrap: break-word;
    `;
        const divStyle = css `
      background: ${this.background ? this.background.match(regex) ? `url(${this.background}) no-repeat center center;` : this.background : 'inherit'};
      height: ${this.height || 'inherit'};
      background-size: contain;
    `;
        const content = this.ismarkdown
            ? h("div", { innerHTML: marked(this.text) })
            : this.text;
        return !this.ishidden &&
            h("div", { class: divStyle },
                h("p", { class: textStyle }, content));
    }
    static get is() { return "sqh-text-component"; }
    static get properties() { return {
        "background": {
            "type": String,
            "attr": "background"
        },
        "color": {
            "type": String,
            "attr": "color"
        },
        "fontfamily": {
            "type": String,
            "attr": "fontfamily"
        },
        "fontsize": {
            "type": String,
            "attr": "fontsize"
        },
        "height": {
            "type": String,
            "attr": "height"
        },
        "ishidden": {
            "type": Boolean,
            "attr": "ishidden"
        },
        "ismarkdown": {
            "type": Boolean,
            "attr": "ismarkdown"
        },
        "padding": {
            "type": String,
            "attr": "padding"
        },
        "paddingbottom": {
            "type": String,
            "attr": "paddingbottom"
        },
        "paddingtop": {
            "type": String,
            "attr": "paddingtop"
        },
        "text": {
            "type": String,
            "attr": "text"
        },
        "textalign": {
            "type": String,
            "attr": "textalign"
        },
        "textEl": {
            "elementRef": true
        }
    }; }
    static get style() { return "/**style-placeholder:sqh-text-component:**/"; }
}
