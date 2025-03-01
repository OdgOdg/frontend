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
import AddSchedule from "./pages/CalendarPage/AddSchedule.tsx";
import Calendar from "./pages/CalendarPage/Calendar.tsx";
import MyProfile from "./pages/MyPage/Myprofile.tsx";
import EventViewAtMap from "./pages/MapPage/EventViewAtMap.tsx"
import TourSightListPage from "./pages/ListPage/TourSightListPage.tsx";
import IncomingCall from "./pages/chatPage/IncomingCall.tsx";
import OutgoingCall from "./pages/chatPage/OutcomingCall.tsx";
import ReviewWrite from "./pages/ReviewPage/ReviewWrite.tsx"

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
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/passwordchange" element={<PasswordChange />} />
            <Route path="/deleteaccount" element={<DeleteAccountPage />} />
            <Route path="/languageselection" element={<LanguageSelectionPage />} />
            <Route path="/passwordchangesuccess" element={<PasswordChangeSuccess />} />
            <Route path="/deleteaccountsuccess" element={<DeleteAccountSuccessPage />} />
            <Route path="/chatroomlist" element={<ChatRoomList />} />
            <Route path="/addfriend" element={<AddFriendPage />} />
            <Route path="/profilemanagement" element={<ProfileManagement />} />
            <Route path="/surveyform" element={<SurveyForm />} />
            <Route path="/eventlist" element={<EventListPage />} />
            <Route path="/toursightlist" element={<TourSightListPage />} />
            <Route path="/chatbot" element={<ChatBotPage />} />
            <Route path="/chatroom" element={<ChatRoomPage />} />
            <Route path="/addschedule" element={<AddSchedule />} />
            <Route path="/calendar" element={<Calendar year={2025} month={2} />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="/eventviewatmap" element={<EventViewAtMap />} />
            <Route path="/incomingcall" element={<IncomingCall />} />
            <Route path="/outgoingcall" element={<OutgoingCall />} />
            <Route path="/reviewwrite" element={<ReviewWrite />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
