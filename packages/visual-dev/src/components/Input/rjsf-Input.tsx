import { WidgetProps } from "@rjsf/core";
import React, { useState } from "react";
import { IconButton } from "../Button";
import { Input } from "./Input";

export function RJSFInput(props: WidgetProps) {
  return (
    <Input
      value={props.value}
      onChange={(e: any) => props.onChange(e.target.value)}
      disabled={props.disabled}
      errors={props.rawErrors}
    />
  );
}

export function RJSFNumericalInput(props: WidgetProps) {
  return (
    <Input
      value={props.value}
      type="number"
      onChange={(e: any) => props.onChange(e.target.value)}
      disabled={props.disabled}
      errors={props.rawErrors}
    />
  );
}

export function RJSFLockableInput(props: WidgetProps) {
  const [locked, setLocked] = useState(props.disabled);
  return (
    <Input
      value={props.value}
      onChange={(e: any) => props.onChange(e.target.value)}
      disabled={locked}
      errors={props.rawErrors}
      buttons={
        <IconButton
          icon="edit"
          size="mini"
          css="position: relative; left: -30px; border: none; :hover{background: none; color: var(--sq-text-subdued)}"
          icon_css="margin: -10px; top: 8px; height: 20px; width: 20px"
          onClick={() => {
            setLocked(!locked);
          }}
        />
      }
    />
  );
}

export function RJSFClearableInput(props: WidgetProps) {
  return (
    <Input
      value={props.value}
      onChange={(e: any) => props.onChange(e.target.value)}
      disabled={props.disabled}
      errors={props.rawErrors}
      buttons={
        <IconButton
          disabled={props.disabled}
          icon="close"
          size="mini"
          css={`position: relative; left: -30px; border: none; background: none !important; :hover{ color: var(--sq-text-subdued)}`}
          icon_css="margin: -10px; top: 8px; height: 20px; width: 20px"
          onClick={() => {
            props.onChange("");
          }}
        />
      }
    />
  );
}

export function RJSFCancellableInput(props: WidgetProps) {
  const [oldValue, setOldValue] = useState(props.value);
  const [locked, setLocked] = useState(props.disabled);
  return (
    <Input
      value={props.value}
      onChange={(e: any) => props.onChange(e.target.value)}
      disabled={locked}
      errors={props.rawErrors}
      buttons={
        locked == true ? (
          <IconButton
            icon="edit"
            size="mini"
            css="position: relative; left: -30px;"
            primary
            icon_css="margin: -10px; top: 9px;"
            onClick={() => {
              setLocked(false);
            }}
          />
        ) : (
          <>
            <IconButton
              icon="checkmark"
              size="mini"
              css="position: relative; left: -50px;"
              primary
              icon_css="margin: -10px; top: 9px;"
              onClick={() => {
                setOldValue(props.value);
                setLocked(true);
              }}
            />
            <IconButton
              icon="close"
              size="mini"
              css="position: relative; left: -47px;"
              icon_css="margin: -10px; top: 8px;  color: #858585"
              onClick={() => {
                props.onChange(oldValue);
                setLocked(true);
              }}
            />
          </>
        )
      }
    />
  );
}
