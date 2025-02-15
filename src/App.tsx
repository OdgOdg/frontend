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
            <Route path="/SettingsPage" element={<SettingsPage />} />
            <Route path="/PasswordChange" element={<PasswordChange />} />
            <Route path="/DeleteAccountPage" element={<DeleteAccountPage />} />
            <Route path="/LanguageSelectionPage" element={<LanguageSelectionPage />} />
            <Route path="/PasswordChangeSuccess" element={<PasswordChangeSuccess />} />
            <Route path="/DeleteAccountSuccessPage" element={<DeleteAccountSuccessPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
