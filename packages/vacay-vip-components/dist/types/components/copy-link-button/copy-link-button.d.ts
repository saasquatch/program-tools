import '../../stencil.core';
import Clipboard from 'clipboard';
export declare class CopyLinkButton {
    text: string;
    copysuccess: string;
    copyfailure: string;
    ishidden: boolean;
    buttoncolor: string;
    textcolor: string;
    sharelink: string;
    componentWillLoad(): any;
    onError(e: Error): void;
    notify(clipboardNotification: any, notificationText: any): void;
    notifySuccess(e: Clipboard.Event): void;
    notifyFailure(e: Clipboard.Event): void;
    componentDidLoad(): void;
    render(): JSX.Element;
}
