import React from "react";
import Auth from "../../config/auth";
import {Route, Redirect} from "react-router-dom";

export default ({component: Component, ...props}) => {
  return (
    <Route
      {...props}
      render={_props => {
        if (new Auth().isLogin()) {
          return <Component {..._props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: _props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};
