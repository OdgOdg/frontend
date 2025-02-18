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
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
