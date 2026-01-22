import { useState } from "react";
import axios from "axios";

function RegisterPage() {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [name, setName] = useState("");

        const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        if (password !== passwordCheck) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {

            const response = await axios.post(
                `${process.env.REACT_APP_HOST_URL}/register`,
                {
                    username,
                    password,
                    user: { name }
                }
            );

            if (response.data.success) {
                alert("회원가입 성공! 로그인해주세요.");
                window.location.href = '/'; //정말 핵심을 찔렀어!
            }
        } catch (error) {
            alert("회원가입 실패");
            console.error(error);
        }
    };



    return (
        <div>
            <form onSubmit={handleRegisterSubmit}>
                <input
                    placeholder="Username / e-mail"
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
                 <input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}
export default RegisterPage;