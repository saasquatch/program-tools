import * as React from "react";
import styled, { CSSProp } from "styled-components";
import { IconView } from "../Icon";
import * as Styles from "./Styles";

type ModalProps = OptionProps &
  StyleProps &
  Omit<React.ComponentProps<"div">, "translate" | "css">;

export interface OptionProps {
  /**
   * Title at top of modal
   */
  title: string;
  /**
   * Display the open modal
   */
  open?: boolean;
  /**
   * Callback triggered when the "X" in the top right of the modal is clicked
   */
  onClose: any;
  /**
   * Callback triggered when the primary modal action button is clicked (if available)
   */
  primaryAction?: any;
  /**
   * Callback triggered when the secondary modal action button is clicked (if available)
   */
  secondaryAction?: any;
  /**
   * Z-index used to overlay the modal over existing content (prefer a construct like react portals)
   */
  zIndex?: number;
  /**
   * Content inside the modal under the title
   */
  children: React.ReactNode;
}

export interface StyleProps {
  /**
   * Custon CSS applied to the modal container
   */
  customCSS?: CSSProp;
  /**
   * Custom CSS applied to the modal title
   */
  customTitleCSS?: CSSProp;
}

const ModalBackdrop = styled.div<{ zIndex?: number }>`
  ${Styles.ModalBackdropStyle}
  ${(props) => (props.zIndex ? `z-index: ${props.zIndex};` : "z-index: 1;")}
`;

const ModalDiv = styled.div<{ customCSS?: CSSProp }>`
  ${Styles.ModalDivStyle}
  ${(props) => props.customCSS}
`;

const ModalHeader = styled.div<{ customTitleCSS?: CSSProp }>`
  ${Styles.ModalHeaderStyle}
  ${(props) => props.customTitleCSS}
`;

export const ModalView = React.forwardRef<React.ElementRef<"div">, ModalProps>(
  (props, forwardedRef) => {
    const {
      title,
      open = false,
      onClose,
      zIndex,
      primaryAction,
      secondaryAction,
      children,
      customCSS = {},
      customTitleCSS = {},
      ...rest
    } = props;
    return (
      <div>
        {open && (
          <ModalBackdrop zIndex={zIndex}>
            <ModalDiv {...rest} ref={forwardedRef} customCSS={customCSS}>
              <ModalHeader customTitleCSS={customTitleCSS}>
                {title}
                <IconView
                  icon="close"
                  color="#fff"
                  size="24px"
                  customCSS="vertical-align: bottom; float: right; cursor: pointer; margin-left: 50px;"
                  onClick={onClose}
                />
              </ModalHeader>
              {children}
            </ModalDiv>
          </ModalBackdrop>
        )}
      </div>
    );
  }
);
