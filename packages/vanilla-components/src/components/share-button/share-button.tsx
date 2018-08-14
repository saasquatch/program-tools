import { Component, Prop, Element, State } from '@stencil/core';
import { shadeColor, detectMobileSafari } from '../../utilities';
import { API } from '../../services/WidgetHost';
import { css } from 'emotion';

@Component({
  tag: 'sqh-share-button',
  styleUrl: 'share-button.scss'
})
export class ShareButton {
  @Prop() displayrule: string;
  @Prop() text: string;
  @Prop() backgroundcolor: string;
  @Prop() textcolor: string;
  @Prop() icon: string;
  @Prop() className: string;
  @Prop() iconhorizontal: number;
  @Prop() iconvertical: number;
  @Prop() iconsize: number;
  @Prop() type: string;

  @State() messageLink: string;

  @Element() button: HTMLElement;

  clickHandler(e) {
    // checking for null on closest 'a' tag makes click handler avoid firing when margin is clicked
    var anchor = e.target.closest('a');
    if (anchor !== null && this.className !== "email-share") {
      e.preventDefault();

      const url = this.messageLink
      const target = '_blank';
      const features = 'status=0,width=680,height=580'
      window.open(url, target, features);
    }
  }

  componentDidLoad() {
    let el = this.button;
    el.addEventListener("click", this.clickHandler.bind(this), false);
  }

  componentWillLoad() {
    return this.getMessageLinks(this.type);
  }

  // TODO: test this function with real (not demo) data
  getMessageLinks(type) {
    return API.graphql.getMessageLinks(type).then(res => {
      this.messageLink = res;
    }).catch(e => {
      this.onError(e);
    });
  }

  onError(e: Error) {
    console.log("Error loading via GraphQL.", e);
  }

  render() {
    const isMobileSafari  = detectMobileSafari();
    const target = isMobileSafari ? '_parent' : '_blank';
    const iconClass = `icon icon-${this.icon}`;

    const style = css`
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

    return (
      <a class={classes} href={this.messageLink} target={target}>
        <i class={iconClass}></i>
        <span class="share-btn-text">{this.text}</span>
      </a>
    );
  }
}