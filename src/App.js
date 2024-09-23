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
import EditProfile from "./component/EditProfile";
import CreateBlog from "./component/CreateBlog";
import FetchBlog from "./component/FetchBlog";
import AdminLogin from "./component/admin/AdminLogin";
import AdminDashboard from "./component/admin/AdminDashboard";
import AllBlogs from "./component/admin/AllBlogs";
import UpdateBlog from "./component/admin/UpdateBlog";
import FetchPublications from "./component/admin/FetchPublications";
import AddPublication from "./component/admin/AddPublication";
import RemovePublication from "./component/admin/RemovePublication";
import FetchUsers from "./component/admin/FetchUsers";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/collaboration" element={<Collabration />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="edit-profile" element={<EditProfile />} />
        <Route path="create-blog" element={<CreateBlog />} />
        <Route path="fetch-blog" element={<FetchBlog />} />

        <Route
          path="/profile"
          element={<ProtectedRoute element={<Profile />} />}
        />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminDashboard />}>
        <Route path="all-blogs" element={<AllBlogs />} />
        <Route path="approved-blogs" element={<UpdateBlog />} />
        <Route path="publications" element={<FetchPublications />} />
        <Route path="add-publication" element={<AddPublication />} />
        <Route path="remove-publication" element={<RemovePublication />} />
        <Route path="users" element={<FetchUsers />} />
      </Route>
    </Routes>
  );
}

export default App;
