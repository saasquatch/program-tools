import React, { useState } from "react";
import { TextareaView } from ".";

export default {
  tags: ["autodocs"],
  title: "Components / Textarea",
  component: TextareaView,
};

export const FunctionalTextarea = () => {
  const [value, setValue] = useState("");
  return (
    <TextareaView
      value={value}
      onChange={(e: { target: { value: string } }) => setValue(e.target.value)}
      disabled={undefined}
      errors={undefined}
    />
  );
};

export const TextareaText = () => <TextareaView value="Textarea Text" />;

export const FullWidth = () => (
  <TextareaView value="Textarea Text" limitWidth={false} />
);

export const CustomHeight = () => (
  <TextareaView value="Textarea Text" height={"300px"} />
);

export const TextareaDisabled = () => (
  <TextareaView value="Textarea Text" disabled />
);

export const Placeholder = () => (
  <TextareaView placeholder="Placeholder Text" />
);

export const PlaceholderDisabled = () => (
  <TextareaView placeholder="Placeholder Text" disabled />
);
export const InvalidField = () => (
  <TextareaView value="Invalid Field" errors={"error"} />
);
