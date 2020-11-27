import React from "react";
import styled from "styled-components";

export interface DetailedRadioProps {
  checked: boolean;
  onChange: (p: string) => void;
  label: string;
  description: string;
  id: string;
  name: string;
  disabled?: boolean;
  value: string;
}

const StandardizedRadioStyles = styled.div`
  input[type="radio"] {
    /**
 * handles the default elements
 */
    float: left;
    clear: both;
    margin: 0;
    outline: none;
    -webkit-appearance: none;
    cursor: pointer;
  }

  /**
   * Styles the label
   */
  input[type="radio"] + label {
    display: inline-block;
    color: #575757;
    font-size: 13px;
    align-content: flex-start;
    position: relative;
    margin-left: 32px;
    padding-top: 1px;
  }

  /**
 * builds the radio button
 */
  input[type="radio"] + label:before {
    content: "";
    position: absolute;
    top: 2px;
    left: -32px;
    cursor: pointer;
    display: inline-block;
    box-sizing: border-box;
    width: 16px;
    height: 16px;
    font-weight: 900;
    font-family: "icomoon";
    padding: 0.125em;
    margin-right: 0.125em;
    color: transparent;
    border: 1px solid #ccc;
    background-color: #fff;
    vertical-align: middle;
    padding-top: 0px;
  }

  /**
 * styles the radio button
 */
  input[type="radio"] + label:before {
    content: "";
    border-radius: 50%;
  }
  /**
 * support focused on firefox
 */
  @-moz-document url-prefix() {
    input[type="radio"]:focus + label:before,
    input[type="checkbox"]:focus + label:before {
      outline: 1px auto Highlight;
    }
  }

  /**
 * handles ie 10+
 */
  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    input[type="radio"] + label {
      padding: 3px;
    }

    input[type="radio"] + label:before {
      padding: 0.15em;
    }
  }

  /**
 * handles checked
 */
  input[type="radio"]:checked + label:before {
    border-radius: 50%;
    border-color: #f5a841;
    background: radial-gradient(circle at center, #f5a841 40%, white 0);
  }

  /**
 * handles focused
 */
  input[type="radio"]:focus + label:before {
    outline: none;
  }

  /**
 * handles disabled
 */
  input[type="radio"]:disabled + label,
  input[type="radio"]:disabled + label:before,
  input[type="radio"]:disabled:checked + label:before {
    cursor: default;
  }

  input[type="radio"]:disabled + label,
  input[type="radio"]:disabled:checked + label:before {
    color: #bbbbbb;
  }
`;

const Label = styled.div`
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  padding-bottom: 8px;
  cursor: pointer;
`;
const Description = styled.div`
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  color: #999;
  font-weight: normal;
  word-wrap: break-word;
  width: auto;
  margin-bottom: 16px;
  line-height: 16px;
  font-size: 12px;
  cursor: pointer;
`;

const DetailedRadio: React.FC<DetailedRadioProps> = ({
  checked,
  onChange,
  label,
  id,
  name,
  description,
  disabled = false,
  value,
}) => {
  console.log("NAME", name)
  return (
    <>
      <StandardizedRadioStyles>
        <input
          id={id}
          readOnly
          name={name}
          type="radio"
          onClick={() => onChange(value)}
          checked={checked}
          disabled={disabled}
        />
        <label htmlFor={id}>
          <Label>{label}</Label>
          <Description>{description}</Description>
        </label>
      </StandardizedRadioStyles>
    </>
  );
};

export default DetailedRadio;
