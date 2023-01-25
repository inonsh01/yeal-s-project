import Register from "./Components/register";
import Login from './Components/login';
import { Routes, Route, BrowserRouter } from "react-router-dom"
import { createContext, useState } from "react";


export const AppContext = createContext();


export default function App() {
  const [username, setUsername] = useState(null);

  return (
    <BrowserRouter>
      <AppContext.Provider value={{ username, setUsername }}>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/Register" element={<Register />}></Route>
          <Route path="*" element={<h1>404 Not found</h1>}></Route>
        </Routes>
      </AppContext.Provider>
    </BrowserRouter>

  );
}