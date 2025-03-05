import React from "react";
import { useEffect } from "react";
import styled from "styled-components";

const DeleteAccountSuccessPage: React.FC = () => {
  useEffect(() => {
    const originalPadding = document.body.style.paddingBottom;
    document.body.style.paddingBottom = "0px";

    return () => {
      document.body.style.paddingBottom = originalPadding;
    };
  }, []);

  const handleContinue = () => {
    alert("계속 둘러보기 클릭됨");
  };

  return (
    <Container>
      <Message>회원탈퇴가 완료되었습니다.</Message>
      <Button onClick={handleContinue}>홈으로 돌아가기</Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f9f9f9;
  text-align: center;
`;

const Message = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #000;
  margin-bottom: 200px;
`;

const Button = styled.button`
  background-color: #00a859;
  color: #fff;
  font-size: 1rem;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  outline: none;
  transition: background 0.3s;

  &:hover {
    background-color: #008f4c;
  }
`;

export default DeleteAccountSuccessPage;
