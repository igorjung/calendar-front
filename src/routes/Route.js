// Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export default function RouteWrapper({
  component: Component,
  isPrivate = false,
  ...rest
}) {
  // States from Redux
  const signed = useSelector(state => state.auth.signed);
  const profile = useSelector(state => state.user.profile);

  // States
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  // Page Validation
  if (!signed && isPrivate) {
    return <Redirect to="/auth/signup" />;
  }

  function resizePage() {
    setWindowSize(window.innerWidth);
  }

  // Resize event
  window.onresize = resizePage;

  return (
    <Route
      {...rest}
      render={props => (
        <Component size={windowSize} profile={profile} {...props} />
      )}
    />
  );
}

// Props
RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

// Default Props
RouteWrapper.defaultProps = {
  isPrivate: false,
};
