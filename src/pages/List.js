import { useEffect, useState } from "react";
import styles from "../css/List.module.css";

function List() {
  const today = new Date();
  const todayDate = `${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, "0")}${today.getDate()}`;

  const [loading, setLoading] = useState(true);
  const [exchange, setExchange] = useState([]);
  const getExchange = async () => {
    const json = await (
      await fetch(
        `https://api.allorigins.win/raw?url=https://ecos.bok.or.kr/api/StatisticSearch/GZOJK8A2NI5BBV6E0NIU/json/kr/1/43/731Y001/D/${todayDate}/${todayDate}`,
      )
    ).json();
    setExchange(json.StatisticSearch.row);
    setLoading(false);
  };
  useEffect(() => {
    getExchange();
  }, []);

  return (
    <div>
      {loading ? (
        <h1>loading</h1>
      ) : (
        <div className={styles.list}>
          <h1>환율 리스트</h1>
          <div className={styles.exchangeListMain}>
            {exchange.map((exchange) => (
            <div className={styles.exchangeListBox} key={exchange.ITEM_CODE1}>
              <h2>{exchange?.DATA_VALUE}원</h2>
              <p>{exchange?.ITEM_NAME1}</p>
            </div>
          ))}
          </div>
          
        </div>
      )}
    </div>
  );
}

export default List;
