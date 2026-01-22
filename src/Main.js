import Left from "./pages/Left";
import Right from "./pages/Right";
import "./css/Main.css";
import Submain from "./pages/Left";

function Main() {
    return (
        <div className="layout">
            <div className="left">
                <Submain/>
                {/* <Left /> */}
            </div>

            <div className="right">
                <Right/>
            </div>
        </div>
    );
}

export default Main;