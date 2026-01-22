import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function Calculator({ data }) {
  const [first, setfirst] = useState("first");
  const [second, setsecond] = useState("second");
  const [flipped, setFlipped] = useState(false);
  const [isFirst, setIsfirst] = useState(true);
  const [F, setF] = useState();
  const [S, setS] = useState();
  console.log(data);
  const info = Object.entries(data);
  console.log(info);

  function Transfer() {

    if (isFirst == true) {
      setIsfirst(false);
    } else {
      setIsfirst(true);
    }
    setFlipped((current) => !current);
  }

  function handleInput() {
    if (isFirst == true) {
      setfirst(document.getElementById("first").value);
      setsecond()
    } else {
      setsecond(document.getElementById("second").value);
    }

  }
  function Calculate() {

    const Fselect = document.getElementById("first");
    const SFselect = document.getElementById("second");

    console.log(Fselect);
    console.log(SFselect);
  }
  function handleOption(){
    setF(parseFloat(document.getElementById("first-select").value.substring(5)));
    setS(parseFloat(document.getElementById("second-select").value.substring(5)));
        console.log(F);
    console.log(S);
  }
  return (
    <div>
      <div>
        <div>
          <select id="first-select"onChange={handleOption}>
            <option>화페 선택</option>
            {info.map(([code, value]) => (
              <option key={code}>{code} : {value}</option>
            ))}
          </select>
          <input type="number" onChange={handleInput} disable={!flipped} id={first} value={first}></input>
        </div>
        <div>
          <select id="second-select" onChange={handleOption}>
            {info.map(([code, value]) => (
              <option key={code}>{code} : {value}</option>
            ))}</select>
          <input type="number" onChange={handleInput} disable={flipped} id={second} value={second}></input>
        </div>
      </div>
      <button onClick={Transfer} />
    </div>
  );
}

export default Calculator;