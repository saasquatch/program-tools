import * as React from "react";
import { useState } from "react";
import styled, { CSSProp } from "styled-components";
import { Badge } from "../Badge";
import { Button, IconButton } from "../Button";
import { Icon } from "../Icon";
import { Input } from "../Input";
import * as Styles from "./Styles";

type CardProps = OptionProps &
  StyleProps &
  Omit<React.ComponentProps<"div">, "translate" | "css">;

interface OptionProps {
  /**
   * Card title
   */
  title?: string;
  /**
   * Card footer content
   */
  children?: string | React.ReactNode;
  /**
   * Enable edit mode
   */
  edit?: boolean;
}

interface StyleProps {
  /**
   * Custom CSS applied to Card
   */
  customCSS?: CSSProp;
}

const CardStyle = styled.div<Required<StyleProps>>`
  ${Styles.cardEdit}
  ${(props) => props.customCSS}
`;
const CardHeader = styled.div`
  ${Styles.cardEditHeader}
`;
const CardHeaderIcon = styled.div`
  ${Styles.cardEditHeaderIcon}
`;
const CardHeaderText = styled.div`
  ${Styles.cardEditHeaderText}
`;
const TextTitle = styled.div`
  ${Styles.cardEditTextTitle}
`;

const TextDesc = styled.div`
  ${Styles.cardEditTextDesc}
`;

export const CardEdit = React.forwardRef<React.ElementRef<"div">, CardProps>(
  (props, forwardedRef) => {
    const { title, edit = false, children, customCSS = {}, ...rest } = props;
    // const [oldValue, setOldValue] = useState("");
    const [locked, setLocked] = useState(false);
    return (
      <CardStyle {...rest} ref={forwardedRef} customCSS={customCSS}>
        <CardHeader>
          <CardHeaderIcon>
            <Icon
              icon="calendar"
              size="large"
              customCSS=""
              color="var(--sq-text-subdued)"
            />
          </CardHeaderIcon>
          {edit && (
            <>
              <Input
                placeholder="Edit Program Name"
                disabled={locked}
                buttons={
                  locked == true ? (
                    <IconButton
                      icon="edit"
                      size="mini"
                      customCSS="position: relative; left: -30px;"
                      primary
                      icon_css="margin: -10px; top: 9px;"
                      onClick={() => {
                        setLocked(false);
                      }}
                    />
                  ) : (
                    <>
                      <IconButton
                        icon="checkmark"
                        size="mini"
                        customCSS="position: relative; left: -50px;"
                        primary
                        icon_css="margin: -10px; top: 9px;"
                        onClick={() => {
                          setLocked(true);
                        }}
                      />
                      <IconButton
                        icon="close"
                        size="mini"
                        customCSS="position: relative; left: -47px;"
                        icon_css="margin: -10px; top: 8px;  color: #858585"
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
              <CardHeaderText>
                <TextTitle>
                  {title}
                  <Icon
                    size="25px"
                    icon="edit"
                    customCSS="margin: -5px; margin-left: 0; :hover{color: #0275FB	;}"
                  />
                  <Badge
                    status="success"
                    customCSS="display: inline; margin-left: 16px; font-size: 12px; padding: 1px 15px; "
                  >
                    Live
                  </Badge>
                </TextTitle>
                <TextDesc>{children}</TextDesc>
              </CardHeaderText>
            </>
          )}
          <Button
            buttonType="secondary"
            pill
            customCSS="margin-left: auto; float: right;"
          >
            Edit
          </Button>
        </CardHeader>
      </CardStyle>
    );
  }
);
