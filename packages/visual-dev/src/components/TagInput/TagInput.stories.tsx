import React, { useCallback, useEffect, useState } from "react";
import { TagInputView, TagInputViewProps, TagView } from "./TagInput";

export default {
  title: "Components / Email Input",
  component: TagInputView,
};

const defaultProps: TagInputViewProps = {
  tagSlot: [
    <TagInputView.TagView onDelete={() => {}} id={0}>
      test1@example.com
    </TagInputView.TagView>,
    <TagInputView.TagView onDelete={() => {}} id={1}>
      test1@example.com
    </TagInputView.TagView>,
  ],
};

export const Default = () => {
  return <TagInputView {...defaultProps} />;
};

export const FullWidth = () => {
  return <TagInputView {...{ ...defaultProps, limitWidth: false }} />;
};

function useTagInput(
  onChange: (value: string) => void,
  initialValue: string | undefined
) {
  const [_value, setValue] = useState(initialValue?.split(",") || []);
  const ref = React.useRef<HTMLSpanElement | null>(null);

  const createCodes = ["Enter", "Comma", "Space"];
  const deleteCodes = ["Backspace"];

  const onKeyDown = useCallback(
    (e) => {
      const code = e.code;
      if (createCodes.includes(code)) {
        e.preventDefault();

        if (e.target.innerText !== "") {
          setValue((prev) => {
            const next = [...prev, e.target.innerText];
            onChange(next.join(","));
            return next;
          });

          e.target.innerText = "";
        }

        return;
      }

      if (deleteCodes.includes(code)) {
        if (e.target.innerText.length === 0) {
          e.preventDefault();
          setValue((prev) => {
            const next = [...prev.slice(0, prev.length - 1)];
            onChange(next.join(","));
            return next;
          });
        }
      }
    },
    [setValue, onChange]
  );
  const onKeyUp = useCallback(
    (e) => {
      const code = e.code;
      if (!createCodes.includes(code) && !deleteCodes.includes(code)) {
        onChange([..._value, e.target.innerText].join(","));
      }
    },
    [onChange, _value]
  );

  useEffect(() => {
    if (!ref.current) return;

    ref.current.addEventListener("keydown", onKeyDown);
    ref.current.addEventListener("keyup", onKeyUp);

    // Attach listeners
    return () => {
      ref.current?.removeEventListener("keydown", onKeyDown);
      ref.current?.removeEventListener("keyup", onKeyUp);
    };
  }, [ref.current, onKeyDown, onKeyUp]);

  useEffect(() => {
    if (!ref.current) return;

    const splitVal = initialValue?.split(",") || [""];
    ref.current.innerText = splitVal[splitVal.length - 1];
  }, []);

  const onDeleteTag = (idx: number) => {
    setValue((prev) => {
      const next = [...prev.slice(0, idx), ...prev.slice(idx + 1, prev.length)];

      onChange(next.join(","));

      return next;
    });
  };

  return {
    ref,
    tagSlot: _value?.map((v, idx) => (
      <TagView onDelete={onDeleteTag} id={idx}>
        {v}
      </TagView>
    )),
  };
}

export const Functional = () => {
  return (
    <TagInputView
      {...useTagInput((v: string) => console.log("test", v), undefined)}
    />
  );
};
