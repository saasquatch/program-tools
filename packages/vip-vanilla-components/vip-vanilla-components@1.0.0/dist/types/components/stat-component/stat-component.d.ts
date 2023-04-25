import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
export declare class StatComponent {
    elem: HTMLElement;
    ishidden: boolean;
    stattype: string;
    statvalue: string;
    statdescription: string;
    statcolor: string;
    statTypeUpdated: EventEmitter;
    statAdded: EventEmitter;
    componentWillLoad(): void;
    stattypeHandler(newValue: string, oldValue: string): void;
    statAddedHandler(stat: HTMLElement): void;
    statTypeUpdatedHandler(stat: HTMLElement): void;
    render(): JSX.Element;
}
