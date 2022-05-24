import styled from "styled-components";

export const Link = styled("a")<{blue?: boolean, bold?: boolean}>`
  padding: 0px;
  margin: 0px;
  border: none;
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-size: 13px;
  background: transparent;
  color: ${props => (props.blue ? '#0088cc' : '#7c7c7c')} ;
  font-weight: ${props => (props.bold ? 'bold' : 'normal')} ;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    color: ${props => (props.blue ? '#005580' : '#606060')} ;
  }
  &:focus {
    color: ${props => (props.blue ? '#005580' : '#606060')} ;
  }
`;