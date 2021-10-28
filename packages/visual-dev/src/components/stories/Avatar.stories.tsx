import React from "react";
import { Avatar } from "../Avatar";

export default {
  title: "Components / Avatar",
  component: Avatar,
  parameters: {
    matrix: {
      pattern: {
        large: [false, true],
      },
      // backgroundColor: "rgba(0,0,0,0.7)", // Optional: If you want to change backgournd color
      // showOriginal: true, // Optional: If you want to show original component set to true
    },
  },
};

export const Default = () => <Avatar />;
export const Color_1 = () => <Avatar firstName="Never" lastName="Gonna" />;
export const Color_2 = () => <Avatar firstName="Coleton" lastName="Annett" />;
export const Color_3 = () => <Avatar firstName="Johan" lastName="Venter" />;
export const Color_4 = () => <Avatar firstName="Kutay" lastName="Cinar" />;
export const Color_5 = () => <Avatar firstName="Logan" lastName="Volkers" />;
export const Color_6 = () => <Avatar firstName="Amy" lastName="Santiago" />;

export const FirstNameOnly = () => <Avatar firstName="Shirley" />;
export const LastNameOnly = () => <Avatar lastName="Lam" />;
