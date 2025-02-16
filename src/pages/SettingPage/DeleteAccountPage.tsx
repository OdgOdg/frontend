import styled from "styled-components";
import Header from "../../components/Header";
import BottomNavbar from "../../components/BottomNavbar";

const DeleteAccountPage = () => {
  return (
    <div>
      <Header title="회원탈퇴" />
      <Container>
        <Label>비밀번호</Label>
        <Input type="password" placeholder="비밀번호를 입력해 주세요" />
        <DisabledButton disabled>회원탈퇴</DisabledButton>
      </Container>
      <BottomNavbar />
    </div>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  margin: auto;
  padding: 20px;
  height: 100vh;
`;

const Label = styled.label`
  display: block;
  margin: 10px 0 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 100px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
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

export default DeleteAccountPage;
