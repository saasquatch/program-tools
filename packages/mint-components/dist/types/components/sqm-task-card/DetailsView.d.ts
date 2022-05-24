import { VNode } from "../../stencil-public-runtime";
export declare const style: {
  Description: {
    "& input[type=checkbox]": {
      display: string;
    };
    "& input:checked ~ .details": {
      transform: string;
    };
    "& .details": {
      position: string;
      top: string;
      right: string;
      color: string;
      fontSize: string;
      "& :hover": {
        color: string;
      };
      transformOrigin: string;
      transition: string;
      cursor: string;
    };
    "& input:checked ~ .summary": {
      transition: string;
      maxHeight: string;
      marginBottom: string;
    };
    "& input:checked ~ .summary[progress-bar]": {
      marginBottom: string;
    };
    "& .summary": {
      display: string;
      overflow: string;
      fontSize: string;
      maxHeight: string;
      transition: string;
      marginBottom: string;
    };
  };
};
export declare function Details(props: any): VNode;
