import React, {useEffect, useState} from "react";
import styled from "styled-components";
import fire, {firestore} from "../../config/firebase";
import ConverstationDetail from "./ConverstationDetail";
import APP from "../../config/const";
import Auth from "../../config/auth";

const Header = styled.div`
  font-weight: 700;
  font-size: 20px;
  color: #203152;
  background-color: #f5a623;
  box-shadow: 0 4px 4px #808888;
  text-align: center;
  margin: 0 auto;
  padding: 30px;
`;

const LogoutButton = styled.div`
  color: #203152;
  border-radius: 5px;
  border: 1px solid #e8e8e8;
  display: inline-block;
  font-size: 12px;
  padding: 5px;
  cursor: pointer;
  background-color: #96af96;
  margin-top: 10px;
`;

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const UserItemContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;
  cursor: pointer;
`;
const ImageContainer = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  object-fit: cover;
`;

const ListUserContainer = styled.div`
  width: 15%;
  border-right: 2px solid #e8e8e8;
  heigth: 100%;
  padding: 5px 0;
`;
const ConversationContainer = styled.div`
  width: 85%;
  heigth: 100%;
`;

const UserItem = ({photoURL, displayName, email, handleClickOnUserItem}) => {
  return (
    <UserItemContainer onClick={handleClickOnUserItem}>
      <ImageContainer src={photoURL} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "10px",
        }}>
        <div>{displayName}</div>
        <div>{email}</div>
      </div>
    </UserItemContainer>
  );
};

export default ({history}) => {
  const {displayName, id, email, photoURL} = new Auth().getUserInfo();
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    firestore.collection("user").onSnapshot(snapshot => {
      setUserList(snapshot.docs.map(doc => doc.data()));
    });
  }, []);

  const handleClickOnUserItem = () => {};

  return (
    <div
      style={{
        height: "100%",
      }}>
      <Header>
        <div>Welcome {displayName}!!!</div>
        <LogoutButton
          onClick={async () => {
            const response = await new Auth().logout();
            if (response.success) {
              history.push("/login");
            }
          }}>
          Log out
        </LogoutButton>
      </Header>
      <Container>
        <ListUserContainer>
          {userList.map(user => {
            const {photoURL, displayName, email} = user;
            return (
              <UserItem
                photoURL={photoURL}
                displayName={displayName}
                email={email}
                onClick={() => {
                  handleClickOnUserItem(photoURL, displayName, email);
                }}
              />
            );
          })}
        </ListUserContainer>
        <ConversationContainer>
          <ConverstationDetail photoURL={photoURL} displayName={displayName} email={email} />
        </ConversationContainer>
      </Container>
    </div>
  );
};
