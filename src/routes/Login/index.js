import React from "react";
import styled from "styled-components";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import * as yup from "yup";
import firebase from "../../config/firebase";

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
  padding: .5rem 1rem;
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
  display: flex;
  height: 100vh;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup.string().required(),
});

const Login = ({history}) => {
  const {register, handleSubmit, errors} = useForm({
    validationSchema: schema,
  });

  const onSubmit = async ({email, password}) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        console.log(user);
      })
      .catch(err => toast.error(err.message));
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Headline>Welcome to personal blog !</Headline>
        <Input type="text" placeholder="Email" name="email" ref={register({})} />
        <div className="error">{errors.email && errors.email.message}</div>
        <Input type="password" placeholder="Password" name="password" ref={register({})} />
        <div className="error">{errors.password && errors.password.message}</div>
        <Button disabled={errors.password || errors.username}>Log in</Button>
        {/* <Button>Sign up</Button> */}
        <Button onClick={() => {}}>Log in with Google</Button>
        <Button>Log in with Facebook</Button>
      </form>
    </Container>
  );
};

export default Login;
