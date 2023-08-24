import '../../stencil.core';
import '../../stencil.core';
import '../../stencil.core';
import Clipboard from 'clipboard';
export declare class CopyButton {
    ishidden: boolean;
    text: string;
    width: number;
    backgroundcolor: string;
    borderradius: number;
    textcolor: string;
    fontsize: number;
    copysuccess: string;
    copyfailure: string;
    rewardkey: string;
    codefontsize: number;
    codefontcolor: string;
    fueltankcode: string;
    componentWillLoad(): Promise<void>;
    onError(e: Error): void;
    notify(clipboardNotification: any, notificationText: any): void;
    notifySuccess(e: Clipboard.Event): void;
    notifyFailure(e: Clipboard.Event): void;
    componentDidLoad(): void;
    render(): JSX.Element;
}
