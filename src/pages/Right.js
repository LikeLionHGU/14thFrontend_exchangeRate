import { useEffect, useState } from "react";
import axios from "axios";
import Profile from "../asset/profile-picture.png";
import Mainicon from "../asset/MainIcon.png";
import GoogleLogin from "../components/loginPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

function Right() {
  const [logined, setLogined] = useState(false);
  const [name, setName] = useState(null);
  const [picture, setPicture] = useState(null);
  const [register, setRegister] = useState(false);
  const [text_Register, setText_Register] = useState("Register");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLogined(false);
      return;
    }
    setLogined(true);
    if (token) {
      const User = JSON.parse(localStorage.getItem("userInfo"));
      setName(User.name);
      setPicture(User.picture);
    }
    // 구글로그인과 로컬 로그인할떄 data정보 충돌문제
    axios.get(`${process.env.REACT_APP_HOST_URL}/mypage`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    setLogined(false);
  }

  function handleRegister() {
    if (text_Register === "Register") {
      setRegister(true);
      setText_Register("Cancel");
    } else {
      setRegister(false);
      setText_Register("Register");
    }
  }

  return logined ? (
    <div className="Logined-profile">
      {picture == null ? (
        <img src={Profile} alt="profile" />
      ) : (
        <img src={picture} alt="profile" />
      )}
      <p>{name}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  ) : (
    <div className="profile-div">
      <img src={Mainicon} alt="Main Icon" />
      {!register ? <LoginPage /> : <RegisterPage />}
      <p onClick={handleRegister}>{text_Register}</p>
      <GoogleLogin />
    </div>
  );
}
export default Right;
