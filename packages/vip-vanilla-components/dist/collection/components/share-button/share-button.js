import { shadeColor, detectMobileSafari } from '../../utilities';
import { css } from 'emotion';
export class ShareButton {
    clickHandler(e) {
        if (window["widgetIdent"].env === "demo") {
            e.preventDefault();
            return;
        }
        // checking for null on closest 'a' tag makes click handler avoid firing when margin is clicked
        var anchor = e.target.closest('a');
        if (anchor !== null && this.className !== "email-share") {
            e.preventDefault();
            const url = this.url;
            const target = '_blank';
            const features = 'status=0,width=680,height=580';
            window.open(url, target, features);
        }
    }
    componentDidLoad() {
        let el = this.button;
        el.addEventListener("click", this.clickHandler.bind(this), false);
    }
    render() {
        const isMobileSafari = detectMobileSafari();
        const target = isMobileSafari ? '_parent' : '_blank';
        const iconClass = `icon icon-${this.icon}`;
        const style = css `
      background-color: ${this.backgroundcolor};
      border: 1px solid ${this.backgroundcolor};
      color: ${this.textcolor};

                        
      &:hover {
        background: ${shadeColor(this.backgroundcolor, 10)};
        border-color: ${shadeColor(this.backgroundcolor, 12)};
        color: ${this.textcolor};
      }
                    
      &:focus {
        color: ${this.textcolor};
      }
      .icon-${this.icon} {
        left: ${this.iconhorizontal}px;
        top: ${this.iconvertical}px;
        font-size: ${this.iconsize}em;
      }
    `;
        const classes = [`squatch-share-btn`, this.className, this.displayrule, style].join(" ");
        return (h("a", { class: classes, href: this.url, target: target },
            h("i", { class: iconClass }),
            h("span", { class: "share-btn-text" }, this.text)));
    }
    static get is() { return "sqh-share-button"; }
    static get properties() { return {
        "backgroundcolor": {
            "type": String,
            "attr": "backgroundcolor"
        },
        "button": {
            "elementRef": true
        },
        "className": {
            "type": String,
            "attr": "class-name"
        },
        "displayrule": {
            "type": String,
            "attr": "displayrule"
        },
        "icon": {
            "type": String,
            "attr": "icon"
        },
        "iconhorizontal": {
            "type": Number,
            "attr": "iconhorizontal"
        },
        "iconsize": {
            "type": Number,
            "attr": "iconsize"
        },
        "iconvertical": {
            "type": Number,
            "attr": "iconvertical"
        },
        "text": {
            "type": String,
            "attr": "text"
        },
        "textcolor": {
            "type": String,
            "attr": "textcolor"
        },
        "type": {
            "type": String,
            "attr": "type"
        },
        "url": {
            "type": String,
            "attr": "url"
        }
    }; }
    static get style() { return "/**style-placeholder:sqh-share-button:**/"; }
}
