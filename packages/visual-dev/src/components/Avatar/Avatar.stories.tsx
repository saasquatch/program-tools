import React from "react";
import { Avatar } from ".";
import { GlobalStyle } from "../GlobalStyle";

export default {
  title: "Components / Avatar",
  component: Avatar,
};

export const Default = () => <Avatar />;
export const Large = () => <Avatar large />;
export const Color_1 = () => <Avatar firstName="Never" lastName="Gonna" />;
export const Color_2 = () => <Avatar firstName="Coleton" lastName="Annett" />;
export const Color_3 = () => <Avatar firstName="Johan" lastName="Venter" />;
export const Color_4 = () => <Avatar firstName="Kutay" lastName="Cinar" />;
export const Color_5 = () => <Avatar firstName="Logan" lastName="Volkers" />;
export const Color_6 = () => <Avatar firstName="Amy" lastName="Santiago" />;
export const Color_Large = () => (
  <Avatar firstName="Amy" lastName="Santiago" large />
);

export const FirstNameOnly = () => <Avatar firstName="Shirley" />;
export const LastNameOnly = () => <Avatar lastName="Lam" />;
