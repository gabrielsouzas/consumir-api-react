import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function MyRoute({ children, isClosed = false, ...rest }) {
  const isLoggedIn = false;

  return isClosed && !isLoggedIn ? (
    <Navigate
      to={{ pathname: '/login', state: { prevPath: rest.location.pathname } }}
    />
  ) : (
    children
  );
}

// Descontinuado pelo React
// MyRoute.defaultProps = {
//   isClosed: false,
// };

MyRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  // eslint-disable-next-line react/require-default-props
  isClosed: PropTypes.bool,
};
