import { h } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";

export interface AssetCardViewProps {
  text: {
    titleText: string;
  };
  imgUrl: string;
  callbacks: {};
}

const style = {
  CardContainer: {
    "box-sizing": "border-box",
    width: "100%",
    "max-width": "260px",
    border: "1px solid #EAEAEA",
    padding: "0px 16px 16px 16px",
    "border-radius": "8px",
  },

  TextContainer: {
    display: "flex",
    "justify-content": "space-between",
    "align-items": "center",
  },

  Title: {
    "font-weight": 600,
    color: "var(--sl-color-gray-800)",
    "max-width": "85%",
    "overflow-wrap": "break-word",
  },

  CardImg: {
    width: "100%",
    height: "228px",
    "border-radius": "4px",
  },

  Icon: {
    "&:hover": {
      cursor: "pointer",
    }
  }
};

jss.setup(preset());
const sheet = jss.createStyleSheet(style);
const styleString = sheet.toString();

export const AssetCardView = (props: AssetCardViewProps) => {
  const {
    text: { titleText },
    imgUrl,
  } = props;

  return (
    <div class={sheet.classes.CardContainer}>
      <style type="text/css">{styleString}</style>
      <div class={sheet.classes.TextContainer}>
        <p class={sheet.classes.Title}>{titleText}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="#000000"
          class={`bi bi-download ${sheet.classes.Icon}`}
          viewBox="0 0 16 16"
        >
          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
          <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
        </svg>
      </div>
      <img src={imgUrl} class={sheet.classes.CardImg} />
    </div>
  );
};
