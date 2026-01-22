import { useState } from "react"
import styles from "../css/Calculator.module.css";

function Calculator({ data }) {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("KRW");
  const [flipped, setFlipped] = useState(true);

  if (!data) return null;

  const result = ((amount / data[from]) * data[to]).toFixed(2);

  function handleFlipped() {
    setFlipped(current => !current);
  }
  return (
    flipped ? (
      <div>
        <div>
          <select value={from} onChange={(e) => setFrom(e.target.value)}>
            {Object.entries(data).map(([code, value]) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <select value={to} onChange={(e) => setTo(e.target.value)}>
            {Object.entries(data).map(([code, value]) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
          <input type="number" value={result} readOnly />
        </div>
        <button onClick={handleFlipped} />
      </div>
    ) : (<div>
      <div>
        <select value={to} onChange={(e) => setTo(e.target.value)}>
          {Object.entries(data).map(([code, value]) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
        <input type="number" value={result} readOnly />
      </div>
      <div>
        <select value={from} onChange={(e) => setFrom(e.target.value)}>
          {Object.entries(data).map(([code, value]) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <button className={styles.button} onClick={handleFlipped} />
    </div>)

  );
}
export default Calculator;