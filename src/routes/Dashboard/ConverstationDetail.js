import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Message from './Message';
import fire from 'firebase';
import { firestore } from '../../config/firebase';
import { emojiMap } from '../../config/const';
import Auth from '../../config/auth';

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
  height: 85%;
  overflow-y: auto;
  padding: 15px 10px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const ChatContainer = styled.div`
  display: flex;
  margin-bottom: 5px;
`;

const StickerContainer = styled.div`
  display: ${props => (props.visible ? 'flex' : 'none')};
  flex-direction: row;
`;

const Sticker = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  cursor: pointer;
`;

const ImageContainer = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  object-fit: cover;
`;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
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

const escapeSpecialChars = regex => {
  return regex.replace(/([()[{*+.$^\\|?])/g, '\\$1');
};

export default ({ user, setCurrentUserChat, onCloseChat }) => {
  const { id } = new Auth().getUserInfo();
  const [userInfo, setUserInfo] = useState(user);
  let [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  let [isShowSticker, setIsShowSticker] = useState(false);
  let [stickerUrl, setStickerUrl] = useState([
    'https://media0.giphy.com/media/5zsmDWE4ZOLxM60359/source.gif',
    'https://media.giphy.com/media/5z5NIlNjK0NxpsecKh/giphy.gif',
    'https://media1.giphy.com/media/vxAO4SdoYLmWmwWIof/source.gif',
    'https://media0.giphy.com/media/5zsmDWE4ZOLxM60359/source.gif',
    'https://media0.giphy.com/media/Mdoyd8MFnzLXPBNrAY/source.gif',
    'https://media1.giphy.com/media/fLjOXii35SMz1mbito/source.gif',
    'https://media2.giphy.com/media/8L0T9qoN744tzLk2hM/source.gif',
  ]);
  let [value, setValue] = useState('');
  const messageListRef = useRef(null);
  useEffect(() => {
    // Subscribe to new message receive from firebase cloud
    setUserInfo(user);
    setLoading(true);
    firestore
      .collection('messages')
      .where(fire.firestore.FieldPath.documentId(), 'in', [`${id}-${user.id}`, `${user.id}-${id}`])
      .onSnapshot(res => {
        setLoading(false);
        if (!res.empty) {
          const doc = res.docs[0];
          if (doc.exists) {
            const { conversation } = doc.data();
            setMessages(conversation);
          }
        } else {
          setMessages([]);
        }
      });
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messageListRef) {
      messageListRef.current.scrollIntoView({});
    }
  };

  const handleSendMessage = ({ value, isSticker = null }) => {
    if (value) {
      firestore
        .collection('messages')
        .where(fire.firestore.FieldPath.documentId(), 'in', [`${id}-${user.id}`, `${user.id}-${id}`])
        .get()
        .then(response => {
          if (response.empty) {
            // create new thread
            firestore
              .collection('messages')
              .doc(`${id}-${user.id}`)
              .set({
                conversation: [{ content: value, publisher: id, isSticker }],
              })
              .then(result => console.log(result));
          } else {
            // update thread
            const doc = response.docs[0];
            const { conversation } = doc.data();
            firestore
              .collection('messages')
              .doc(doc.id)
              .set({
                conversation: [...conversation, { content: value, publisher: id, isSticker }],
              });
          }
        });
    }

    setValue('');
  };

  const handleKeyPress = e => {
    if (e.keyCode === 13) {
      handleSendMessage({ value: e.target.value });
      e.preventDefault();
    }
  };

  return (
    <>
      <Container>
        <Header style={{ height: '10%', position: 'relative' }}>
          <Flex>
            <ImageContainer src={user.photoURL} />
            <span style={{ marginLeft: '5px' }}>{user.displayName}</span>
          </Flex>
          <Button
            onClick={() => {
              onCloseChat();
            }}>
            Close chat
          </Button>
        </Header>
        <MessageContaier>
          {loading ? (
            <div>Loading</div>
          ) : (
            <>
              {messages.map(({ content, publisher, isSticker }) => (
                <Message isPublisher={publisher === id} isSticker={isSticker}>
                  {content}
                </Message>
              ))}
              <div style={{ float: 'left', clear: 'both' }} ref={messageListRef} />
            </>
          )}
        </MessageContaier>
        <StickerContainer visible={isShowSticker}>
          {stickerUrl.map(url => (
            <Sticker
              src={url}
              onClick={() => {
                handleSendMessage({ value: url, isSticker: true });
              }}
            />
          ))}
        </StickerContainer>
        <ChatContainer style={{ height: '4%' }}>
          {/* <ImportFile src="/image/uy.svg" /> */}
          <ImportFile src="/image/sticker.svg" onClick={() => setIsShowSticker(!isShowSticker)} />
          <Input
            value={value}
            onChange={e => {
              for (let i in emojiMap) {
                let regex = new RegExp(escapeSpecialChars(i), 'gim');
                e.target.value = e.target.value.replace(regex, emojiMap[i]);
                setValue(e.target.value);
              }
            }}
            onKeyDown={e => handleKeyPress(e)}
          />
          <ImportFile
            src="/image/send-svgrepo-com.svg"
            onClick={() => {
              handleSendMessage({ value });
            }}
          />
        </ChatContainer>
      </Container>
    </>
  );
};
