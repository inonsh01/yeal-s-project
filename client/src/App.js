// import Register from "./Components/Register";
import Login from './Components/Login.js';
import Posts from "./Components/Posts.js";
import ToDo from "./Components/ToDo.js";
import Info from './Components/Info.js';
import Home from "./Components/Home.js";
import Post from "./Components/Post.js";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom"
import { createContext, useState } from "react";
import { Logout } from './Components/Logout.js';

export const AppContext = createContext();

// type="module"
export default function App() {
  const [username, setUsername] = useState("Bret");

  return (
    <BrowserRouter >
      <AppContext.Provider value={{ username, setUsername }}>
        <Routes>
          <Route path="/" element = {<Navigate replace to = "/login"/>}></Route>
          <Route path="/login" element={<Login />}></Route>
          
          {/* <Route path="/register" element={<Register />}></Route> */}

          <Route path="/users/:id/home" element={<Home />}></Route>
          <Route path="/users/:id/todo" element={<ToDo />}></Route>
          <Route path="/users/:id/info" element={<Info />}></Route>
          <Route path="/users/:id/logout" element={<Logout />}></Route>
          <Route path="/users/:id/posts" element={<Posts />}></Route>
          {/* <Route path="posts/:id" element={<Post />}></Route> */}

          <Route path="*" element={<h1>404 Not found</h1>}></Route>
        </Routes>
      </AppContext.Provider>
    </BrowserRouter>

  );
}