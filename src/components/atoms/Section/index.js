import React from 'react';
import styled from 'styled-components';

const Section = (props) => (
  <Content {...props}>{props.children}</Content>
);

const Content = styled.section`
  cursor: ${props => props.cursor};
  padding: ${props => props.padding};
  font-size: ${props => props.fontSize}px;
  font-weight: ${props => props.fontWeight};
  text-align: ${props => props.textAlign};
  color: ${props => props.color};
  position: ${props => props.position};
  backgroundColor: ${props => props.backgroundColor};
`;

export default Section;
