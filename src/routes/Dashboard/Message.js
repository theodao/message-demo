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
  height: auto;
  margin-bottom: 3px;
  color: ${props => (props.isPublisher ? "#ffffff" : "#000000")};
`;

const LinkWrapper = styled.a`
  background-color: ${props => (props.isPublisher ? "#7646ff" : "#f1f0f0")};
  border-radius: 10px;
  display: inline-block;
  padding: 8px;
  height: auto;
  font-size: 16px;
  margin-bottom: 3px;
  color: ${props => (props.isPublisher ? "#ffffff" : "#000000")};
`;

const StickerWrapper = styled.img`
  width: 75px;
  height: 75px;
  object-fit: cover;
`;

export default ({children, isPublisher = true, isSticker}) => {
  let regex = /(https?:\/\/[^\s]+)/g;
  return (
    <Container isPublisher={isPublisher}>
      {regex.test(children) && !isSticker ? (
        <LinkWrapper isPublisher={isPublisher} href={`${children}`} target="_blank">
          {children}
        </LinkWrapper>
      ) : isSticker ? (
        <StickerWrapper src={children} />
      ) : (
        <MessageWrapper isPublisher={isPublisher}>{children}</MessageWrapper>
      )}
    </Container>
  );
};
