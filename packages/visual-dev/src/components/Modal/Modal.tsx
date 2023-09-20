import * as React from "react";
import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";
import { wrapWc } from "../../wc-react";
import { wcBoolean } from "../../utlis";

type ModalProps = OptionProps &
  StyleProps &
  Partial<React.ComponentProps<"div">>;

export interface OptionProps {
  /**
   * Title at top of modal
   */
  title: string;
  /**
   * Subtitle
   */
  subTitle?: string;
  /**
   * Display the open modal
   */
  open?: boolean;
  /**
   * Callback triggered when the "X" in the top right of the modal is clicked
   */
  onClose: any;
  /**
   * Z-index used to overlay the modal over existing content (prefer a construct like react portals)
   */
  zIndex?: number;
  /**
   * Content inside the modal under the title
   */
  children: React.ReactNode;
  /**
   * Set the footer of modal to stick to bottom when scrolling. Should be set on ModalContentView and footer should be contained in ModalContentFooter
   */
  stickyFooter?: boolean;
}

export interface StyleProps {
  /**
   * Custom CSS applied to the modal container
   */
  customCSS?: CSSProp;
  /**
   * Max width applied to the modal container
   */
  maxWidth?: string;
  /**
   * Custom CSS applied to the modal title
   */
  customTitleCSS?: CSSProp;
}

const ModalBackdrop = styled.div<{
  zIndex?: number;
  customCSS: CSSProp;
  customTitleCSS: CSSProp;
  maxWidth?: string;
}>`
  ${Styles.ModalBackdropStyle}
  ${(props) => (props.zIndex ? `z-index: ${props.zIndex};` : "z-index: 1;")}
  uicl-modal-view::part(title) {
    ${(props) => props.customTitleCSS}
  }
  uicl-modal-view::part(base) {
    ${(props) => props.maxWidth && `max-width: ${props.maxWidth};`}
    ${(props) => props.customCSS}
  }
`;

const UICLModalView = wrapWc("uicl-modal-view");

export const ModalView = React.forwardRef<React.ElementRef<"div">, ModalProps>(
  (props, forwardedRef) => {
    const {
      title,
      subTitle,
      open = false,
      onClose,
      zIndex,
      children,
      customCSS = {},
      customTitleCSS = {},
      ...rest
    } = props;
    return (
      <div>
        {open && (
          <ModalBackdrop
            zIndex={zIndex}
            customCSS={customCSS}
            customTitleCSS={customTitleCSS}
          >
            <UICLModalView
              {...rest}
              ref={forwardedRef}
              show={open}
              title={title}
              subTitle={subTitle}
              hasIframe={wcBoolean(false)}
              hasContentSlot={wcBoolean(true)}
              hasFooterSlot={wcBoolean(true)}
              width="100%"
              close={() => onClose()}
            >
              {children}
            </UICLModalView>
          </ModalBackdrop>
        )}
      </div>
    );
  }
);
