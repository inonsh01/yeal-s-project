import Register from "./Components/Register";
import Login from './Components/Login';
import Posts from "./Components/Posts";
import Tasks from "./Components/Tasks";
import Info from './Components/Info';
import Home from "./Components/Home";
import Post from "./Components/Post";
import { Routes, Route, BrowserRouter } from "react-router-dom"
import { createContext, useState } from "react";


export const AppContext = createContext();


export default function App() {
  const [username, setUsername] = useState("Bret");

  return (
    <BrowserRouter>
      <AppContext.Provider value={{ username, setUsername }}>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>

          <Route path="home" element={<Home />}></Route>
          {/* <Route path="tasks" element={<Tasks />}></Route> */}
          {/* <Route path="info" element={<Info />}></Route> */}
          {/* <Route path="logout" element={<Logout />}></Route> */}
          {/* <Route path="posts" element={<Posts />}></Route> */}
          {/* <Route path="posts/:id" element={<Post />}></Route> */}

          <Route path="*" element={<h1>404 Not found</h1>}></Route>
        </Routes>
      </AppContext.Provider>
    </BrowserRouter>

  );
}