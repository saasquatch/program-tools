import { Component, Prop, Element } from '@stencil/core';
import { shadeColor, detectMobileSafari } from '../../utilities';
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
  @Prop() url: string;
  @Prop() className: string;
  @Prop() iconhorizontal: number;
  @Prop() iconvertical: number;
  @Prop() iconsize: number;

  @Element() button: HTMLElement;

  clickHandler(e) {
    // checking for null on closest 'a' tag makes click handler avoid firing when margin is clicked
    var anchor = e.target.closest('a');
    if (anchor !== null && this.className !== "email-share") {
      e.preventDefault();

      const url = this.url
      const target = '_blank';
      const features = 'status=0,width=680,height=580'
      window.open(url, target, features);
    }
  }

  componentDidLoad() {
    let el = this.button;
    el.addEventListener("click", this.clickHandler.bind(this), false);
  }

  render() {
    const isMobileSafari  = detectMobileSafari();
    const target = isMobileSafari ? '_parent' : null;
    const iconClass = `icon icon-${this.icon}`;

    const style = css`
      background-color: ${this.backgroundcolor};
      border: 1px solid ${this.backgroundcolor};
      color: ${this.textcolor};
      transition: background-color .5s;
                        
      &:hover {
        background: ${shadeColor(this.backgroundcolor, 20)};
        border-color: ${shadeColor(this.backgroundcolor, 24)};
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
    
    const classes = [`btn squatch-share-btn`, this.className, this.displayrule, style].join(" ");

    return (
      <a class={classes} href={this.url} target={target}>
        <i class={iconClass}></i>
        <span class="share-btn-text">{this.text}</span>
      </a>
    );
  }
}