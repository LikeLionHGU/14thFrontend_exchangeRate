import Login from "../components/Login";
import { useState } from "react";
import axios from "axios";

function LoginPage() {
    async function LoginSubmit() {
        const response = await axios.post(
            `${process.env.REACT_APP_HOST_URL}/Login`,
            {
                username,
                password,
            }
        );
    }


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleUsername() {
        setUsername(username);
    }
    function handlePassword() {
        setPassword(password);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const result = await Login(username, password);

            if (username === "") {
                alert("아이디를 입력하세요!");
            }
            if (result.success) {
                alert("로그인 성공! 로그인해주세요.");
            }
        } catch (error) {
            alert("로그인 실패");
            console.error(error);
        }
    }
    function handleRegister(){
        
    }
    return (
        <div>
            <form onSubmit={handleLogin}>
                <input placeholder="Username" />
                <input placeholder="Password" type="password" />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
export default LoginPage;