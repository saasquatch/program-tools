import { Component, Prop} from '@stencil/core';
import Clipboard from 'clipboard';

@Component({
  tag: 'copy-link-button',
  styleUrl: 'copy-link-button.scss'
})
export class CopyLinkButton {
  @Prop() shareLink: string;

  hasClass(el, className) {
    if (el.classList)
      return el.classList.contains(className)
    else
      return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
  }

  addClass(el, className) {
    if (el.classList) {
      el.classList.add(className);
    } else if (!this.hasClass(el, className)) {
      el.className += " " + className;
    }
  }

  removeClass(el, className) {
    if (el.classList) {
      el.classList.remove(className);
    } else if (this.hasClass(el, className)) {
      const reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
      el.className = el.className.replace(reg, ' ');
    }
  }

  notify(clipboardNotification, notificationText) {
    const notification = document.getElementById(clipboardNotification.slice(1));
    notification.textContent = notificationText;

    this.addClass(notification, 'in');

    setTimeout(() => {
      this.removeClass(notification, 'in');
    }, 1400);

    //TODO: handle analytics here too
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