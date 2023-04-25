import { css } from 'emotion';
export class CTAComponent {
    constructor() {
        this.ishidden = false;
        this.ismarkdown = false;
        this.padding = '10px 20px 15px';
    }
    render() {
        const buttonStyle = css `
      font-family: ${this.fontfamily || 'inherit'};
      font-size: ${this.fontsize ? this.fontsize + 'px' : 'inherit'};
      font-weight: ${this.fontweight ? this.fontweight : 'inherit'};   
      color: ${this.color || 'inherit'};
      padding-top: ${this.paddingtop ? this.paddingtop + 'px' : 'inherit'};
      padding-bottom: ${this.paddingbottom ? this.paddingbottom + 'px' : 'inherit'};
      width:${this.width ? this.width + 'px' : 'auto'};
      overflow-wrap: break-word;
      border-radius: ${this.borderradius ? this.borderradius + 'px' : '8px'};
      margin:0 auto;
      border:none;
      background-color: ${this.backgroundcolor ? this.backgroundcolor : '#F5A100'};
      &:hover {
        cursor:pointer;
        opacity:0.9;
      }
      &:focus {
        outline:none;
      }
    `;
        const divStyle = css `
      text-align: ${this.textalign};
      background: ${this.background ? this.background : 'inherit'};
      height: ${this.height || 'inherit'};
      background-size: contain;
    `;
        return !this.ishidden &&
            h("div", { class: divStyle },
                h("button", { class: buttonStyle, onClick: () => {
                        if (window["widgetIdent"].env === "demo")
                            return;
                        window.open(this.url, "_blank");
                    } }, this.text));
    }
    static get is() { return "sqh-cta-component"; }
    static get properties() { return {
        "background": {
            "type": String,
            "attr": "background"
        },
        "backgroundcolor": {
            "type": String,
            "attr": "backgroundcolor"
        },
        "borderradius": {
            "type": String,
            "attr": "borderradius"
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
        "fontweight": {
            "type": String,
            "attr": "fontweight"
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
        },
        "url": {
            "type": String,
            "attr": "url"
        },
        "width": {
            "type": String,
            "attr": "width"
        }
    }; }
    static get style() { return "/**style-placeholder:sqh-cta-component:**/"; }
}
