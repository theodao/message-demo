import React from "react";
import styled from "styled-components";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import * as yup from "yup";
import {ERROR} from "../../config/const";
import Auth from "../../config/auth";

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
    .required(ERROR.REQUIRED),
  password: yup.string().required(ERROR.REQUIRED),
  photoURL: yup.string().required(ERROR.REQUIRED),
  displayName: yup.string().required(ERROR.REQUIRED),
});

const Signup = ({history}) => {
  const {register, handleSubmit, errors, formState} = useForm({
    validationSchema: schema,
    mode: "onChange",
  });

  const onSubmit = async ({email, password, photoURL, displayName}) => {
    const result = await new Auth().signUpWithEmail({email, password, photoURL, displayName});
    if (result.success) {
      toast.success("Sign up successfully");
      history.push("/login");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Headline>Welcome to message app !</Headline>
        <Input type="text" placeholder="Email" name="email" ref={register({})} />
        <div className="error">{errors.email && errors.email.message}</div>
        <Input type="password" placeholder="Password" name="password" ref={register({})} />
        <div className="error">{errors.password && errors.password.message}</div>
        <Input type="text" placeholder="PhotoURL" name="photoURL" ref={register({})} />
        <div className="error">{errors.photoURL && errors.photoURL.message}</div>
        <Input type="text" placeholder="Display name" name="displayName" ref={register({})} />
        <div className="error">{errors.displayName && errors.displayName.message}</div>
        <Button disabled={Object.keys(errors).length !== 0 || Object.keys(formState.touched).length === 0}>
          Sign up
        </Button>
      </form>
    </Container>
  );
};

export default Signup;
