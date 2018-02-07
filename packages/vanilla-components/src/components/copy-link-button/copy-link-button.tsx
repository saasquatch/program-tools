import { Component, Prop, State} from '@stencil/core';
import Clipboard from 'clipboard';
import { addClass, removeClass } from '../../utilities';

const API: MyAPI = window["WidgetHost"];

@Component({
  tag: 'sqh-copy-link-button',
  styleUrl: 'copy-link-button.scss'
})
export class CopyLinkButton {
  @Prop() text: string;
  @State() shareLink: string;

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
  }

  render() {
    return (
    <div class="input-group">
        <input id="squatch-share-link" value="https://link.com" readonly="readonly"></input>

        <span class="label label-default fade" id="squatch-share-notification">copied!</span>

        <span class="input-group-btn">
            <button class="btn btn-primary icon-btn copy" data-clipboard-target="#squatch-share-link" data-clipboard-notification="#squatch-share-notification">
            <i class="icon icon-link"></i>
            <span class="hidden-sm">Copy</span>
            </button>
        </span>
    </div>
    );
  }
}