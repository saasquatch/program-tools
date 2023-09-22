import {
  ModalContentView,
  ModalContentDividerView,
  ModalContentActionView,
  ModalContentTextView,
  ModalContentBannerView,
  ModalContentTopActionView,
  ModalContentCodeView,
  ModalContentFooter,
} from "./ModalContent";
import { ModalView } from "./Modal";

const ModalNamespace = Object.assign(ModalView, {
  ModalContentView,
  ModalContentDividerView,
  ModalContentActionView,
  ModalContentTextView,
  ModalContentBannerView,
  ModalContentTopActionView,
  ModalContentCodeView,
  ModalContentFooter,
});

export { ModalNamespace as ModalView };
