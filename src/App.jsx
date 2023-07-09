import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [bill, setBill] = useState("");
  const [tip, setTip] = useState("10%");
  const [split, setSplit] = useState(1);
  const [splitTotal, setSplitTotal] = useState("0");

  function handleBill(event) {
    setBill(event.target.value);
  }

  function handleTip(event) {
    let value = event.target.value.replace("%", "");
    if (value.indexOf("%") === -1) {
      value = value + "%";
    }
    setTip(value);
  }

  function splitMinus() {
    setSplit((oldValue) => {
      return Math.max(oldValue - 1, 1);
    });
  }

  function splitPlus() {
    setSplit((oldValue) => {
      return oldValue + 1;
    });
  }

  function calculate() {
    const newTip = parseInt(tip.replace("%", ""));
    const result = ((bill * (1 + newTip / 100)) / split).toFixed(2);
    setSplitTotal(result);
  }

  useEffect(() => {
    calculate();
  }, [bill, tip, split]);

  return (
    <div>
      <h1>Tip Calculator</h1>
      <label>Bill Total</label>
      <input
        type="text"
        placeholder={"0.00"}
        value={bill}
        onChange={handleBill}
      />
      <label>Tip</label>
      <input
        type="text"
        placeholder={"0.00"}
        value={tip}
        onChange={handleTip}
      />
      <div className="summary">
        <div className="split">
          <label>Split</label>
          <div className="split-control">
            <button onClick={splitMinus}>-</button>
            <span>{split}</span>
            <button onClick={splitPlus}>+</button>
          </div>
        </div>
        <div className="result">
          <label>Split total</label>
          <span>{splitTotal}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
