/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styled';

export default function Loading({ isLoading = false }) {
  if (!isLoading) return <></>;
  return (
    <Container>
      <div />
      <span>Carregando...</span>
    </Container>
  );
}

// Loading.defaultProps = {
//   isLoading: false,
// };

Loading.propTypes = {
  // eslint-disable-next-line react/require-default-props
  isLoading: PropTypes.bool,
};
