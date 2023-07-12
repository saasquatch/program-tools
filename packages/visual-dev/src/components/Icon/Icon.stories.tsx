import React from "react";
import styled from "styled-components";
import { IconView } from ".";

export default {
  title: "Components / Icon",
  component: IconView,
};

export const add = () => <IconView icon={"add"} />;
export const SizeSmall = () => <IconView size="small" icon={"add"} />;
export const SizeMedium = () => <IconView size="medium" icon={"add"} />;
export const SizeLarge = () => <IconView size="large" icon={"add"} />;
export const SizeBadge = () => <IconView size="badge" icon={"add"} />;
export const SizeCustom = () => <IconView size="88px" icon={"add"} />;
export const CSSCustom = () => (
  <IconView
    customCSS="color: red; width: 50px; height: 50px; margin-left: 50px;"
    icon={"add"}
  />
);
export const close = () => <IconView icon={"close"} />;
export const ChevronDown = () => <IconView icon={"chevron_down"} />;
export const ChevronUp = () => <IconView icon={"chevron_up"} />;
export const calendar = () => <IconView icon={"calendar"} />;
export const block = () => <IconView icon={"block"} />;
export const edit = () => <IconView icon={"edit"} />;
export const checkmark = () => <IconView icon={"checkmark"} />;
export const CheckmarkCircle = () => <IconView icon={"checkmark_circle"} />;
export const actions = () => <IconView icon={"actions"} />;
export const ChevronLeft = () => <IconView icon={"chevron_left"} />;
export const ChevronRight = () => <IconView icon={"chevron_right"} />;
export const DoubleChevronLeft = () => (
  <IconView icon={"double_chevron_left"} />
);
export const DoubleChevronRight = () => (
  <IconView icon={"double_chevron_right"} />
);
export const mail = () => <IconView icon={"mail"} />;
export const action = () => <IconView icon={"action"} />;
export const arrowDropdown = () => <IconView icon={"arrow_dropdown"} />;
export const help = () => <IconView icon={"help"} />;
export const loading = () => (
  <IconView color="var(--sq-action-primary)" icon={"loading"} />
);
export const gift = () => <IconView icon={"gift"} />;
export const copy = () => (
  <IconView color="var(--sq-action-primary)" icon={"copy"} />
);
export const alert = () => <IconView icon={"alert"} />;
export const search = () => <IconView icon={"search"} />;
export const filter = () => <IconView icon={"filter"} />;
export const trash = () => <IconView icon={"trash"} />;
export const info = () => <IconView icon={"info"} />;
export const link_box = () => <IconView icon={"link_box"} />;
export const settings = () => <IconView icon={"settings"} />;
export const avatar = () => <IconView icon={"avatar"} />;
export const leftwardArrow = () => <IconView icon={"leftward_arrow"} />;
export const visibility = () => <IconView icon={"visibility"} />;
export const visibility_alt = () => <IconView icon={"visibility_alt"} />;
export const visibility_cancelled = () => (
  <IconView icon={"visibility_cancelled"} />
);
export const layers = () => <IconView icon={"layers"} />;
export const layers_with_errors = () => (
  <IconView icon={"layers_with_errors"} />
);
export const new_copy = () => <IconView icon={"new_copy"} />;
export const undo = () => <IconView icon={"undo"} />;
export const redo = () => <IconView icon={"redo"} />;
export const outline = () => <IconView icon={"outline"} />;
export const outline_cancelled = () => <IconView icon={"outline_cancelled"} />;
export const code = () => <IconView icon={"code"} />;
export const duplicate = () => <IconView icon={"duplicate"} />;
export const move = () => <IconView icon={"move"} />;
export const empty_package_logo = () => (
  <IconView icon={"empty_package_logo"} />
);
export const vanilla_package_logo = () => (
  <IconView icon={"vanilla_package_logo"} />
);
export const mint_package_logo = () => <IconView icon={"mint_package_logo"} />;
export const paypal_package_logo = () => (
  <IconView icon={"paypal_package_logo"} />
);
export const default_package_logo = () => (
  <IconView icon={"default_package_logo"} />
);
export const bedrock_package_logo = () => (
  <IconView icon={"bedrock_package_logo"} />
);
export const npm_logo = () => <IconView icon={"npm_logo"} />;
export const desktop = () => <IconView icon={"desktop"} />;
export const tablet = () => <IconView icon={"tablet"} />;
export const mobile = () => <IconView icon={"mobile"} />;
export const bold_text = () => <IconView icon={"bold_text"} />;
export const italic_text = () => <IconView icon={"italic_text"} />;
export const underline_text = () => <IconView icon={"underline_text"} />;
export const strikethrough_text = () => (
  <IconView icon={"strikethrough_text"} />
);
export const link_text = () => <IconView icon={"link_text"} />;
export const link_break = () => <IconView icon={"break_link"} />;
export const trash_alt = () => <IconView icon={"trash_alt"} />;
export const paintbrush = () => <IconView icon={"paintbrush"} />;
export const alert_alt = () => <IconView icon={"alert_alt"} />;
export const templates = () => <IconView icon={"templates"} />;
export const shuffle = () => <IconView icon={"shuffle"} />;
export const microsite = () => <IconView icon={"microsite"} />;
export const widgets = () => <IconView icon={"widgets"} />;
export const file = () => <IconView icon={"file"} />;
export const edit_square = () => <IconView icon={"edit_square"} />;
export const envelope = () => <IconView icon={"envelope"} />;
export const filled_package_logo = () => (
  <IconView icon={"filled_package_logo"} />
);
export const open_tab = () => <IconView icon={"open_tab"} />;
export const refresh = () => <IconView icon={"refresh"} />;

const TestTooltipDiv = styled.div`
  margin: 50px 50%;
`;
export const IconWithTooltip = () => (
  <TestTooltipDiv>
    <IconView icon={"add"} tooltip="Tooltip description" />
  </TestTooltipDiv>
);
export const tooltipBottom = () => (
  <TestTooltipDiv>
    <IconView
      icon={"add"}
      tooltip="Tooltip description"
      tooltipDirection="bottom"
    />
  </TestTooltipDiv>
);
export const tooltipLeft = () => (
  <TestTooltipDiv>
    <IconView
      icon={"add"}
      tooltip="A tooltip that explains something in detail"
      tooltipDirection="left"
    />
  </TestTooltipDiv>
);
export const tooltipRight = () => (
  <TestTooltipDiv>
    <IconView
      icon={"add"}
      tooltip="A tooltip that explains something in detail"
      tooltipDirection="right"
    />
  </TestTooltipDiv>
);
export const tooltipMaxWidth = () => (
  <TestTooltipDiv>
    <IconView
      icon={"add"}
      tooltip="A tooltip that explains something in detail. This is a longer tooltip."
      tooltipDirection="bottom"
      tooltipMaxWidth="400px"
    />
  </TestTooltipDiv>
);
export const tooltipCustomCSS = () => (
  <TestTooltipDiv>
    <IconView
      icon={"add"}
      tooltip="A tooltip that explains something in detail. This is a longer tooltip."
      tooltipDirection="right"
      tooltipMaxWidth="200px"
      tooltipCustomCSS={{
        fontSize: "20px",
        fontWeight: "bold",
        textAlign: "center",
      }}
    />
  </TestTooltipDiv>
);
export const first = () => <IconView icon={"first_badge"} />;
export const infinity = () => <IconView icon={"infinity"} />;
export const gift_filled = () => <IconView icon={"gift_filled"} />;
export const data = () => <IconView icon={"data"} />;
export const long_right_arrow = () => <IconView icon={"long_right_arrow"} />;
export const long_left_arrow = () => <IconView icon={"long_left_arrow"} />;
export const long_both_arrow = () => <IconView icon={"long_both_arrow"} />;
export const ssqt_logo = () => <IconView icon={"ssqt_logo"} />;
export const hubspot_logo = () => <IconView icon={"hubspot_logo"} />;
export const ssqt_arrow = () => <IconView icon={"ssqt_arrow"} />;
export const hubspot_arrow = () => <IconView icon={"hubspot_arrow"} />;
export const hubspot_ssqt_arrow = () => (
  <IconView icon={"hubspot_ssqt_arrow"} />
);
export const checkmark_circle_filled = () => (
  <IconView icon={"checkmark_circle_filled"} />
);
export const globe = () => <IconView icon={"globe"} />;
export const lock = () => <IconView icon={"lock"} />;
export const unlock = () => <IconView icon={"unlock"} />;
export const cookie = () => <IconView icon={"cookie"} />;
