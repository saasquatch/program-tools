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

  @Element() button: HTMLElement;

  clickHandler(e) {
    if (e.type != 'touchstart') {
      e.preventDefault();

      // THIS BEHAVIOUR might be different across share mediums
      // let url = `${this.url}&display=popup`;
      let url = this.url

      // TODO: Is this correct?
      const target = 'Share';
      const features = 'status=0,width=620,height=400'
      window.open(url, target, features);
    }
  }

  componentDidLoad() {
    let el = this.button;

    el.addEventListener("click", this.clickHandler.bind(this), false);
    el.addEventListener("touchStart", this.clickHandler.bind(this), false);
  }

  render() {
    const isMobileSafari  = detectMobileSafari();
    const target = isMobileSafari ? '_parent' : '_blank';
    const iconClass = `icon icon-${this.icon}`;

    // input a dynamic label
    const clz = css`
      label: ;
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
    `;
    const classes = [`btn squatch-share-btn`, this.className, this.displayrule, clz].join(" ");

    return (
      <a class={classes} href={this.url} target={target}>
        <i class={iconClass}></i>
        <span class="share-btn-text">{this.text}</span>
      </a>
    );
  }
}
