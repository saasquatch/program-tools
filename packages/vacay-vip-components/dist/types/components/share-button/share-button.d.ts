import '../../stencil.core';
export declare class ShareButton {
    displayrule: string;
    text: string;
    backgroundcolor: string;
    textcolor: string;
    icon: string;
    className: string;
    iconhorizontal: number;
    iconvertical: number;
    iconsize: number;
    type: string;
    url: string;
    button: HTMLElement;
    clickHandler(e: any): void;
    componentDidLoad(): void;
    render(): JSX.Element;
}
