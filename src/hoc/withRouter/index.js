import React from "react";
import {withRouter} from "react-router-dom";
import firebase from "../../config/firebase";

export default ChildComponent => {
  class AuthComponent extends React.Component {
    componentDidMount() {
      firebase.auth().onAuthStateChanged(user => {
        console.log(user);
        if (user) {
          setUser(user);
        } else {
          this.props.push("/login");
        }
      });
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }
  return withRouter(AuthComponent);
};
