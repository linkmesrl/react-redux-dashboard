import React, { Component } from 'react';
import styled from 'styled-components';
import { Section } from 'components';
import { Column, Hidden, Page, Row } from 'hedron';
import { Icon } from 'react-fa';

const MenuIcon = styled(Icon)`
  color: #999;
  cursor: pointer;
`;

const NavigationBar = styled.div`
  position: fixed;
  background: #222;
  width: 100%;
  z-index: 999;
  left: 0;
`;

const NavigationLogo = styled.div`
  color: #ccc;
  padding: 20px 0;
`;


class NavigationContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false
    };
  }

  showMenu = () => {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen
    });
  }

  render() {
    const { className, title, children } = this.props;
    return (
      <nav className={className}>
        <NavigationBar>
          <Page width={'1170px'}>
            <Row divisions={6} justifyContent={'space-between'}>
              <Column fluid xs={6} sm={6} md={3}>
                <Row divisions={4}>
                  <Column fluid xs={3}>
                    <Section padding={'0 20px'}>
                      <NavigationLogo>{title}</NavigationLogo>
                    </Section>
                  </Column>
                  <Column fluid xs={1}>
                    <Hidden lg md>
                      <Section padding={'20px'} textAlign={'right'}>
                        <MenuIcon name={'bars'} onClick={this.showMenu} />
                      </Section>
                    </Hidden>
                  </Column>
                </Row>
              </Column>
              <Column fluid xs={6} sm={6} md={3}>
                <Hidden lg md sm={!this.state.isMenuOpen} xs={!this.state.isMenuOpen}>
                  <Row divisions={children.length}>
                    {children.map((child, i) => (
                      <Column fluid key={i} sm={children.length}>
                        {child}
                      </Column>
                    ))}
                  </Row>
                </Hidden>
                <Hidden xs sm>
                  <Row justifyContent={'flex-end'}>
                    {children}
                  </Row>
                </Hidden>
              </Column>
            </Row>
          </Page>
        </NavigationBar>
      </nav>
    );
  }
}

const Navigation = styled(NavigationContent)`
  background-color: ${props => props.theme.black};
  width: 100%;
  color: #ccc;
`;

export default Navigation;
