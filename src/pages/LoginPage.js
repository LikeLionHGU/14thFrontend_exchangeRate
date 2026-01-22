import { useState } from "react";
import axios from "axios";

function LoginPage() {
  async function LoginSubmit() {
    const response = await axios.post(
      `${process.env.REACT_APP_HOST_URL}/Login`,
      {
        username,
        password,
      },
    );

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("userInfo", JSON.stringify(response.data.user));
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleUsername() {
    setUsername(document.getElementById("id").value);
  }
  function handlePassword() {
    setPassword(document.getElementById("pw").value);
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    //setUsername(document.getElementById("id").value);
    //setPassword(document.getElementById("pw").value);

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
        <input id="id" onChange={handleUsername} placeholder="Username / e-mail" />
        <input
          id="pw"
          onChange={handlePassword}
          placeholder="Password"
          type="password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
export default LoginPage;
