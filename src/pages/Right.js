import { useEffect, useState } from "react";
import axios from "axios";
import Profile from "../asset/profile-picture.png"
import Mainicon from "../asset/MainIcon.png";

import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

function Right() {
    const [logined, setLogined] = useState(false);
    const [data, setDatas] = useState(null);
    const [name, setName] = useState(null);
    const [picture, setPicture] = useState(null);
    const [register,setRegister]= useState(false);




    useEffect(() => {
        const token = localStorage.getItem("accessToken");


        if (!token) {
            setLogined(false);
            return;
        }
        // 구글로그인과 로컬 로그인할떄 data정보 충돌문제

        if (logined === true) {
            const User = JSON.parse(localStorage.getItem("userInfo"));
            setName(User.name);
            setPicture(User.picture);
        }

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

    function handleLogout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userInfo');
        setLogined(false);
    }


    return (
        logined ?
            <div className="Logined-profile">
                <img
                    src={picture}
                    alt="profile"
                />
                <p>{name}</p>
                <button onClick={handleLogout}>Logout</button>
                <div className="Bookmark">

                </div>
            </div> :
            <div className="profile-div">
                <img src={Mainicon} alt="Main Icon" />
                {!register ? (
                    <LoginPage />
                ) : (
                    <div></div>
                    // <RegisterPage />
                )}
            </div>
    );

}
export default Right;