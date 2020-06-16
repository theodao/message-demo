import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import AuthActions from '../../redux/Auth/reducer';
import { ERROR } from '../../config/const';

const Input = styled.input`
  background-color: rgba(241, 241, 241, 0.7);
  width: 100%;
  border-radius: 4px;
  padding: 16px;
  border: 0;
  box-sizing: border-box;
  margin: 16px 0;
  color: #3e3e3e;
`;
const Button = styled.button`
  display: inline-block;
  font-weight: 400;
  line-height: 1.25;
  text-align: center;
  width: 100%;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  padding: .5rem 0;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  margin: 16px 0;
  background-color: #24292ce6;
  &:disabled {
    background-color :grey;
    cursor: no-drop;
  }
}
`;

const Headline = styled.h1``;

const Container = styled.div`
  max-width: 900px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(ERROR.REQUIRED),
  password: yup.string().required(ERROR.REQUIRED),
});

const Login = ({ history, dispatchLogin, auth, dispatchLoginViaPopup }) => {
  const { register, handleSubmit, errors, formState } = useForm({
    validationSchema: schema,
    mode: 'onChange',
  });

  useEffect(() => {
    if (auth.isLoggedIn) {
      history.push('/dashboard');
    }
  }, []);

  const onSubmit = async ({ email, password }) => {
    dispatchLogin({ email, password });
  };

  const handleLoginWithGoogle = async () => {
    dispatchLoginViaPopup();
  };

  const handleSignup = () => {
    history.push('/signup');
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Headline>Welcome to message app !</Headline>
        <Input type="text" placeholder="Email" name="email" ref={register({})} />
        <div className="error">{errors.email && errors.email.message}</div>
        <Input type="password" placeholder="Password" name="password" ref={register({})} />
        <div className="error">{errors.password && errors.password.message}</div>
        <Button
          disabled={Object.keys(errors).length !== 0 || Object.keys(formState.touched).length === 0}
          onClick={handleSubmit(onSubmit)}>
          Log in
        </Button>
        <Button onClick={handleSignup}>Sign up</Button>
        <Button
          onClick={e => {
            e.preventDefault();
            handleLoginWithGoogle();
          }}>
          Log in with Google
        </Button>
      </form>
    </Container>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  dispatchLogin: payload => dispatch(AuthActions.login(payload)),
  dispatchLoginViaPopup: () => dispatch(AuthActions.loginViaPopup()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
