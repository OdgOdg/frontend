import "./App.css";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Layout from "./Layout.tsx";
import ModalsProvider from "./components/ModalsProvider.tsx";

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
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
