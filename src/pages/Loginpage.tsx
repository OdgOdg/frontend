import React, { useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header";

const LoginPage: React.FC = () => {
  // index.css line9 => "padding-bottom:60px" 스타일 미적용을 위한 useEffect
  useEffect(() => {
    const originalPadding = document.body.style.paddingBottom;
    document.body.style.paddingBottom = "0px";

    return () => {
      document.body.style.paddingBottom = originalPadding;
    };
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("로그인 버튼 클릭");
  };

  return (
    <div>
      <Header title="로그인" />

      <Container>
        <Text>
          <Title>ITG</Title>
          <Subtitle>
            안녕하세요
            <br />
            인천 여행의 시작을 함께할 ITG입니다.
          </Subtitle>
        </Text>
        <Form onSubmit={handleSubmit}>
          <Label>이메일</Label>
          <Input type="email" placeholder="이메일 입력" required />

          <Label>비밀번호</Label>
          <Input type="password" placeholder="비밀번호 입력" required />

          <LoginButton type="submit">로그인</LoginButton>
        </Form>
        <Footer>
          <FooterLink href="#">회원가입</FooterLink>
        </Footer>
      </Container>
    </div>
  );
};

export default LoginPage;

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* height: 100vh; */
  padding: 20px;
  box-sizing: border-box;
`;

const Text = styled.div`
  width: 100%;
  /* max-width: 360px; */
  text-align: left;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
`;

const Subtitle = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-top: 5px;
  line-height: 1.5;
`;

const Form = styled.form`
  width: 100%;
  /* max-width: 360px; */
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  margin-top: 30px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  font-size: 14px;
  border: none;
  border-bottom: 1px solid #ccc;
  max-width: 500px;
  outline: none;
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 300px;
  background-color: #00aa5b;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Footer = styled.div`
  width: 100%;
  /* max-width: 360px; */
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const FooterLink = styled.a`
  font-size: 12px;
  color: #666;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
