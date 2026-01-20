import { useEffect, useState } from "react";

const currencyList = [
  { code: "USD", name: "미국 달러", apiCode: "731Y001" },
  { code: "JPY", name: "일본 엔", apiCode: "731Y002" },
  { code: "EUR", name: "유로", apiCode: "731Y003" },
  { code: "CNY", name: "중국 위안", apiCode: "731Y004" },
  { code: "GBP", name: "영국 파운드", apiCode: "731Y005" }
];

function Calculator() {
  const [exchangeRate, setExchangeRate] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState(currencyList[0]);
  const [krwAmount, setKrwAmount] = useState("");
  const [foreignAmount, setForeignAmount] = useState("");
  const [direction, setDirection] = useState("KRW_TO_FOREIGN");

  // 환율 가져오기
  useEffect(() => {
    fetch(
      `https://ecos.bok.or.kr/api/StatisticSearch/GZOJK8A2NI5BBV6E0NIU/json/kr/1/1/${selectedCurrency.apiCode}/D/20260118/20260118`
    )
      .then((response) => response.json())
      .then((data) => {
        const rate = data.StatisticSearch.row[0].DATA_VALUE;
        setExchangeRate(Number(rate));
      })
      .catch((error) => {
        console.log("환율 데이터를 불러오지 못했습니다.");
        console.log(error);
      });
  }, [selectedCurrency]);


/*
useEffect(() => {
  // 임시 환율 ( 1달러 = 1300원)
  setExchangeRate(1300);
}, [selectedCurrency]);
*/

  // 원화 입력
  const handleKrwChange = (event) => {
    const value = event.target.value;
    setKrwAmount(value);

    if (exchangeRate !== null) {
      setForeignAmount((value / exchangeRate).toFixed(2));
    }
  };

  // 외화 입력
  const handleForeignChange = (event) => {
    const value = event.target.value;
    setForeignAmount(value);

    if (exchangeRate !== null) {
      setKrwAmount((value * exchangeRate).toFixed(0));
    }
  };

  // 환전 방향 변경
  const handleDirectionChange = () => {
    setDirection(
      direction === "KRW_TO_FOREIGN"
        ? "FOREIGN_TO_KRW"
        : "KRW_TO_FOREIGN"
    );
    setKrwAmount("");
    setForeignAmount("");
  };

  // 화폐 변경
  const handleCurrencyChange = (event) => {
    const currency = currencyList.find(
      (item) => item.code === event.target.value
    );
    setSelectedCurrency(currency);
    setKrwAmount("");
    setForeignAmount("");
  };

  return (
    <div>
      <h1>환율 계산기</h1>

      <select onChange={handleCurrencyChange}>
        {currencyList.map((currency) => (
          <option key={currency.code} value={currency.code}>
            {currency.name}
          </option>
        ))}
      </select>

      {exchangeRate === null ? (
        <p>환율을 불러오는 중입니다...</p>
      ) : (
        <>
          {direction === "KRW_TO_FOREIGN" ? (
            <>
              <input
                type="number"
                placeholder="원화 (KRW)"
                value={krwAmount}
                onChange={handleKrwChange}
              />

              <button onClick={handleDirectionChange}>⇅</button>

              <input
                type="number"
                placeholder={selectedCurrency.code}
                value={foreignAmount}
                readOnly
              />
            </>
          ) : (
            <>
              <input
                type="number"
                placeholder={selectedCurrency.code}
                value={foreignAmount}
                onChange={handleForeignChange}
              />

              <button onClick={handleDirectionChange}>⇅</button>

              <input
                type="number"
                placeholder="원화 (KRW)"
                value={krwAmount}
                readOnly
              />
            </>
          )}

          <p>
            현재 환율: 1 {selectedCurrency.code} = {exchangeRate} KRW
          </p>
        </>
      )}
    </div>
  );
}

export default Calculator;
