import { useEffect, useState } from "react";
import "../css/Main.css";
function Calculator() {
  const today = new Date();
  const todayDate = `${today.getFullYear()}${(today.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${today.getDate().toString().padStart(2, "0")}`;

  // 받아온 모든 환율 데이터 배열
  const [exchangeRateList, setExchangeRateList] = useState([]);

  // 선택된 화폐의 ITEM_CODE1 값
  const [selectedItemCode, setSelectedItemCode] = useState(null);

  // 현재 선택된 화폐의 환율 값
  const [currentExchangeRate, setCurrentExchangeRate] = useState(null);

  // 원화 입력값
  const [krwAmount, setKrwAmount] = useState("");

  // 외화 입력값
  const [foreignCurrencyAmount, setForeignCurrencyAmount] = useState("");

  // 환전 방향
  const [exchangeDirection, setExchangeDirection] = useState("KRW_TO_FOREIGN");

  //환율 이름 불러오기
  const selectedRateInfo = exchangeRateList.find(
    (item) => item.ITEM_CODE1 === selectedItemCode,
  );

  //엔화 환율 보정함수
  const getAdjustedRate = () => {
    if (!currentExchangeRate) return null;

    // 엔화 선택시 100으로 나눔
    if (
      selectedItemCode === "0000002" ||
      selectedItemCode === "0000029" ||
      selectedItemCode === "0000035"
    ) {
      return currentExchangeRate / 100;
    }
    return currentExchangeRate;
  };

  useEffect(() => {
    fetch(
      `https://api.allorigins.win/raw?url=https://ecos.bok.or.kr/api/StatisticSearch/GZOJK8A2NI5BBV6E0NIU/json/kr/1/43/731Y001/D/20260120/20260120`,
    )
      .then((response) => response.json())
      .then((data) => {
        const rateRows = data.StatisticSearch.row;

        // 전체 환율 목록을 저장
        setExchangeRateList(rateRows);

        // 기본 선택 화폐 -> 어레이 첫번째 항목이 되게(달러)
        setSelectedItemCode(rateRows[0].ITEM_CODE1);
        setCurrentExchangeRate(Number(rateRows[0].DATA_VALUE));
      })
      .catch((error) => {
        console.error("환율 데이터를 불러오지 못했습니다.", error);
      });
  }, []);

  // 화폐 변경 시 실행될 부분
  const handleCurrencyChange = (event) => {
    const selectedCode = event.target.value;
    setSelectedItemCode(selectedCode);

    // 선택한 ITEM_CODE1에 해당하는 환율을 찾음
    const selectedRate = exchangeRateList.find(
      (item) => item.ITEM_CODE1 === selectedCode,
    );

    if (selectedRate) {
      setCurrentExchangeRate(Number(selectedRate.DATA_VALUE));
    }

    //입력값 초기화
    setKrwAmount("");
    setForeignCurrencyAmount("");
  };

  // 원화 입력 부분
  const handleKrwChange = (event) => {
    const value = event.target.value;
    setKrwAmount(value);

    const adjustedRate = getAdjustedRate();

    if (adjustedRate !== null) {
      setForeignCurrencyAmount((value / adjustedRate).toFixed(2));
    }
  };

  // 외화 입력 부분
  const handleForeignChange = (event) => {
    const value = event.target.value;
    setForeignCurrencyAmount(value);

    const adjustedRate = getAdjustedRate();

    if (adjustedRate !== null) {
      setKrwAmount((value * adjustedRate).toFixed(0));
    }
  };

  // 환전 방향 바꾸기
  const handleDirectionChange = () => {
    setExchangeDirection(
      exchangeDirection === "KRW_TO_FOREIGN"
        ? "FOREIGN_TO_KRW"
        : "KRW_TO_FOREIGN",
    );
  };

  return (
    <div className="calculator-box gap">
      <h2>환율 계산기</h2>

      <select onChange={handleCurrencyChange} value={selectedItemCode || ""}>
        {exchangeRateList.map((item) => (
          <option key={item.ITEM_CODE1} value={item.ITEM_CODE1}>
            {item.ITEM_NAME1}
          </option>
        ))}
      </select>

      {currentExchangeRate === null ? (
        <p>환율을 불러오는 중입니다...</p>
      ) : (
        <>
          {exchangeDirection === "KRW_TO_FOREIGN" ? (
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
                placeholder="외화"
                value={foreignCurrencyAmount}
                readOnly
              />
            </>
          ) : (
            <>
              <input
                type="number"
                placeholder="외화"
                value={foreignCurrencyAmount}
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
            {selectedRateInfo?.ITEM_NAME1} = {currentExchangeRate} KRW
          </p>
        </>
      )}
    </div>
  );
}

export default Calculator;
