import React, {useState, useEffect} from "react";
import styled from "styled-components";

const Header = styled.div`
  text-align: center;
  border-bottom: 1px solid #e8e8e8;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const Flex = styled.div``;

const MessageContaier = styled.div`
  heigth: 80%;
`;

const ChatContainer = styled.div`
  height: 10%;
  border-top: 1px solid #e8e8e8;
  display: flex;
`;

const ImageContainer = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  object-fit: cover;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Input = styled.textarea`
  width: 80%;
  border-radius: 10px;
  padding: 5px;
`;

export default ({user}) => {
  const [userInfo, setUserInfo] = useState(user);
  let [value, setValue] = useState(null);
  useEffect(() => {
    setUserInfo(user);
  }, [user]);
  const handleSendMessage = () => {};

  return (
    <Container>
      <Header style={{height: "10%"}}>
        <ImageContainer src={userInfo.photoURL} />
        <span style={{marginLeft: "5px"}}>{userInfo.displayName}</span>
      </Header>
      <MessageContaier style={{height: "80%"}}>message</MessageContaier>
      <ChatContainer style={{height: "10%"}}>
        <Input value={value} onChange={e => setValue(e.target.value)} />
        <button onClick={handleSendMessage}>Send</button>
      </ChatContainer>
    </Container>
  );
};
