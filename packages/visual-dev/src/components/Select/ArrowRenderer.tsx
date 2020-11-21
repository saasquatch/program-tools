import React from 'react'
import styled from 'styled-components';

const Arrow = styled.span`
  color: #969696;
`

const ArrowRenderer = (props: { isOpen: boolean }) => {
  const { isOpen } = props;

  if (isOpen) return <Arrow className="icon-sqh-chevron-up"></Arrow>

  return <Arrow className="icon-sqh-chevron-down"></Arrow>
};

export default ArrowRenderer;
