import styled from "styled-components";


export const WidgetContainer = styled.div<{gapSize?: string }>`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    gap: ${props => (props.gapSize ? props.gapSize : '0px')};

    width: 100%;

    background: #FFFFFF;
    border: 1px solid #E2E2E2;
    box-sizing: border-box;
    border-radius: 5px;
`

export const StyledHR = styled.hr`
    width: 100%;
    display: block;
    height: 1px;
    margin: 0;
    border: 0;
    border-top: 1px solid #E2E2E2;
    padding: 0;
`

export const ColumnContainer = styled.div<{gapSize?: string}>`
  display: flex;
  flex-direction: column;
  gap: ${props => (props.gapSize ? props.gapSize : '10px')};
`

export const RowContainer = styled.div<{gapSize?: string}>`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: ${props => (props.gapSize ? props.gapSize : '10px')};
`

export const RJSFContainer = styled.div`
  & input[type=text], & select, & textarea {
    height: 30px;
    width: 270px;

    border-radius: 5px;
    border: solid 2px #e2e2e2;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    box-shadow: none;

    font-family: "Helvetica Neue", Helvetica, sans-serif;
    color: #575757;
    font-size: 14px;

    transition-duration: 0.2s;
  
    &:hover{
        border-color: #c8d2d9;
    }
    &:focus{
        border-color: #448ee1;
    }
  }

`