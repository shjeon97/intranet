import React, { useEffect } from "react";
import { useReactiveVar } from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { isLoggedInVar, isSidebarOpenVar } from "./apollo";
import NavBar from "./component/layout/navbar";
import { SignUp } from "./page/ signUp";
import { Login } from "./page/login";
import { Main } from "./page/main";
import Sidebar from "./component/layout/sidebar";
import Me from "./page/user/me";
import WorkRecord from "./page/work/workRecord";
import Notices from "./page/notice/notices";
import Notice from "./page/notice/notice";
import { Calendar } from "./page/calendar";
import { MeetingRoom } from "./page/meetingRoom";

function App() {
  const pathname = window.location.href;
  const authRoutes = ["/login", "/sign-up"];
  const authRoute = authRoutes.includes(pathname);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const isSidebarOpen = useReactiveVar(isSidebarOpenVar);

  const toggle = () => {
    isSidebarOpenVar(!isSidebarOpen);
  };

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth <= 960 && isSidebarOpenVar(false)
    );
  }, []);

  return (
    <>
      <BrowserRouter>
        {isLoggedIn && !authRoute && (
          <Sidebar isOpen={isSidebarOpen} toggle={toggle} />
        )}
        <div className={isSidebarOpen ? "ml-64" : ""}>
          {isLoggedIn && !authRoute && <NavBar />}
          <Routes>
            {isLoggedIn ? (
              <>
                <Route path="/" element={<Main />} />
                <Route path="/me" element={<Me />} />
                <Route path="/work-record" element={<WorkRecord />} />
                <Route path="/notices" element={<Notices />} />
                <Route path="/notice/:id" element={<Notice />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/meeting-room" element={<MeetingRoom />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />
              </>
            )}
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
