import { useEffect, useState } from "react";
import "../css/Main.css";
import styles from "../css/List.module.css";

function List() {
  const today = new Date();
  const todayDate = `${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, "0")}${today.getDate()}`;

  const [loading, setLoading] = useState(true);
  const [todayExchange, setTodayExchange] = useState([]);
  const [yesterdayExchange, setYesterdayExchange] = useState([]);
  const getExchange = async () => {
    const json1 = await (
      await fetch(
        `https://api.allorigins.win/raw?url=https://ecos.bok.or.kr/api/StatisticSearch/GZOJK8A2NI5BBV6E0NIU/json/kr/1/43/731Y001/D/20260120/20260120`,
      )
    ).json();
    const json2 = await (
      await fetch(
        `https://api.allorigins.win/raw?url=https://ecos.bok.or.kr/api/StatisticSearch/GZOJK8A2NI5BBV6E0NIU/json/kr/1/43/731Y001/D/20260119/20260119`,
      )
    ).json();
    setTodayExchange(json1.StatisticSearch.row);
    setYesterdayExchange(json2.StatisticSearch.row);
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
          <div className={styles.exchangeListMain}>
            {todayExchange.map((todayExchange, index) => (
              <div
                className={styles.exchangeListBox}
                key={todayExchange.ITEM_CODE1}
              >
                <h2>{parseFloat(todayExchange.DATA_VALUE)}원</h2>

                {parseFloat(
                  todayExchange.DATA_VALUE -
                    yesterdayExchange[index].DATA_VALUE,
                ).toFixed(2) == 0.0 ? (
                  <h3>
                    ➖
                    0원
                  </h3>
                ) : parseFloat(
                    todayExchange.DATA_VALUE -
                      yesterdayExchange[index].DATA_VALUE,
                  ).toFixed(2) >= 0.0 ? (
                  <h3 style={{ color: "red" }}>
                    🔺
                    {parseFloat(
                      todayExchange.DATA_VALUE -
                        yesterdayExchange[index].DATA_VALUE,
                    ).toFixed(2)}
                    원
                  </h3>
                ) : (
                  <h3 style={{ color: "blue" }}>
                    🔻
                    {parseFloat(
                      todayExchange.DATA_VALUE -
                        yesterdayExchange[index].DATA_VALUE,
                    ).toFixed(2)}
                    원
                  </h3>
                )}

                <p>{todayExchange.ITEM_NAME1.slice(2)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default List;