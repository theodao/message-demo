import React from "react";
import styled from "styled-components";

const Header = styled.div`
  text-align: center;
  border-bottom: 1px solid #e8e8e8;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
const ImageContainer = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  object-fit: cover;
`;

export default ({displayName, photoURL, email}) => {
  return (
    <>
      <Header>
        <ImageContainer src={photoURL} />
        <span style={{marginLeft: "5px"}}>{displayName}</span>
      </Header>
    </>
  );
};
