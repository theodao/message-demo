import React, {useEffect, useState} from "react";
import styled from "styled-components";
import fire, {firestore} from "../../config/firebase";
import ConverstationDetail from "./ConverstationDetail";
import MainContainer from "../../components/MainContainer";
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
  height: calc(20vh - 60px);
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
  height: 80vh;
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

const Name = styled.div`
  position: relative;
  &:after {
    background-color: ${props => (props.available ? "green" : "#e8e8e8")};
    width: 5px;
    height: 5px;
    content: "";
    display: inline-block;
    position: absolute;
    top: 9px;
    border-radius: 50%;
    margin-left: 5px;
    align-items: center;
    text-align: center;
  }
`;

const Email = styled.div`
  width: 100%;
`;

const UserItem = ({photoURL, displayName, email, available, handleClickOnUserItem}) => {
  return (
    <UserItemContainer onClick={() => handleClickOnUserItem()}>
      <ImageContainer src={photoURL} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "10px",
        }}>
        <Name available={available}>{displayName}</Name>
        <Email>{email}</Email>
      </div>
    </UserItemContainer>
  );
};

export default ({history}) => {
  const {displayName, id, email, photoURL, isChatWith} = new Auth().getUserInfo();
  const [userList, setUserList] = useState([]);
  const [currentUserChat, setCurrentUserChat] = useState(null);
  let [loading, setLoading] = useState(false);
  // Get list of user
  useEffect(() => {
    setLoading(true);
    firestore.collection("user").onSnapshot(snapshot => {
      setLoading(false);
      setUserList(
        snapshot.docs
          .map(doc => {
            return doc.data();
          })
          .filter(doc => {
            return doc.id !== window.localStorage.getItem(APP.USER_ID);
          }),
      );
    });
  }, []);

  // Get user whom current user is chatting with
  useEffect(() => {
    firestore
      .collection("user")
      .doc(isChatWith)
      .get()
      .then(response => {
        setCurrentUserChat(response.data());
      });
  }, []);
  const handleClickOnUserItem = (photoURL, displayName, email, uid) => {
    console.log(displayName);
    setCurrentUserChat({
      photoURL,
      displayName,
      email,
    });
    firestore
      .collection("user")
      .doc(id)
      .update({
        available: false,
        isChatWith: uid,
      });
  };

  return (
    <MainContainer loading={loading}>
      <div
        style={{
          height: "100%",
        }}>
        <Header>
          <div>Welcome {displayName}!!!</div>
          <div>
            <ImageContainer src={photoURL} style={{marginTop: "15px"}} />
          </div>
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
              const {photoURL, displayName, email, id, available} = user || {};
              return (
                <UserItem
                  photoURL={photoURL}
                  displayName={displayName}
                  email={email}
                  available={available}
                  key={id}
                  handleClickOnUserItem={() => {
                    handleClickOnUserItem(photoURL, displayName, email, id);
                  }}
                />
              );
            })}
          </ListUserContainer>
          <ConversationContainer>
            {currentUserChat ? (
              <ConverstationDetail user={currentUserChat} setCurrentUserChat={setCurrentUserChat} />
            ) : (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <h3> You are available to start a new conversation</h3>
              </div>
            )}
          </ConversationContainer>
        </Container>
      </div>
    </MainContainer>
  );
};
