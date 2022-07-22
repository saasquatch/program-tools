import {
  ModalContentView,
  ModalContentDividerView,
  ModalContentActionView,
  ModalContentTextView,
  ModalContentBannerView,
  ModalContentTopActionView,
  ModalContentCodeView,
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
});

export { ModalNamespace as ModalView };
