interface GapProps {
  direction: "row" | "column";
  size: string;
}
export declare const gap: (props: GapProps) => {
  "& > :not(:last-child)": {
    "margin-right": string;
    "margin-bottom"?: undefined;
  };
} | {
  "& > :not(:last-child)": {
    "margin-bottom": string;
    "margin-right"?: undefined;
  };
};
export declare const HostBlock: {
  ":host": {
    display: string;
  };
  ":host([hidden])": {
    display: string;
  };
};
export declare const P: {
  "font-size": string;
  color: string;
  "margin-top": string;
  "&.Subtitle": {
    color: string;
    margin: string;
  };
};
export declare const Column: {
  display: string;
  "flex-direction": string;
};
export declare const SeparateContent: {
  display: string;
  "justify-content": string;
  "align-items": string;
};
export declare const ErrorStyles: {
  "&::part(base)": {
    background: string;
    borderColor: string;
    outline: string;
  };
  "&:host": {
    "--something-random": string;
    "--focus-ring": string;
  };
  "&::part(input)": {
    color: string;
    "&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active": {
      boxShadow: string;
      "-webkit-text-fill-color": string;
    };
  };
  "&::part(help-text)": {
    color: string;
  };
};
export declare const Wrapper: {
  "box-sizing": string;
  width: string;
  "max-width": string;
  height: string;
  "background-color": string;
  display: string;
  padding: string;
  border: string;
  "border-radius": string;
};
export declare const AuthWrapper: {
  "& > :not(:last-child)": {
    "margin-right": string;
    "margin-bottom"?: undefined;
  };
  display: string;
  "flex-direction": string;
  "max-width": string;
  "box-sizing": string;
  width: string;
  height: string;
  "background-color": string;
  padding: string;
  border: string;
  "border-radius": string;
  margin: string;
} | {
  "& > :not(:last-child)": {
    "margin-bottom": string;
    "margin-right"?: undefined;
  };
  display: string;
  "flex-direction": string;
  "max-width": string;
  "box-sizing": string;
  width: string;
  height: string;
  "background-color": string;
  padding: string;
  border: string;
  "border-radius": string;
  margin: string;
};
export declare const AuthColumn: {
  "& > :not(:last-child)": {
    "margin-right": string;
    "margin-bottom"?: undefined;
  };
  "& > *:not(style, div)": {
    display: string;
  };
  display: string;
  "flex-direction": string;
} | {
  "& > :not(:last-child)": {
    "margin-bottom": string;
    "margin-right"?: undefined;
  };
  "& > *:not(style, div)": {
    display: string;
  };
  display: string;
  "flex-direction": string;
};
export declare const AuthButtonsContainer: {
  "& > div": {
    "text-align": string;
  };
  "& > :not(:last-child)": {
    "margin-right": string;
    "margin-bottom"?: undefined;
  };
  "padding-top": string;
  display: string;
  "flex-direction": string;
  width: string;
  "align-items": string;
  "&>*": {
    width: string;
  };
} | {
  "& > div": {
    "text-align": string;
  };
  "& > :not(:last-child)": {
    "margin-bottom": string;
    "margin-right"?: undefined;
  };
  "padding-top": string;
  display: string;
  "flex-direction": string;
  width: string;
  "align-items": string;
  "&>*": {
    width: string;
  };
};
export declare type FontSize = "xx-small" | "x-small" | "small" | "medium" | "large" | "x-large" | "xx-large" | "xxx-large" | "xxxx-large";
export declare type FontWeight = "light" | "normal" | "semibold" | "bold";
export declare type LetterSpacing = "dense" | "normal" | "loose";
export declare type LineHeight = "dense" | "normal" | "loose";
export declare type Spacing = "none" | "xxx-small" | "xx-small" | "x-small" | "small" | "medium" | "large" | "x-large" | "xx-large" | "xxx-large" | "xxxx-large";
export {};
