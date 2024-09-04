// App.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Main from "./component/Main";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Collabration from "./pages/Collabration";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Publications from "./pages/Publications";
import Login from "./pages/Login";
import CreateAccount from "./component/CreateAccount";
import ProtectedRoute from "./component/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/collabration" element={<Collabration />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route
          path="/profile"
          element={<ProtectedRoute element={<Profile />} />}
        />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
