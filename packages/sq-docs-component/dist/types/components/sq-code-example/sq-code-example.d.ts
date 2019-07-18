import Clipboard from 'clipboard';
interface tab extends Element {
    syntax: string;
    open: boolean;
    tabname: string;
}
export declare class SqCodeExample {
    tabs: any;
    code: Array<tab>;
    clipboard: Clipboard;
    copied: boolean;
    componentWillLoad(): void;
    componentDidLoad(): void;
    openTab(tabIndex: number): Promise<void>;
    render(): any;
}
export {};
