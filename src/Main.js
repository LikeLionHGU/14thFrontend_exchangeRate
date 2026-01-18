import Calculator from "./pages/Calculator";
import List from "./pages/List";
import "./css/Main.css"

function Main() {
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
    <div>
      <div className="div-left">
        <Calculator />
      </div>
      <div className="div-right">
        <List />
      </div>
    </div>

  );
}

export default Main;



