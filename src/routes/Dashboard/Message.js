import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  text-align: ${props => (props.isPublisher ? "right" : "left")};
`;

const MessageWrapper = styled.div`
  background-color: ${props => (props.isPublisher ? "#7646ff" : "#f1f0f0")};
  border-radius: 10px;
  display: inline-block;
  padding: 8px;
  font-size: 16px;
  margin-bottom: 3px;
  color: ${props => (props.isPublisher ? "#ffffff" : "#000000")};
`;

export default ({children, isPublisher = true}) => {
  return (
    <Container isPublisher={isPublisher}>
      <MessageWrapper isPublisher={isPublisher}>{children}</MessageWrapper>
    </Container>
  );
};
