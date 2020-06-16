import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export default ChildComponent => {
  class AuthComponent extends React.Component {
    componentDidMount() {
      const { auth } = this.props;

      if (!auth.isLoggedIn) {
        this.props.history.push('/login');
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    auth: state.auth,
  });

  return withRouter(connect(mapStateToProps)(AuthComponent));
};
