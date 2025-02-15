import React, { useState } from "react";
import styled from "styled-components";
import { Switch } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../../components/Header";
import BottomNavbar from "../../components/BottomNavbar";

const SettingsPage: React.FC = () => {
  const [isAlarmOn, setIsAlarmOn] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header title="설정" />
        <ProfileSection>
          <ProfileImage />
          <UserName>고해찬</UserName>
        </ProfileSection>

        <Section>
          <SectionTitle>계정 설정</SectionTitle>
          <SettingItem>비밀번호 & 계정</SettingItem>
          <SettingItem>
            알람 <Switch checked={isAlarmOn} onChange={() => setIsAlarmOn(!isAlarmOn)} />
          </SettingItem>
          <SettingItem>로그아웃</SettingItem>
        </Section>

        <MoreSection>
          <SectionTitle>More</SectionTitle>
          <SettingItem>About us</SettingItem>
          <SettingItem>개인정보 처리방침</SettingItem>
          <SettingItem>언어 설정</SettingItem>
        </MoreSection>
      </Container>
      <BottomNavbar />
    </ThemeProvider>
  );
};

const theme = createTheme({
  components: {
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          color: "#00AA5B",
          "&.Mui-checked": {
            color: "#00AA5B",
          },
          "&.Mui-checked + .MuiSwitch-track": {
            backgroundColor: "#00AA5B",
          },
        },
      },
    },
  },
});

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 100vh;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  gap: 12px;
`;

const ProfileImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #ccc;
`;

const UserName = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const Section = styled.div`
  padding: 16px;
  border-bottom: 4px solid #f5f5f5;
`;

const SectionTitle = styled.div`
  font-size: 14px;
  color: #aaa;
  margin-bottom: 8px;
`;

const SettingItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  font-size: 16px;
  cursor: pointer;
`;

const MoreSection = styled(Section)`
  border-bottom: none;
`;

export default SettingsPage;
