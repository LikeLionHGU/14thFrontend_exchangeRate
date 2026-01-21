import { useEffect, useState } from "react";
import axios from "axios";
import Profile from "../asset/profile-picture.png"
import registerUser from "../components/Register";
import Login from "../components/Login";
import Mainicon from "../asset/MainIcon.png";
import GoogleLogin from "../components/loginPage";

function Right() {
    const [logined, setLogined] = useState(false);
    const [data, setDatas] = useState(null);
    const [user, setUser] = useState(null);


    useEffect(() => {
        const token = localStorage.getItem("accessToken");


        if (!token) {
            setLogined(false);
            alert("로그인 실패");
            return;
        }
        const Userinfo = localStorage.getItem("userInfo");
        if (Userinfo) {
            setUser(JSON.parse(Userinfo));
        }
        // 구글로그인과 로컬 로그인할떄 data정보 충돌문제

        axios.get("/mypage", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                console.log(res);
                console.log("mypage response:", res.data);
                setDatas(res.data.data);
                setLogined(true);
                if (Userinfo === null) {
                    setUser(res.data.user);
                }
            })
            .catch((error) => {
                setLogined(true);
                // console.log(error);
                // setLogined(false);
                // setDatas(null);
                // setUser(null);
                // localStorage.removeItem("accessToken");
                // localStorage.removeItem("userInfo");
            });

    }, []);

    const [register, setRegister] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const result = await Login(username, password);

            if (username === "") {
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


    function handleLogout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userInfo');
        setLogined(false);
    }

    return (
        logined ?
            <div className="Logined-profile">
                {/* {picture === null ? (<img
                src={Profile}
                alt="profile"
            />

            ) : (
                <img
                    src={picture}
                    alt="profile"
                />
            )} */}
                <img
                    src={Profile}
                    alt="profile"
                />
                {/* <p>{username}</p> */}
                <p>임청명</p>
                <button onClick={handleLogout}>Logout</button>
                {/* <div className="Bookmark">

            </div> */}
            </div> :
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
export default Right;