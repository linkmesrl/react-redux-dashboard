import React, { Component } from 'react';
import { Link } from 'components';
import styled from 'styled-components';

const NavigationItemContent = styled.li`
  padding: 20px;
  list-style: none;
  background: ${props => props.isSelected ? '#444' : 'none'};
`;

class NavigationItem extends Component {
  render() {
    const { children, to, current } = this.props;
    return (
      <NavigationItemContent isSelected={current === to}>
        <Link to={to}>{children}</Link>
      </NavigationItemContent>
    );
  }
}

export default NavigationItem;
