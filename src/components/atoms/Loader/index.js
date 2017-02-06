import React from 'react';
import { Row } from 'hedron';
import { Section } from 'components';

const Loader = ({ message, fontSize, height }) => (
  <Row
    alignItems={'center'}
    justifyContent={'center'}
    style={{ height: height }}
  >
    <Section fontSize={fontSize}>
      {message}
    </Section>
  </Row>
);

export default Loader;
