import React from 'react';
import styled from 'styled-components';
import { Section } from 'components';
import { Row } from 'hedron';
import { Icon } from 'react-fa';

const BoxContainer = ({ className, padding, title, overflow, onRemove, children }) => (
  <div className={className}>
    <BoxHeader>
      <Row justifyContent={'space-between'}>
        <div>{title}</div>
        {onRemove &&
          <BoxIcon name={'trash-o'} onClick={onRemove} />
        }
      </Row>
    </BoxHeader>
    <Section padding={padding}>{children}</Section>
  </div>
);

const BoxHeader = styled.div`
  background-color: ${props => props.theme.greyLight};
  border-bottom: 1px solid ${props => props.theme.greyMed};
  padding: 10px;
  text-transform: capitalize;
`;

const BoxIcon = styled(Icon)`
  color: #999;
  cursor: pointer;
`;

const Box = styled(BoxContainer)`
  border: 1px solid ${props => props.theme.greyMed};
  border-radius: 5px;
  overflow: ${props => props.overflow};
`;

export default Box;
