import Home from "./components/Home";
import SignUp from "./components/SignUp";
import { Login } from "./components/Login";
import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";
import RequiredAuth from "./components/RequiredAuth";
import {useState, useEffect} from "react";
import { getLocalStorageInfo } from "./utils/getLocalStorageInfo";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/user/auth", {
      method: "POST",
      headers: {
        authorization: getLocalStorageInfo(),
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.isAuthenticated);
        setIsAuth(data.isAuthenticated);
      });
  }, []);

  

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RequiredAuth isAuth={isAuth}>
              <Home />
            </RequiredAuth>
          }
        />
        <Route path="/login" element={isAuth?<Navigate to="/" /> :<Login setIsAuth={setIsAuth}/>} />
        <Route path="/sign-up" element={isAuth?<Navigate to="/" /> :<SignUp setIsAuth={setIsAuth}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
