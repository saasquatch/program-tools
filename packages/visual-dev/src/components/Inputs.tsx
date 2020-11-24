import styled from "styled-components";

export const GenericInput = styled.input<{
  width?: string;
  minWidth?: string;
  maxWidth?: string;
}>`
    display: inline-block;
    height: 30px;
    ${(props) => props.width && `width: ${props.width};`}
    ${(props) => props.minWidth && `min-width: ${props.minWidth};`}
    ${(props) => props.maxWidth && `max-width: ${props.maxWidth};`}

    border-radius: 5px;
    border: solid 2px #e2e2e2;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;

    font-family: "Helvetica Neue", Helvetica, sans-serif;
    color: ${(props) => props.color || `#575757`};
    font-size: 14px;

    transition-duration: 0.2s;
  
    &:hover{
        border-color: #c8d2d9;
    }
    &:focus{
        border-color: #448ee1;
    }
`;

export const StyledSelect = styled.select<{
  width?: string;
  minWidth?: string;
  maxWidth?: string;
}>`
    height: 30px;
    display: inline-block;
    ${(props) => props.width && `width: ${props.width};`}
    ${(props) => props.minWidth && `min-width: ${props.minWidth};`}
    ${(props) => props.maxWidth && `max-width: ${props.maxWidth};`}
    
    border-radius: 5px;
    border: solid 2px #e2e2e2;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;

    font-family: "Helvetica Neue", Helvetica, sans-serif;
    color: ${(props) => props.color || `#575757`};
    font-size: 14px;

    transition-duration: 0.2s;
    
    & option {
        font-family: "Helvetica Neue", Helvetica, sans-serif;
        color: ${(props) => props.color || `#575757`};
        font-size: 14px;
    }
    display: inline-block;
    &:hover{
      border-color: #c8d2d9;
    }
`;

export const PencilButton = styled.button`
  padding: 0;
  border: none;
  background: transparent;
  color: #428bca;
  outline:none;
  position: relative;
  top: 36px;
  left: 177px;
  &:hover {
    color: #005580;
  }
`

export const EditPencil = styled.span`
  text-decoration: none;
  &:hover, &:active, &:visited {
    text-decoration: none;
  }
`