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