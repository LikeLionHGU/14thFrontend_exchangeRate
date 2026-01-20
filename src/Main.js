import Submain from "./pages/SubMain";
import LoginPage from "./pages/LoginPage";
import LoginedPage from "./pages/LoginedPage";
import "./css/Main.css";
import { useEffect, useState } from "react";
import axios from "axios";

function Main() {
    const [logined, setLogined] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");


        if (!token) {
            setLogined(false);
            console.log("fail here");
            return;
        }
        const savedUser = localStorage.getItem("userInfo");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        console.log()

        axios.get("/mypage", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                console.log("mypage response:", res.data);
                setUser(res.data);
                setLogined(true);
            })
            .catch(() => {
                localStorage.removeItem("accessToken");
                setLogined(false);
                setUser(null);
            });
    }, []);

    return (
        <div className="layout">
            <div className="left">
                <Submain />
            </div>

            <div className="right">
                {!logined ? (
                    <LoginPage />
                ) : !user ? (
                    <h1>이게문제</h1>
                ) : (
                    <LoginedPage
                        username={user.name}
                        picture={user.picture}
                    />
                )}
            </div>
        </div>
    );
}

export default Main;