import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-bash';
export declare class SqCode {
    elem: HTMLElement;
    open: boolean;
    syntax: string;
    tabname: string;
    copied: boolean;
    highlightedCode: string;
    text: string;
    loaded: boolean;
    newElement: HTMLElement;
    connectedCallback(): void;
    componentWillLoad(): Promise<void>;
    componentDidRender(): void;
    componentDidUpdate(): void;
    getText(): any;
    render(): any;
}
