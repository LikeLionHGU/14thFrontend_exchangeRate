import List from "./List";
import Calculator from "./Calculator";
import "../css/Main.css";
import { useEffect, useState } from "react";

function Left() {
    const [data, setData] = useState([]);

    const getExchange = async () => {
        const response = await fetch(
            `https://v6.exchangerate-api.com/v6/8be5102521075c8aee3cdb75/latest/USD`
        );
        const json = await response.json();
        setData(json.conversion_rates);
    };
    useEffect(
        () => {
            getExchange();
        }, []
    );
    console.log(data);


    return (
        <div className="Msub-div">
            <div className="gap">
                <Calculator data={data}/>
                <List data={data}/>
            </div>
        </div >
    );
}
export default Left;