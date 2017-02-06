import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';

const NavigationLinkContent = ({ className, children, to }) => (
  <Link className={className} to={to}>{children}</Link>
);

const NavigationLink = styled(NavigationLinkContent)`
  color: white;
  text-decoration: none;
  color: #ccc;
  margin-left: 15px;
`;

export default NavigationLink;
