import { useEffect, useState } from "react";
import axios from "axios"; // Make sure axios is imported
import "./App.css";
import Home from "./components/HomeScreen/Home";
import SignUp from "./components/loginORregister/SignUp";
import SignIn from "./components/loginORregister/SignIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "./features/mydata/myProfile";
import EbookUploadPage from "./components/EbookUpload/EbookUploadPage";
import { Toaster } from "react-hot-toast";
import DetailPage from "./components/DetailScreen/DetailPage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const tokenCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));
    const token = tokenCookie ? tokenCookie.split("=")[1] : null;
    if (token) {
      dispatch(fetchProfile(token)); // Dispatch action to fetch profile data
    }
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/add-ebook" element={<EbookUploadPage />} />
          <Route path="/ebook/:id" element={<DetailPage />} />

        </Routes>
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            // Customize default options
            success: {
              style: {
                background: "green",
                color: "white",
              },
            },
            error: {
              style: {
                background: "red",
                color: "white",
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
