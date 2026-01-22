import GoogleLogin from "../components/loginPage";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  async function LoginSubmit() {
    const response = await axios.post(
      `${process.env.REACT_APP_HOST_URL}/Login`,
      {
        username,
        password,
      },
    );

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("name", response.data.user.name);
    localStorage.setItem("picture", response.data.user.picture);
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

//   function handleUsername() {
//     const id = document.getElementById("id").value;
//     setUsername(id);
//   }
//   function handlePassword() {
//     const pw = document.getElementById("pw").value;
//     setPassword(pw);
//   }

  const handleLogin = async (e) => {
    e.preventDefault();

    setUsername(document.getElementById("id").value);
    setPassword(document.getElementById("pw").value);

    //handleUsername();
    //handlePassword();
    try {
      if (username === "") {
        alert("아이디를 입력하세요!");
      }
    } catch (error) {
      alert("로그인 실패");
      //console.error(error);
    }
    LoginSubmit();
    const token2 = localStorage.getItem("token");

    if (token2) {
        // eslint-disable-next-line no-restricted-globals
      location.reload(true);
    }
  };
  return (
    <div>
      <form onSubmit={handleLogin}>
        <input id="id" placeholder="Username" />
        <input id="pw" placeholder="Password" type="password" />
        <button type="submit">Login</button>
        <p>Register</p>
      </form>
      <GoogleLogin />
    </div>
  );
}
export default LoginPage;