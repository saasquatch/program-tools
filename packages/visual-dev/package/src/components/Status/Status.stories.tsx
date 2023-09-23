import React from "react";
import { StatusView } from ".";

export default {
  tags: ["autodocs"],
  title: "Components / Staus",
  component: StatusView,
};

export const Approved = () => <StatusView status="approved" />;
