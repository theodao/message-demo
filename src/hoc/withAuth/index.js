import React from "react";
import {withRouter} from "react-router-dom";
import firebase from "../../config/firebase";
import Dashboard from "../../routes/Dashboard";
import Login from "../../routes/Login";
import Auth from "../../config/auth";

export default ChildComponent => {
  class AuthComponent extends React.Component {
    componentDidMount() {
      if (!new Auth().isLogin()) {
        console.log("not login");
        this.props.history.push("/login");
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }
  return withRouter(AuthComponent);
};
