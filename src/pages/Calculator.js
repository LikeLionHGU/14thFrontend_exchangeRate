import { useState } from "react";
import styles from "../css/Calculator.module.css";

function Calculator({ data }) {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("KRW");

  if (!data) return null;

  const result = ((amount / data[from]) * data[to]).toFixed(2);

  function handleFlipped() {
    setAmount(result);
    setFrom(to);
    setTo(from);
  }

  return (
    <div className={styles.CalMaindiv}>
      <div className={styles.Caldiv}>
        <div className={styles.subdiv}>
          <div>
            <select
              className={styles.Form}
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            >
              {Object.keys(data).map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>

            <input
              className={styles.in}
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div>
            <select
              className={styles.Form}
              value={to}
              onChange={(e) => setTo(e.target.value)}
            >
              {Object.keys(data).map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>

            <input
              className={styles.in}
              type="number"
              value={result}
              readOnly
            />
          </div>
        </div>

        <button className={styles.button} onClick={handleFlipped}>
          ⇅
        </button>
      </div>
    </div>
  );
}

export default Calculator;