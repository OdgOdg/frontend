import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";

const SignupPage: React.FC = () => {
  useEffect(() => {
    const originalPadding = document.body.style.paddingBottom;
    document.body.style.paddingBottom = "0px";

    return () => {
      document.body.style.paddingBottom = originalPadding;
    };
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSendCode = async () => {
    alert("인증코드 받기 버튼 클릭됨 // 인증코드 API 연동 필요");
    // try {
    //   const response = await fetch("/api/v1/user", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ email, name, password }),
    //   });

    //   if (response.ok) {
    //     alert("인증 코드가 이메일로 전송되었습니다.");
    //   } else {
    //     alert("인증코드 전송 실패");
    //   }
    // } catch (error) {
    //   console.error("인증 코드 요청 에러:", error);
    //   alert("서버 오류가 발생했습니다.");
    // }
  };

  const handleVerifyCode = () => {
    alert("인증번호 확인 버튼 클릭됨 // 인증번호 확인 기능 구현 필요");
    console.log("인증번호 확인:", verificationCode);
  };

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await fetch("/api/v1/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, password }),
      });

      if (response.ok) {
        alert("회원가입 성공!");
        window.location.href = "/login";
      } else {
        const data = await response.json();
        alert(data.message || "회원가입 실패");
      }
    } catch (error) {
      console.error("회원가입 에러:", error);
      alert("서버 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <Header title="회원가입" />
      <Container>
        <Form onSubmit={handleSignup}>
          <Label>이름</Label>
          <Input type="text" placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} required />

          <Label>이메일</Label>
          <InputWrapper>
            <Input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <SmallButton type="button" onClick={handleSendCode}>
              인증코드 받기
            </SmallButton>
          </InputWrapper>

          <InputWrapper>
            <Input
              type="text"
              placeholder="인증번호"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
            />
            <SmallButton type="button" onClick={handleVerifyCode}>
              인증하기
            </SmallButton>
          </InputWrapper>

          <Label>비밀번호</Label>
          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Label>비밀번호 확인</Label>
          <Input
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <SignupButton type="submit">가입하기</SignupButton>
        </Form>
      </Container>
    </div>
  );
};

export default SignupPage;

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
`;

const Form = styled.form`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  margin-top: 50px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SmallButton = styled.button`
  padding: 8px 12px;
  background-color: #00aa5b;
  color: white;
  font-size: 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  white-space: nowrap;
  width: 100px;
`;

const SignupButton = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 150px;
  background-color: #00aa5b;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
