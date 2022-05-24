import { h } from './index-832bd454.js';
import { c as createStyleSheet } from './JSS-f59933eb.js';
import { m as useState, f as useCallback, i as useEffect } from './stencil-hooks.module-f4b05383.js';

// import { IntlMessageFormat } from 'intl-messageformat';
function formatMessage(message, locale, variables) {
  return message + locale + variables;
}
function isMobile(breakPoint) {
  const [width, setWidth] = useState(window.innerWidth);
  const handleWindowResize = useCallback(() => setWidth(window.innerWidth), []);
  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);
  return width > breakPoint ? false : true;
}
function isValidColor(teststr) {
  return CSS.supports(`(color: ${teststr})`);
}

const paddingList = [
  "var(--sl-spacing-xxx-small)",
  "var(--sl-spacing-xx-small)",
  "var(--sl-spacing-x-small)",
  "var(--sl-spacing-small)",
  "var(--sl-spacing-medium)",
  "var(--sl-spacing-large)",
  "var(--sl-spacing-x-large)",
  "var(--sl-spacing-xx-large)",
  "var(--sl-spacing-xxx-large)",
  "var(--sl-spacing-xxxx-large)",
];
const parseBackground = (provided_bg) => {
  if (provided_bg) {
    if (isValidColor(provided_bg)) {
      return provided_bg;
    }
    else {
      return `url(${provided_bg})`;
    }
  }
  else {
    return "";
  }
};
function HeroView(props) {
  const { states, content } = props;
  const getVertivalPadding = (size, half) => {
    const sizes = {
      small: 7,
      medium: 8,
      large: 9,
    };
    var index = sizes[size];
    if (isMobile(767)) {
      index = index - 2;
    }
    else if (isMobile(1023)) {
      index = index - 1;
    }
    return half ? paddingList[index - 2] : paddingList[index];
  };
  const getHorizontalPadding = (size) => {
    if (size == "small") {
      return "1%";
    }
    else if (size == "medium") {
      return "3%";
    }
    else {
      return "5%";
    }
  };
  const style = {
    TwoColumnContainer: {
      display: "flex",
      "@media screen and (max-width: 1023px)": {
        flexDirection: states.wrapDirection == "wrap-reverse" ? "column-reverse" : "column",
        justfiyContent: "center",
      },
    },
    ColumnPadding: {
      paddingTop: states.paddingSize == "none"
        ? "0px"
        : getVertivalPadding(states.paddingSize),
      paddingBottom: states.paddingSize == "none"
        ? "0px"
        : getVertivalPadding(states.paddingSize),
      paddingLeft: states.paddingSize == "none"
        ? "0px"
        : getHorizontalPadding(states.paddingSize),
      paddingRight: states.paddingSize == "none"
        ? "0px"
        : getHorizontalPadding(states.paddingSize),
    },
    ColumnWrapper: {
      "&:first-of-type": {
        background: `no-repeat center/cover ${parseBackground(states.background)}`,
      },
      "&:last-of-type": {
        background: `no-repeat center/cover ${parseBackground(states.secondaryBackground)}`,
      },
      "@media screen and (min-width: 1023px)": { flex: "1 1 0" },
      display: "block",
    },
    SingleColumnContainer: {
      background: `no-repeat center/cover ${parseBackground(states.background)}`,
      flex: "1 1 0",
    },
    Container: {
      width: "100%",
      maxWidth: "var(--sqm-max-width)",
      margin: "0 auto",
      flex: 1,
      display: "flex",
      flexDirection: "column",
      minHeight: "100%",
    },
  };
  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();
  const vanillaStyle = `
  :host{    
    height: 100%;
    display: contents;
  }
  sqm-hero{    
    height: 100%;
    display: contents;
  }
  img{
      max-width: 100%;
      height: auto;
  }
  
`;
  // NOTE: Spacing on the columns is controlled on the slots itself. For example using inline styling
  return (h("div", { class: sheet.classes.Container },
    h("style", { type: "text/css" },
      vanillaStyle,
      styleString),
    states.columns == 2 ? (h("div", { class: sheet.classes.TwoColumnContainer },
      h("div", { class: `${sheet.classes.ColumnWrapper} ${sheet.classes.ColumnPadding}` }, content.primaryColumn),
      h("div", { class: `${sheet.classes.ColumnWrapper} ${sheet.classes.ColumnPadding}` }, content.secondaryColumn))) : (h("div", { class: `${sheet.classes.SingleColumnContainer} ${sheet.classes.ColumnPadding}` }, content.primaryColumn))));
}

export { HeroView as H };
