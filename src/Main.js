import Left from "./pages/Left";
import Right from "./pages/Right";
import "./css/Main.css";

function Main() {
    return (
        <div className="layout">
            <div className="left">
                <Left />
            </div>

            <div className="right">
                <Right/>
            </div>
        </div>
    );
}

export default Main;