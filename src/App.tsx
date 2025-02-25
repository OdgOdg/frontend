import "./App.css";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Layout from "./Layout.tsx";
import ModalsProvider from "./components/ModalsProvider.tsx";
import SettingsPage from "./pages/SettingPage/SettingsPage.tsx";
import PasswordChange from "./pages/SettingPage/PasswordChangePage.tsx";
import DeleteAccountPage from "./pages/SettingPage/DeleteAccountPage.tsx";
import LanguageSelectionPage from "./pages/SettingPage/LanguageSelectionPage.tsx";
import PasswordChangeSuccess from "./pages/SettingPage/PasswordChangeSuccessPage.tsx";
import DeleteAccountSuccessPage from "./pages/SettingPage/DeleteAccountSuccessPage.tsx.tsx";
import ChatRoomList from "./pages/chatPage/ChatRoomList.tsx";
import AddFriendPage from "./pages/chatPage/AddFriendPage.tsx";
import ProfileManagement from "./pages/MyPage/ProfileManagement.tsx";
import SurveyForm from "./pages/SurveyForm/SurveyForm.tsx";
import EventListPage from "./pages/ListPage/EventListPage.tsx";
import ChatBotPage from "./pages/ChatBotPage.tsx";
import ChatRoomPage from "./pages/chatPage/ChatRoomPage.tsx";
import MyPage from "./pages/MyPage/MyPage.tsx";

function AppLayout() {
  return (
    <ModalsProvider>
      <Layout>
        <Outlet />
      </Layout>
    </ModalsProvider>
  );
}

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<MainPage />} />
            <Route path="/Settings" element={<SettingsPage />} />
            <Route path="/PasswordChange" element={<PasswordChange />} />
            <Route path="/DeleteAccount" element={<DeleteAccountPage />} />
            <Route path="/LanguageSelection" element={<LanguageSelectionPage />} />
            <Route path="/PasswordChangeSuccess" element={<PasswordChangeSuccess />} />
            <Route path="/DeleteAccountSuccess" element={<DeleteAccountSuccessPage />} />
            <Route path="/ChatRoomList" element={<ChatRoomList />} />
            <Route path="/AddFriend" element={<AddFriendPage />} />
            <Route path="/ProfileManagement" element={<ProfileManagement />} />
            <Route path="/SurveyForm" element={<SurveyForm />} />
            <Route path="/EventList" element={<EventListPage />} />
            <Route path="/ChatBot" element={<ChatBotPage />} />
            <Route path="/ChatRoom" element={<ChatRoomPage />} />
            <Route path="/MyPage" element={<MyPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
