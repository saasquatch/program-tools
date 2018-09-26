import { Component, Prop, State } from '@stencil/core';
import Clipboard from 'clipboard';
import { shadeColor, addClass, removeClass } from '../../utilities';
import { css } from 'emotion';
import { API } from '../../services/WidgetHost';

@Component({
  tag: 'sqh-copy-link-button',
  styleUrl: 'copy-link-button.scss'
})
export class CopyLinkButton {
  @Prop() text: string;
  @Prop() copysuccess: string = "copied!";
  @Prop() copyfailure: string = "Press Ctrl+C to copy";
  @Prop() ishidden: boolean = false;
  @Prop() buttoncolor: string;
  @Prop() textcolor: string;
  @State() sharelink: string;

  componentWillLoad() {
    if (!this.ishidden) {
      return API.graphql.getShareLink().then(res => {
        this.sharelink = res;
      }).catch(e => {
        this.onError(e);
      });
    } 
  }

  onError(e: Error) {
    console.log("Error loading via GraphQL.", e);
  }

  notify(clipboardNotification, notificationText) {
    const notification = document.getElementById(clipboardNotification.slice(1));
    notification.textContent = notificationText;

    addClass(notification, 'in');

    setTimeout(() => {
      removeClass(notification, 'in');
    }, 1400);

    API.analytics.shareEvent('DIRECT');
  }

  notifySuccess(e:Clipboard.Event) {
    this.notify((e.trigger as HTMLElement).dataset.clipboardNotification, this.copysuccess);
  }

  notifyFailure(e:Clipboard.Event) {
    this.notify((e.trigger as HTMLElement).dataset.clipboardNotification, this.copyfailure);
  }

  componentDidLoad() {
    const clipboard = new Clipboard('[data-clipboard-target]');
    clipboard.on('success', this.notifySuccess.bind(this));
    clipboard.on('error', this.notifyFailure.bind(this));
  }

  render() {
    const myStyle = css `
      background-color: ${this.buttoncolor};
      border: 1px solid ${this.buttoncolor};
      color: ${this.textcolor};
      font-family: ${'inherit'};
      
      &:hover {
        background: ${shadeColor(this.buttoncolor, 10)};
        border-color: ${shadeColor(this.buttoncolor, 12)};
        color: ${this.textcolor};
      }
      
      &:focus {
        color: ${this.textcolor};
      }
    `;

    const buttonClass = [`sqh-copy-btn icon-btn`, myStyle ].join(" ");

    return !this.ishidden && 
      <div class="input-group">
        <input id="squatch-share-link" value={ this.sharelink } readonly="readonly"></input>

        <span class="label fade" id="squatch-share-notification">{this.copysuccess}</span>

        <span class="input-group-btn">
            <button class={buttonClass} data-clipboard-target="#squatch-share-link" data-clipboard-notification="#squatch-share-notification">
            <i class="icon icon-link"></i>
            <span class="hidden-sm">{this.text}</span>
            </button>
        </span>
      </div>;
  }
}