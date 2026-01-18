import { useEffect, useState } from "react";
import "../css/Main.css";

function List() {
  const [loading, setLoading] = useState(true);
  const [exchange, setExchange] = useState([]);
  const getExchange = async () => {
    const json = await (
      await fetch(
        "https://api.allorigins.win/raw?url=https://ecos.bok.or.kr/api/StatisticSearch/GZOJK8A2NI5BBV6E0NIU/json/kr/1/43/731Y001/D/20260116/20260116"
      )
    ).json();
    setExchange(json.StatisticSearch.row);
    setLoading(false);
  };
  useEffect(() => {
    getExchange();
  }, []);
  console.log(exchange);
  
  return (
    <div>
      {loading ? (
        <h1>loading</h1>
      ) : (
        <div>
          <h2>환율 리스트</h2>
          {exchange.map((exchange) => (
            <div className="list" key={exchange.ITEM_CODE1}>
              <p>{exchange?.DATA_VALUE}{exchange?.ITEM_NAME1}</p>
            </div>
            
          ))}
        </div>
      )}
    </div>
    
  );
}

export default List;
