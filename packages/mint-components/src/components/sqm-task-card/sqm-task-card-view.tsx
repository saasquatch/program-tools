import { h, VNode } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";
import { HostBlock } from "../../global/mixins";
import * as SVGs from "./SVGs";
import {
  ProgressBarProps,
  ProgressBarView,
} from "./progress-bar/progress-bar-view";

export type TaskCardViewProps = {
  points?: number;
  cardTitle?: string;
  description?: string;
  showProgressBar?: boolean;
  repeatable?: boolean;
  expire?: boolean;
  dateExpire?: string;
  buttonText?: string;
  buttonLink?: string;
} & ProgressBarProps;

export function TaskCardView(props: TaskCardViewProps): VNode {
  const {
    points = 0,
    cardTitle = "Title Text",
    description = "Description Text",
    showProgressBar = false,
    progress = 0,
    goal = 1,
    repeatable = false,
    expire = false,
    dateExpire = "",
    buttonText = "Button Text",
    buttonLink = "www.example.com",
  } = props;

  console.log({ props });

  const checkmark_circle = SVGs.checkmark_circle();
  const arrow_left_right = SVGs.arrow_left_right();

  const style = {
    HostBlock: HostBlock,
    TaskCard: {
      "& .main > div": {
        margin: "var(--sl-spacing-medium)",
      },
      "& .main": {
        position: "relative",
        boxSizing: "border-box",
        minWidth: "347px",
        background: "var(--sl-color-white)",
        border: "1px solid var(--sl-color-gray-300)",
        borderRadius: "var(--sl-border-radius-medium)",
        fontSize: "var(--sl-font-size-small)",
        lineHeight: "var(--sl-line-height-dense)",
      },
      "& .main.complete": {
        background: "var(--sl-color-primary-50)",
        borderColor: "var(--sl-color-primary-700)",
      },
    },
    Header: {
      display: "flex",
      "& .icon": {
        alignSelf: "center",
        lineHeight: "0",
        color: "var(--sl-color-primary-700)",
        fontSize: "var(--sl-font-size-large)",
        marginRight: "var(--sl-spacing-x-small)",
      },
      "& .value": {
        alignSelf: "center",
        color: "var(--sl-color-black)",
        fontSize: "var(--sl-font-size-x-large)",
        fontWeight: "var(--sl-font-weight-semibold)",
        lineHeight: "100%",
        marginRight: "var(--sl-spacing-xx-small)",
      },
      "& .text": {
        alignSelf: "end",
        textTransform: "uppercase",
        color: "var(--sl-color-gray-600)",
        fontSize: "var(--sl-font-size-x-small)",
        lineHeight: "var(--sl-font-size-medium)",
        marginRight: "var(--sl-spacing-xx-small)",
      },
    },
    Title: {
      color: "var(--sl-color-black)",
      fontSize: "var(--sl-font-size-small)",
    },
    Footer: {
      display: "flex",
      "& .icon": {
        fontSize: "var(--sl-font-size-xx-small)",
        marginRight: "var(--sl-spacing-xx-small)",
      },
      "& .text": {
        marginTop: "auto",
        fontSize: "var(--sl-font-size-x-small)",
        color: "var(--sl-color-gray-600)",
      },
      "& .action": {
        marginTop: "auto",
        marginLeft: "auto",
      },
      "& sl-button.action::part(base) ": {
        color: "var(--sl-color-white)",
        background: "var(--sl-color-primary-500)",
        border: "1px solid var(--sl-color-primary-500)",
        borderRadius: "var(--sl-border-radius-medium)",
      },
    },
  };

  jss.setup(preset());
  const sheet = jss.createStyleSheet(style);
  const styleString = sheet.toString();

  const showComplete = progress >= goal;
  const repetitions = showProgressBar ? Math.floor(progress / goal) : progress;

  console.log({ showProgressBar });
  return (
    <div class={sheet.classes.TaskCard}>
      <div class={showComplete ? "main complete" : "main"}>
        <style type="text/css">{styleString}</style>
        <div class={sheet.classes.Header}>
          {showComplete && <span class="icon">{checkmark_circle}</span>}
          <span class="value">{points}</span>
          <span class="text">{"saasquatch points"}</span>
        </div>
        <div class={sheet.classes.Title}>{cardTitle}</div>
        {showProgressBar && <ProgressBarView {...props} />}
        <Details description={description} />
        <div class={sheet.classes.Footer}>
          <span class="text">
            {repeatable && (
              <div>
                <span class="icon">{arrow_left_right}</span>
                <span>
                  {"Completed "}
                  {repetitions}
                  {" times"}
                </span>
                {/* <br />
                <span>
                  {"Earned "}
                  {points * repetitions}
                  {" SaaSquatch Points"}
                </span> 
                <br />*/}
              </div>
            )}
            {expire && (
              <span>
                {"Ends "} {dateExpire}
              </span>
            )}
          </span>

          <sl-button
            class="action"
            size="small"
            onClick={() => alert(buttonLink)}
            disabled={showComplete && repeatable == false}
          >
            {showComplete && repeatable == false ? "Task completed" : buttonText}
          </sl-button>
        </div>
      </div>
    </div>
  );
}

function Details(props: { description: string }): VNode {
  const style = {
    Description: {
      "& input[type=checkbox]": {
        display: "none",
      },
      "& input:checked ~ .details": {
        transform: "rotate(-180deg)",
      },
      "& .details": {
        position: "absolute",
        top: "var(--sl-spacing-medium)",
        right: "var(--sl-spacing-medium)",
        color: "var(--sl-color-gray-700)",
        fontSize: "var(--sl-font-size-large)",
        "& :hover": {
          color: "var(--sl-color-primary-700)",
        },
        transformOrigin: "50% 37%",
        transition: "transform var(--sl-transition-medium) ease",
      },
      "& input:checked ~ .summary": {
        transition: "max-height var(--sl-transition-medium) ease",
        maxHeight: "300px",
      },
      "& .summary": {
        display: "block",
        overflow: "hidden",
        color: "var(--sl-color-gray-700)",
        fontSize: "var(--sl-font-size-x-small)",
        maxHeight: "0px",
        transition: "max-height var(--sl-transition-fast) ease-out",
      },
    },
  };

  jss.setup(preset());
  const sheet = jss.createStyleSheet(style);
  const styleString = sheet.toString();

  const rid = Math.random().toString(36).slice(2);

  return (
    <div>
      <style type="text/css">{styleString}</style>
      <span class={sheet.classes.Description}>
        <input type="checkbox" id={"details-" + rid} />
        <label class="details" htmlFor={"details-" + rid}>
          <sl-icon name="chevron-down"></sl-icon>
        </label>
        <span class="summary">{props.description}</span>
      </span>
    </div>
  );
}
