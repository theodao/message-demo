import React, {useEffect} from "react";
import styled from "styled-components";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import fire from "firebase";
import * as yup from "yup";
import firebase, {providers} from "../../config/firebase";
import Auth from "../../config/auth";
import {ERROR} from "../../config/const";

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

const Flex = styled.div`
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

const Login = ({history}) => {
  const {register, handleSubmit, errors, formState} = useForm({
    validationSchema: schema,
    mode: "onChange",
  });

  useEffect(() => {
    if (new Auth().isLogin()) {
      history.push("/dashboard");
    }
  }, []);

  const onSubmit = async ({email, password}) => {
    const result = await new Auth().loginViaEmail({email, password});
    if (result.success) {
      history.push("/dashboard");
    } else {
      toast.error(result.message);
    }
  };

  const handleLoginWithGoogle = async () => {
    const response = await new Auth().logInViaPopup();
    if (response.success) {
      history.push("/dashboard");
    }
  };

  const handleSignup = () => {
    history.push("/signup");
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
        <Button onClick={handleLoginWithGoogle}>Log in with Google</Button>
      </form>
    </Container>
  );
};

export default Login;
