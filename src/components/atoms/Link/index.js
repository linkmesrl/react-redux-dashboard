import React from 'react';
import { browserHistory } from 'react-router';
import styled from 'styled-components';

const linkTo = (location) => (e) => browserHistory.push(location);
const LinkContent = ({ className, to, children }) => (
  <a className={className} onClick={linkTo(to)}>{children}</a>
);

const Link = styled(LinkContent)`
  cursor: pointer;
`;

export default Link;
