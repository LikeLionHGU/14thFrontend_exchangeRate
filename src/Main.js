import Calculator from "./pages/Calculator";
import List from "./pages/List";
import "./css/Main.css"

function Main() {
  return (
    <div>
        <div className="div-left">
            <Calculator/>
        </div>
        <div className="div-right">
            <List/>
        </div>
    </div>
    
  );
}

export default Main;



