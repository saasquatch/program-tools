import { Component, Prop } from '@stencil/core';
import Clipboard from 'clipboard';
import { shadeColor, addClass, removeClass } from '../../utilities';

const API: MyAPI = window["WidgetHost"];

@Component({
  tag: 'sqh-copy-link-button',
  styleUrl: 'copy-link-button.scss'
})
export class CopyLinkButton {
  @Prop() text: string;
  @Prop() ishidden: boolean = false;
  @Prop() buttoncolor: string;
  @Prop() textcolor: string;

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

    API.analytics.shareEvent('DIRECT');
  }

  notifySuccess(e:Clipboard.Event) {
    this.notify((e.trigger as HTMLElement).dataset.clipboardNotification, "Copied!");
  }

  notifyFailure(e:Clipboard.Event) {
    this.notify((e.trigger as HTMLElement).dataset.clipboardNotification, "Press Ctrl+C to copy");
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
          <input id="squatch-share-link" value="https://link.com" readonly="readonly"></input>

          <span class="label label-default fade" id="squatch-share-notification">copied!</span>

          <span class="input-group-btn">
              <button class="btn btn-primary icon-btn copy" data-clipboard-target="#squatch-share-link" data-clipboard-notification="#squatch-share-notification">
              <i class="icon icon-link"></i>
              <span class="hidden-sm">Copy</span>
              </button>
          </span>
        </div>;
      
    return copyLinkSection;
  }
}