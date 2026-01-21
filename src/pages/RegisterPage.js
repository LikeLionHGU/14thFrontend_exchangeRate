import { useState } from "react";
import axios from "axios";

function RegisterPage() {
    async function RegisterSubmit() {
        const response = await axios.post(
            `${process.env.REACT_APP_HOST_URL}/register`,
            {
                username,
                password,
            }
        );
        const handleRegisterSubmit = async (e) => {
            e.preventDefault();

            if (password !== passwordCheck) {
                alert("비밀번호가 일치하지 않습니다.");
                return;
            }

            try {
                if (response.success) {
                    alert("회원가입 성공! 로그인해주세요.");
                    setRegister(false);
                }
            } catch (error) {
                alert("회원가입 실패");
                console.error(error);
            }
        };
    }


    const [register, setRegister] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");


    return (
        <div>
            <form>
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
                <p>cancel</p>
            </form>
        </div>
    );
}
export default RegisterPage;