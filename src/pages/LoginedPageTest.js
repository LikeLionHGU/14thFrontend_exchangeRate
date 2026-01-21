import Profile from "../asset/profile-picture.png"
import "../css/Main.css";
import axios from "axios";

function LoginedPageTest() {
    // const response = await axios.post(
    //     `${process.env.REACT_APP_HOST_URL}/bookmark`,
    //     { code }
    // );

    function handleLogout(){
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userInfo');
    }
    return (
        <div className="Logined-profile">
            <img
                src={Profile}
                alt="profile"
            />
            <p>청명</p>
            <button onClick={handleLogout}>Logout</button>
            <div className="Bookmark">
            </div>
        </div>

        

    );
} export default LoginedPageTest;
