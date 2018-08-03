import { Component, Prop, State } from '@stencil/core';
import Clipboard from 'clipboard';
import { shadeColor, addClass, removeClass } from '../../utilities';
// import { addClass, removeClass } from '../../utilities';

import { API } from '../../services/WidgetHost';

@Component({
  tag: 'sqh-copy-link-button',
  styleUrl: 'copy-link-button.scss'
})
export class CopyLinkButton {
  @Prop() text: string = "Copy";
  @Prop() copysuccess: string = "copied!";
  @Prop() copyfailure: string = "Press Ctrl+C to copy";
  @Prop() ishidden: boolean = false;
  @Prop() buttoncolor: string = "#FF69B4";
  @Prop() textcolor: string = "#FF69B4";
  @State() sharelink: string = "Testing 123";

  componentWillLoad() {
    return API.graphql.getShareLink().then(res => {
      this.sharelink = res;
    }).catch(e => {
      this.onError(e);
    });
  }

  onError(e: Error) {
    console.log("Error loading via GraphQL.", e);
  }

  addStyle() {
    const css = ` button.icon-btn.copy {
                    background-color: ${this.buttoncolor};
                    border: 1px solid ${this.buttoncolor};
                    color: ${this.textcolor};
                  }
                  
                  button.icon-btn.copy:hover {
                    background: ${shadeColor(this.buttoncolor, 10)};
                    border-color: ${shadeColor(this.buttoncolor, 12)};
                    color: ${this.textcolor};
                  }
                  
                  button.icon-btn.copy:focus {
                    color: ${this.textcolor};
                  } `
    const style = document.createElement('style');

    style.appendChild(document.createTextNode(css));
    document.getElementsByTagName('head')[0].appendChild(style);
  }

  notify(clipboardNotification, notificationText) {
    const notification = document.getElementById(clipboardNotification.slice(1));
    notification.textContent = notificationText;

    addClass(notification, 'in');

    setTimeout(() => {
      removeClass(notification, 'in');
    }, 1400);

    API.analytics.shareEvent('COPY');
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

    this.addStyle();
  }

  componentWillUpdate() {
    this.addStyle();
  }

  render() {
    const copyLinkSection = this.ishidden 
      ? `` 
      : <div class="input-group">
          <input id="squatch-share-link" value={ this.sharelink } readonly="readonly"></input>

          <span class="label fade" id="squatch-share-notification">{this.copysuccess}</span>

          <span class="input-group-btn">
              <button class="sqh-copy-btn icon-btn" data-clipboard-target="#squatch-share-link" data-clipboard-notification="#squatch-share-notification">
              <i class="icon icon-link"></i>
              <span class="hidden-sm">{this.text}</span>
              </button>
          </span>
        </div>;
      
    return copyLinkSection;
  }
}