import { useState } from "react";
import "./App.css";

function App() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, "00"];
  const func = ["/", "*", "-", "+"];
  const [numberPlace, setNumberPlace] = useState("0");
  const [type, setType] = useState("");
  const [value, setValue] = useState("");
  const [firstSet, setFirstSet] = useState(true);
  const [remember, setRemember] = useState("");
  const [lastRemember, setLastRemember] = useState("");
  const [error, setError] = useState("");

  const setNumber = (valueNumber) => {
    setError("");

    if (valueNumber === ".") {
      setNumberPlace(`${numberPlace}${valueNumber}`);
      setFirstSet(false);
    } else {
      if (firstSet) {
        setNumberPlace(`${valueNumber}`);
        setFirstSet(false);
      } else {
        setNumberPlace(
          `${numberPlace === "0" ? "" : numberPlace}${valueNumber}`
        );
      }
    }
  };

  const clear = () => {
    setError("");
    setNumberPlace("0");
    setValue("");
    setFirstSet(true);
    setType("");
    setLastRemember("");
    setRemember("");
  };

  const changeIndicator = () => {
    const newValue = Number(numberPlace) * -1;
    setNumberPlace(`${newValue}`);
  };

  const changeType = (newType) => {
    setFirstSet(true);
    setError("");
    setType(newType);
    if (lastRemember === "") {
      setRemember(numberPlace + " " + newType);
    } else {
      setRemember(" " + newType);
    }
    setValue(numberPlace);
  };

  const changeNumbers = () => {
    if (type === "") {
      setError("Выберите операцию которую хотите совершить");
    } else {
      let newValue = 0;
      switch (type) {
        case "/":
          newValue = Number(value) / Number(numberPlace);
          setNumberPlace(`${newValue}`);
          break;
        case "*":
          newValue = Number(value) * Number(numberPlace);
          setNumberPlace(`${newValue}`);
          break;
        case "-":
          newValue = Number(value) - Number(numberPlace);
          setNumberPlace(`${newValue}`);
          break;
        case "+":
          newValue = Number(value) + Number(numberPlace);
          setNumberPlace(`${newValue}`);
          break;
        default:
          break;
      }
      setFirstSet(true);
      setValue("0");
      setType("");
      setRemember("");
      setLastRemember(lastRemember + " " + remember + " " + numberPlace);
    }
  };

  return (
    <div className="App">
      <div className="debugger">
        <div> NumberPlace {numberPlace} </div>
        <div> Value {value}</div>
        <div> Type {type}</div>
        <div> Remember {remember}</div>
        <div> LastRemember {lastRemember}</div>
      </div>
      <div className="calculator">
        <div className="error">{error}</div>
        <div className="remember">
          {lastRemember} {remember}
        </div>
        <div className="numberPlace">
          <span>=</span>
          <div className="number">{numberPlace}</div>
        </div>
        <div className="numbers">
          <div className="tools">
            <button onClick={clear}>
              <div>AC</div>
            </button>
            <button onClick={changeIndicator}>
              <div>+/-</div>
            </button>
            <button onClick={() => setNumberPlace(numberPlace / 100)}>
              <div>%</div>
            </button>
          </div>
          <div className="function">
            {func.map((el) => (
              <button onClick={() => changeType(el)} key={el}>
                <div>{el}</div>
              </button>
            ))}
            <button onClick={changeNumbers} className="answer">
              <div>=</div>
            </button>
          </div>
          <div className="mainNumbers">
            {numbers.map((el) => (
              <button onClick={() => setNumber(el)} key={el}>
                <div>{el}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
