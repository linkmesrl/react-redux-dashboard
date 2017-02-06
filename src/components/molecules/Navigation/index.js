import React from 'react';
import styled from 'styled-components';
import { Section } from 'components';
import { Column, Page, Row } from 'hedron';

const NavigationContent = ({ className, title, children }) => (
  <nav className={className}>
    <Page width={'1170px'}>
      <Section padding={'20px 0'}>
        <Row divisions={2} justifyContent={'space-between'}>
          <Column fluid sm={2} md={1}>
            <NavigationLogo>{title}</NavigationLogo>
          </Column>
          <Column fluid sm={2} md={1}>
            <Row justifyContent={'flex-end'}>
              {children}
            </Row>
          </Column>
        </Row>
      </Section>
    </Page>
  </nav>
);

const NavigationLogo = styled.div`
  color: #ccc;
`;

const Navigation = styled(NavigationContent)`
  background-color: ${props => props.theme.black};
  width: 100%;
  color: #ccc;
`;

export default Navigation;
