import List from "./List";
import Calculator from "./Calculator";
import "../css/Main.css";
import axios from "axios";
import { useEffect, useState } from "react";

function Submain() {
    const [data, setData] = useState(null);

    const getExchange = async () => {
        const response = await fetch(
            `https://v6.exchangerate-api.com/v6/8be5102521075c8aee3cdb75/latest/USD`
        );
        const json = await response.json();
        setData(json);
    };
    useEffect(
        () => {
            getExchange();
            console.log(data);
        }, []
    );
    return (
        <div className="Msub-div">
            <div className="gap">
                <Calculator />
                <List />
            </div>
        </div >
    );
}
export default Submain;