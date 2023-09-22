import React from "react";
import { AvatarView } from ".";

export default {
  title: "Components / Avatar",
  component: AvatarView,
};

export const Default = () => <AvatarView />;
export const Large = () => <AvatarView large />;
export const Color_1 = () => <AvatarView firstName="Never" lastName="Gonna" />;
export const Color_2 = () => (
  <AvatarView firstName="Coleton" lastName="Annett" />
);
export const Color_3 = () => <AvatarView firstName="Johan" lastName="Venter" />;
export const Color_4 = () => <AvatarView firstName="Kutay" lastName="Cinar" />;
export const Color_5 = () => (
  <AvatarView firstName="Logan" lastName="Volkers" />
);
export const Color_6 = () => <AvatarView firstName="Amy" lastName="Santiago" />;
export const Color_Large = () => (
  <AvatarView firstName="Amy" lastName="Santiago" large />
);

export const FirstNameOnly = () => <AvatarView firstName="Shirley" />;
export const LastNameOnly = () => <AvatarView lastName="Lam" />;
