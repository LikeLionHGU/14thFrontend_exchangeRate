import List from "./List";
import Calculator from "./Calculator";
import "../css/Main.css";

import { useEffect, useState } from "react";

function Submain() {

    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const getMovies = async () => {
        const json = await (
            await fetch(
                `https://yts.bz/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`
            )
        ).json();
        setMovies(json.data.movies);
        setLoading(false);
    };
    useEffect(() => {
        getMovies();
    }, []);
    return (
        <div className="Msub-div">
            <div className="sub-div">
                <Calculator />
            </div>
            <div className="sub-div">
                <List />
            </div>
        </div>
    );
}
export default Submain;