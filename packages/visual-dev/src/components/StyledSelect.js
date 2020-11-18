import React from 'react'
import Select from 'react-select';
import styled from 'styled-components';

const StyledSelectInternal = styled(Select)`
width: ${props => props.width};
height: 100%;
display: inline-block;
.Select-menu-outer {
  z-index:99999
}
&.Select .Select-control {
  border-radius: 0;
  border-top-left-radius: 7px;
  height: 100%;
  background: #003B45;
  border: 0;
  cursor: pointer;

  &:hover, &:focus {
    background: #015d6d;
  }
}

&.Select .Select-control .Select-value {
  line-height: 60px;
  padding: 0 15px 0 15px;

  span {
    color: #fff !important;
    font-weight: normal;
    font-size: 13px;
  }
}

& .Select-input:focus {
  background: transparent;
}

&.Select.is-focused:not(.is-open) > .Select-control {
  background: transparent;
  box-shadow: none;
}

& .Select-control > *:last-child {
  padding-right: 10px;
  padding-left: 10px;
}
/* // STUFF FOR EVENT TABLE */
&.Select-input:focus {
  background-color:#FFF;
  width:200px;
  height:200px;
  z-index:99999;
}
.Select-input > input {
  width:125px!important;
  max-width:125px;
  color:#FFF;
  margin-top:12px;
}
`;

const StyledSelect = (props) => <StyledSelectInternal arrowRenderer={ArrowRenderer} {...props} />

export default StyledSelect;

const Arrow = styled.span`
  color: #969696;
`

export const ArrowRenderer = (props) => {
  const { isOpen } = props;

  if (isOpen) return <Arrow className="icon-sqh-chevron-up"></Arrow>

  return <Arrow className="icon-sqh-chevron-down"></Arrow>
};
