import styled from "styled-components";
import Header from "../../components/Header";
import BottomNavbar from "../../components/BottomNavbar";

const PasswordChange = () => {
  return (
    <>
      <Header title="비밀번호 & 계정" />
      <Container>
        <Label>변경할 비밀번호</Label>
        <Input type="password" placeholder="새로운 비밀번호를 입력해 주세요" />
        <Label>비밀번호 확인</Label>
        <Input type="password" placeholder="비밀번호를 다시 입력해 주세요" />
        <InfoText>비밀번호는 8자리 이상, 15자리 이하이며 특수문자를 포함해야 합니다.</InfoText>
        <Button>변경하기</Button>
        <p style={{ padding: "15px" }} />
        <Label>계정</Label>
        <DisabledButton disabled>회원탈퇴</DisabledButton>
      </Container>
      <BottomNavbar paddingBottom={false} />
    </>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  margin: auto;
  padding: 20px;
  /* height: 100vh; */
`;

const Label = styled.label`
  display: block;
  margin: 10px 0 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const InfoText = styled.p`
  font-size: 12px;
  color: #666;
`;

const Button = styled.button`
  width: 100%;
  padding: 20px;
  background-color: #0aaf5d;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #088c4a;
  }
`;

const DisabledButton = styled(Button)`
  background-color: #ddd;
  color: #999;
  cursor: not-allowed;
`;

export default PasswordChange;
