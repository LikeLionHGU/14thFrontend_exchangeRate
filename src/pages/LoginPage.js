import GoogleLogin from "../components/0116/loginPage";
import "../css/Main.css";
import { useState } from "react";
import registerUser from "../components/Register";
import Login from "../components/Login";
import Mainicon from "../asset/MainIcon.png";

function LoginPage() {

  const [register, setRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

   const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await Login(username, password);

      if(username===""){
        alert("아이디를 입력하세요!");
      }
      if (result.success) {
        alert("로그인 성공! 로그인해주세요.");
        setRegister(false);
      }
    } catch (error) {
      alert("로그인 실패");
      console.error(error);
    }
  }
  const toggleRegister = () => {
    setRegister(!register);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const result = await registerUser(username, password);

      if (result.success) {
        alert("회원가입 성공! 로그인해주세요.");
        setRegister(false);
      }
    } catch (error) {
      alert("회원가입 실패");
      console.error(error);
    }
  };

  return (
    <div className="profile-div">
      <img src={Mainicon} alt="Main Icon" />
      {!register ? (
        <div>
          <form onSubmit={handleLogin}>
            <input placeholder="Username" />
            <input placeholder="Password" type="password" />
            <button type="submit">Login</button>
            <p onClick={toggleRegister}>Register</p>
          </form>
          <GoogleLogin />
        </div>
      ) : (
        <div>
          <form onSubmit={handleRegisterSubmit}>
            <input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              placeholder="Enter Password Again"
              type="password"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
            <button type="submit">Register</button>
            <p onClick={toggleRegister}>cancel</p>
          </form>
        </div>
      )}
    </div>
  );
}

export default LoginPage;