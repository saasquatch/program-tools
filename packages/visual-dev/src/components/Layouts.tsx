import styled from "styled-components";


export const WidgetContainer = styled.div<{gapSize?: string }>`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: var(--sq-spacing-large);
    gap: ${props => (props.gapSize ? props.gapSize : '0')};

    width: 100%;

    background: var(--sq-surface);
    border: 1px solid var(--sq-border);
    box-sizing: border-box;
    border-radius: 5px;
`

export const StyledHR = styled.hr`
    width: 100%;
    display: block;
    height: 1px;
    margin: 0;
    border: 0;
    border-top: 1px solid var(--sq-border);
    padding: 0;
`

export const ColumnContainer = styled.div<{gapSize?: string}>`
  display: flex;
  flex-direction: column;
  gap: ${props => (props.gapSize ? props.gapSize : 'var(--sq-spacing-small)')};
`

export const RowContainer = styled.div<{gapSize?: string}>`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: ${props => (props.gapSize ? props.gapSize : 'var(--sq-spacing-small)')};
`

export const RJSFContainer = styled.div`
  
  & fieldset {
    border: 0;
  }

& input[type=text], & select, & textarea {

    border-radius: 5px;
    border: solid 2px var(--sq-border);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    box-shadow: none;

    font-family: "Helvetica Neue", Helvetica, sans-serif;
    color: var(--sq-text);
    font-size: var(--sq-font-size-regular);

    transition-duration: 0.2s;
  
    &:hover{
        border-color: var(--sq-action-secondary-border);
    }
    &:focus{
        border-color: var(--sq-focused);
    }
  }

  & .field-description {
    margin-top: 0;
    margin-bottom: var(--sq-spacing-small);
  }
  
  & textarea {
    width: 400px;
  }

  & input[type=text], & select {
    height: 30px;
    width: 270px;
  }

  & select {
    padding: 0;
    padding-left: var(--sq-spacing-small);
    padding-right: var(--sq-spacing-xxx-small);
  }

  & input[type=text] {
    padding-left: var(--sq-spacing-small);
    padding-right: var(--sq-spacing-xxx-small);
  }

  & * {
    &:disabled{
      cursor: default;
    }
  }
`