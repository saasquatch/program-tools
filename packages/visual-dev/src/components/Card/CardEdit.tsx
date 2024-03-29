import * as React from "react";
import { useState } from "react";
import styled, { CSSProp } from "styled-components";
import { BadgeView } from "../Badge";
import { Button, IconButton, IconButtonView } from "../Button";
import { IconView } from "../Icon";
import { InputView } from "../Input";
import * as Styles from "./Styles";

type CardProps = OptionProps &
  StyleProps &
  Partial<React.ComponentProps<"div">>;

interface OptionProps {
  /**
   * Title displayed at the top of the card right of the icon
   */
  title?: string;
  /**
   * Content displayed in the card below the title/icon
   */
  children?: string | React.ReactNode;
  /**
   * Enable edit mode
   */
  edit?: boolean;
}

interface StyleProps {
  /**
   * Custom CSS applied to the card container
   */
  customCSS?: CSSProp;
}

const CardDiv = styled.div<Required<StyleProps>>`
  ${Styles.CardEditDiv}
  ${(props) => props.customCSS}
`;
const CardHeaderDiv = styled.div`
  ${Styles.CardEditHeaderDiv}
`;
const CardHeaderIconDiv = styled.div`
  ${Styles.CardEditHeaderIconDiv}
`;
const CardHeaderTextDiv = styled.div`
  ${Styles.CardEditHeaderTextDiv}
`;
const TitleTextDiv = styled.div`
  ${Styles.CardEditTitleTextDiv}
`;

const TextDescscriptionDiv = styled.div`
  ${Styles.CardEditTextDescriptionDiv}
`;

export const CardEditView = React.forwardRef<
  React.ElementRef<"div">,
  CardProps
>((props, forwardedRef) => {
  const { title, edit = false, children, customCSS = {}, ...rest } = props;
  // const [oldValue, setOldValue] = useState("");
  const [locked, setLocked] = useState(false);
  return (
    <CardDiv {...rest} ref={forwardedRef} customCSS={customCSS}>
      <CardHeaderDiv>
        <CardHeaderIconDiv>
          <IconView
            icon="calendar"
            size="large"
            customCSS=""
            color="var(--sq-text-subdued)"
          />
        </CardHeaderIconDiv>
        {edit && (
          <>
            <InputView
              placeholder="Edit Program Name"
              disabled={locked}
              buttons={
                locked == true ? (
                  <IconButton
                    icon="edit"
                    size="mini"
                    customCSS="position: relative; left: -30px;"
                    primary
                    onClick={() => {
                      setLocked(false);
                    }}
                  />
                ) : (
                  <>
                    <IconButtonView
                      icon="checkmark"
                      size="mini"
                      primary
                      customCSS={"margin-right: 4px;"}
                      onClick={() => {
                        setLocked(true);
                      }}
                    />
                    <IconButtonView
                      icon="close"
                      size="mini"
                      icon_css="color: #858585;"
                      onClick={() => {
                        setLocked(true);
                      }}
                    />
                  </>
                )
              }
            />
          </>
        )}
        {!edit && (
          <>
            <CardHeaderTextDiv>
              <TitleTextDiv>
                {title}
                <IconView
                  size="25px"
                  icon="edit"
                  customCSS="margin: -5px; margin-left: 0; :hover{color: #0275FB	;}"
                />
                <BadgeView
                  status="success"
                  customCSS="display: inline; margin-left: 16px; font-size: 12px; padding: 1px 15px; "
                >
                  Live
                </BadgeView>
              </TitleTextDiv>
              <TextDescscriptionDiv>{children}</TextDescscriptionDiv>
            </CardHeaderTextDiv>
          </>
        )}
        <Button
          buttonType="secondary"
          pill
          customCSS="margin-left: auto; float: right;"
        >
          Edit
        </Button>
      </CardHeaderDiv>
    </CardDiv>
  );
});

/**
 * @deprecated use {@link CardEditView} instead
 */
export const CardEdit = CardEditView;
