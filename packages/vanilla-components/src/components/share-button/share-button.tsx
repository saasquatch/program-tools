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

  render() {
    const isMobileSafari  = detectMobileSafari();
    const target = isMobileSafari ? '_parent' : '';
    const iconClass = `icon icon-${this.icon}`;
    // opens new window for all links except for Email
    const newWindowUrl = this.icon === "mail" ? `${this.url}` : `javascript:window.open('${this.url}','Share','status=0,width=550,height=600')`

    // TODO: input a dynamic label - Do we need to?
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

      .icon-${this.icon} {
        left: ${this.iconhorizontal}px;
        top: ${this.iconvertical}px;
        font-size: ${this.iconsize}em;
      }
    `;
    
    const classes = [`btn squatch-share-btn`, this.className, this.displayrule, clz].join(" ");

    return (
      <a class={classes} href={newWindowUrl} target={target}>
        <i class={iconClass}></i>
        <span class="share-btn-text">{this.text}</span>
      </a>
    );
  }
}
