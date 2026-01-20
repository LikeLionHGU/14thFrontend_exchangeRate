
import "../css/Main.css";
function LoginedPage(username,picture) {
    return (
        <div>
            <img
                src={picture}
                alt="profile"
                style={{ width: 48, height: 48, borderRadius: "50%" }}
            />
            <p>{username}</p>
        </div>

    );
} export default LoginedPage;
