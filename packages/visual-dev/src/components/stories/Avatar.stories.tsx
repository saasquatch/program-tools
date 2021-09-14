import React from "react";
import { Avatar } from "../Avatar";

export default {
  title: "Components / Avatar",
  component: Avatar
}

export const Default = () => <Avatar/>
export const Initials = () => <Avatar firstName="Kutay" lastName="Cinar"/>
export const FirstName = () => <Avatar firstName="Kutay"/>
export const LastName = () => <Avatar lastName="Cinar"/>