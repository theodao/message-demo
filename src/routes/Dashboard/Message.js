import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  text-align: right;
`;

const MessageWrapper = styled.div`
  background-color: #7646ff;
  border-radius: 10px;
  display: inline-block;
  padding: 8px;
  font-size: 16px;
  margin-bottom: 3px;
  color: #ffffff;
`;

export default ({children}) => {
  return (
    <Container>
      <MessageWrapper>{children}</MessageWrapper>
    </Container>
  );
};
