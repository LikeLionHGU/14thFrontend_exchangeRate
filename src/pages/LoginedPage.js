import Profile from "../asset/profile-picture.png"
import "../css/Main.css";
function LoginedPage(username,picture) {
    return (
        <div className="Logined-profile">
            {picture === null ? (<img
                src={Profile}
                alt="profile"
            />

            ) : (
                <img
                    src={picture}
                    alt="profile"
                />
            )}

            <p>{username}</p>
            {/* <div className="Bookmark">

            </div> */}
        </div>

    );
} export default LoginedPage;
