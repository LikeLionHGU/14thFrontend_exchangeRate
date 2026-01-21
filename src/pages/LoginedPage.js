import Profile from "../asset/profile-picture.png"
import "../css/Main.css";
function LoginedPage() {
    // { username, picture }
    function handleLogout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userInfo');
    }
    return (
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
        </div>

    );
} export default LoginedPage;
