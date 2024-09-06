import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export default function MyRoute({ children, isClosed = false }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return isClosed && !isLoggedIn ? <Navigate to="/login" /> : children;
}

/**
 * <Navigate
      to={{ pathname: '/login', state: { prevPath: rest.location.pathname } }}
    />
 */

// Descontinuado pelo React
// MyRoute.defaultProps = {
//   isClosed: false,
// };

MyRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  // eslint-disable-next-line react/require-default-props
  isClosed: PropTypes.bool,
};
