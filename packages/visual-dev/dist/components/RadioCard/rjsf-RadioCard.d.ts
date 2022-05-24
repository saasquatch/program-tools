/// <reference types="react" />
import { WidgetProps } from "@rjsf/core";
interface cardOption {
    key: number;
    icon: string;
    title: string;
    description: string;
    value: any;
}
interface enumValue {
    label: any;
    value: any;
}
export declare function isEnumValue(option: any): option is enumValue;
export declare function isCardOption(card: any): card is cardOption;
export declare function isEnumArray(options: any): options is any[];
export declare function RJSFRadioCardWidget(props: WidgetProps): JSX.Element;
export {};
