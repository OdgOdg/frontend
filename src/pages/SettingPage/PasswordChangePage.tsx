import { useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import BottomNavbar from "../../components/BottomNavbar";

const PasswordChange = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/;
    return passwordRegex.test(password);
  };

  const handleChangePassword = async () => {
    // 기존 에러 초기화
    setPasswordError("");
    setServerError("");

    // 비밀번호 형식 검사
    if (!validatePassword(newPassword)) {
      setPasswordError("비밀번호는 8~15자리이며, 특수문자를 포함해야 합니다.");
      return;
    }

    // 현재 비밀번호와 동일한 비밀번호로 변경하는 경우
    if (currentPassword === newPassword) {
      setPasswordError("현재 비밀번호와 동일한 비밀번호로 변경할 수 없습니다.");
      return;
    }

    // 새 비밀번호와 확인용 비밀번호가 다를 때
    if (newPassword !== confirmPassword) {
      setPasswordError("새로운 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await fetch("/api/v1/auth/change-password", {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "비밀번호 변경 실패");
      }

      alert("비밀번호가 성공적으로 변경되었습니다!");
      window.location.reload(); // 화면 새로고침
    } catch (err: any) {
      setServerError(err.message); // 서버 응답 오류 메시지를 한 번만 설정
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("정말로 회원탈퇴를 진행하시겠습니까?")) return;
    try {
      // 엑세스 토큰 값을 인풋으로 보내고자 함
      const response = await fetch("/api/v1/user/{id}", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("회원탈퇴에 실패했습니다.");
      }

      // 2️⃣ 로그아웃 API 호출 (쿠키 삭제 기대)
      const logoutResponse = await fetch("/api/v1/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!logoutResponse.ok) {
        throw new Error("로그아웃 과정에서 문제가 발생했습니다.");
      }

      alert("회원탈퇴가 완료되었습니다.");
      localStorage.clear(); // 로컬스토리지 정리
      window.location.href = "/"; // 홈 화면으로 이동
    } catch (err) {
      if (err instanceof Error) {
        setServerError(err.message);
      } else {
        setServerError("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  return (
    <>
      <Header title="비밀번호 & 계정" />
      <Container>
        <Label>현재 비밀번호</Label>
        <Input
          type="password"
          placeholder="현재 비밀번호를 입력해 주세요"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />

        <Label>변경할 비밀번호</Label>
        <Input
          type="password"
          placeholder="새로운 비밀번호를 입력해 주세요"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            setPasswordError(
              validatePassword(e.target.value) ? "" : "비밀번호는 8~15자리이며, 특수문자를 포함해야 합니다."
            );
          }}
        />

        <Label>비밀번호 확인</Label>
        <Input
          type="password"
          placeholder="비밀번호를 다시 입력해 주세요"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <InfoText>비밀번호는 8자리 이상, 15자리 이하이며 특수문자를 포함해야 합니다.</InfoText>

        {passwordError && <ErrorText>{passwordError}</ErrorText>}
        {serverError && <ErrorText>{serverError}</ErrorText>}
        {success && <SuccessText>{success}</SuccessText>}

        <Button onClick={handleChangePassword} disabled={!validatePassword(newPassword)}>
          변경하기
        </Button>

        <p style={{ padding: "15px" }} />
        <Label>계정</Label>
        <Button onClick={handleDeleteAccount} style={{ backgroundColor: "red" }}>
          회원탈퇴
        </Button>
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

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

const SuccessText = styled.p`
  color: green;
  font-size: 14px;
  margin-top: 5px;
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
