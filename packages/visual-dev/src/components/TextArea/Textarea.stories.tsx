import React, { useState } from "react";
import { Textarea } from ".";

export default {
  title: "Components / Textarea",
  component: Textarea,
};

export const FunctionalTextarea = () => {
  const [value, setValue] = useState("");
  return (
    <Textarea
      value={value}
      onChange={(e: { target: { value: string } }) => setValue(e.target.value)}
      disabled={undefined}
      errors={undefined}
    />
  );
};

export const TextareaText = () => <Textarea value="Textarea Text" />;

export const FullWidth = () => (
  <Textarea value="Textarea Text" limitWidth={false} />
);

export const TextareaDisabled = () => (
  <Textarea value="Textarea Text" disabled />
);

export const Placeholder = () => <Textarea placeholder="Placeholder Text" />;

export const PlaceholderDisabled = () => (
  <Textarea placeholder="Placeholder Text" disabled />
);
export const InvalidField = () => (
  <Textarea value="Invalid Field" errors={"error"} />
);
