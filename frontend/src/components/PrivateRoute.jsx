import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, loggedIn, ...rest }) => {
  const user = localStorage.getItem('user');
  return (
    <Route
      {...rest}
      render={
        props => {
          if (user) {
            return (
              loggedIn
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            );
          } else {
            return (
              loggedIn
                ? <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                : <Component {...props} />
            );
          }
        }
      }
    />
  );
}

export default PrivateRoute;
