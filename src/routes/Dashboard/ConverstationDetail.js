import React, {useState, useEffect} from "react";
import styled from "styled-components";

const Header = styled.div`
  text-align: center;
  border-bottom: 1px solid #e8e8e8;
`;

const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 10px;
`;

const MessageContaier = styled.div`
  heigth: 80%;
`;

const ChatContainer = styled.div`
  display: flex;
  margin-bottom: 5px;
`;

const ImageContainer = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  object-fit: cover;
`;

const Container = styled.div`
  height: 100%;
  overflow: hidden;
`;

const Input = styled.textarea`
  width: 100%;
  border-radius: 20px;
  outline: none;
  font-size: 12px;
  color: #676767;
  transition: border 0.5s;
  border: solid 3px #98d4f3;
  resize: none;
  overflow: hidden;
`;

const Button = styled.div`
  text-align: end;
  cursor: pointer;
  position: absolute;
  display: inline-block;
  bottom: 0;
  right: 0;
  padding: 5px;
  font-size: 13px;
  font-weight: 500;
  color: #203152;
  border-radius: 5px;
  border: 1px solid #e8e8e8;
  background-color: #ff270b61;
`;

const ImportFile = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
  margin: 0px 5px;
`;

export default ({user, setCurrentUserChat, onCloseChat}) => {
  const [userInfo, setUserInfo] = useState(user);
  let [value, setValue] = useState(null);
  useEffect(() => {
    setUserInfo(user);
  }, [user]);
  const handleSendMessage = () => {};

  return (
    <>
      <Container>
        <Header style={{height: "10%", position: "relative"}}>
          <Flex>
            <ImageContainer src={userInfo.photoURL} />
            <span style={{marginLeft: "5px"}}>{userInfo.displayName}</span>
          </Flex>
          <Button
            onClick={() => {
              onCloseChat();
            }}>
            Close chat
          </Button>
        </Header>
        <MessageContaier style={{height: "85%"}}>message</MessageContaier>
        <ChatContainer style={{height: "4%"}}>
          <ImportFile src="/image/uy.svg" />
          <Input value={value} onChange={e => setValue(e.target.value)} />
          <ImportFile src="/image/send-svgrepo-com.svg" />
        </ChatContainer>
      </Container>
    </>
  );
};
