import "../css/Main.css";
import styles from "../css/List.module.css";

function List({ data }) {
  const list = Object.entries(data);

  const won = data.KRW;

  return (
    <div>
      <div className={styles.list}>
        <div className={styles.exchangeListMain}>
          {list.map((list) => (
            <div className={styles.exchangeListBox} key={list[0]}>
              <h1>{(won / list[1]).toFixed(2)}원</h1>
              <h1>{list[0]} / 원</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default List;
