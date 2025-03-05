import React, { useEffect } from "react";
import styled from "styled-components";

const PasswordChangeSuccess: React.FC = () => {
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
      <Message>비밀번호 변경에 성공하였습니다.</Message>
      <SubMessage>이제 새로운 비밀번호로 로그인할 수 있습니다.</SubMessage>
      <Button onClick={handleContinue}>계속 둘러보기</Button>
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
  margin-bottom: 10px;
`;

const SubMessage = styled.div`
  font-size: 1rem;
  color: #666;
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

export default PasswordChangeSuccess;
