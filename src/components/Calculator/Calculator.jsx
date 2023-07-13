import { useState } from "react";
import "./calculator.css";

import Button from "./Button/Button";

let result = "";
let colorButtons = { "+": "#FFA500", "-": "#FFA500", "*": "#FFA500", "/": "#FFA500" };
function Calculator() {
  const buttons = [
    { value: "M", onClick: () => clearScreen() , styleColor: "lightgray"},
    { value: "CE", onClick: () => clearScreen(), styleColor: "lightgray" },
    { value: "C", onClick: () => clearScreen() ,styleColor: "lightgray"},
    { value: "\u2190", onClick: () => deleteNumber(), styleColor: "lightgray"},
    { value: 7, onClick: () => addToInput(7) },
    { value: 8, onClick: () => addToInput(8) },
    { value: 9, onClick: () => addToInput(9) },
    { value: "+", onClick: () => add(), styleColor: colorButtons["+"] },
    { value: 4, onClick: () => addToInput(4) },
    { value: 5, onClick: () => addToInput(5) },
    { value: 6, onClick: () => addToInput(6) },
    { value: "-", onClick: () => substract(), styleColor: colorButtons["-"] },
    { value: 1, onClick: () => addToInput(1) },
    { value: 2, onClick: () => addToInput(2) },
    { value: 3, onClick: () => addToInput(3) },
    { value: "*", onClick: () => multiply(), styleColor: colorButtons["*"] },
    { value: ".", onClick: () => addToInput(".") },
    { value: 0, onClick: () => addToInput(0) },
    { value: "=", onClick: () => evaluate(), styleColor: "#2B547E"},
    { value: "\u00F7", onClick: () => divide(), styleColor: colorButtons["/"] },
  ];
  const [contentScreen, setContentScreen] = useState("");
  const [previousNumber, setPreviousNumber] = useState("");
  const [currentNumber, setCurrentNumber] = useState("");
  const [operator, setOperator] = useState("");
  const [resultScreen, setResultScreen] = useState("");

  const operators = ["+", "-", "*", "/"];

  function addToInput(input) {
    if (currentNumber.length < 5) {
      if (input === ".") {
        if (
          !currentNumber.includes(".") &&
          !operators.includes(contentScreen[contentScreen.length - 1])
        ) {
          setCurrentNumber(currentNumber.concat(input));
          setContentScreen(contentScreen.concat(input));
        }
      } else {
        setCurrentNumber(currentNumber.concat(input));
        setContentScreen(contentScreen.concat(input));
      }
    }
  }

  function clearScreen() {
    setContentScreen("");
    setCurrentNumber("");
    setPreviousNumber("");
    setOperator("");
    setResultScreen("");
    setColorButton("");
  }

  function deleteNumber() {
    let lastVal = contentScreen.charAt(contentScreen.length - 1);
    if (operators.includes(lastVal)) {
      setCurrentNumber(previousNumber);
      setContentScreen(contentScreen.slice(0, -1));
      setOperator("");
    } else {
      setCurrentNumber(currentNumber.slice(0, -1));
      setContentScreen(contentScreen.slice(0, -1));
    }
  }

  function setColorButton(operator) {
    for (let o in colorButtons) {
      if (o === operator) {
        colorButtons[o] = "#7FB3D5";
      } else {
        colorButtons[o] = "#FFA500";
      }
    }
  }

  function styleCurrentOperator(operator) {
    if (operator === "+") {
      setColorButton("+");
    } else if (operator === "-") {
      setColorButton("-");
    } else if (operator === "*") {
      setColorButton("*");
    } else if (operator === "/") {
      setColorButton("/");
    }
  }

  function addOperator(operator) {
    setPreviousNumber(currentNumber);
    setCurrentNumber("");
    setContentScreen(contentScreen + operator);
    setOperator(operator);
    styleCurrentOperator(operator);
  }

  function addOperatorHasEvaluate(operator) {
    evaluate();
    setPreviousNumber(result);
    setCurrentNumber("");
    setContentScreen(result + operator);
    setOperator(operator);
    styleCurrentOperator(operator);
  }

  function changeOperator(operator) {
    setOperator(operator);
    setContentScreen(contentScreen.slice(0, -1) + operator);
    styleCurrentOperator(operator);
  }

  function add() {
    if (
      operator !== "" &&
      operators.includes(contentScreen[contentScreen.length - 1])
    ) {
      changeOperator("+");
    } else if (operator !== "") {
      addOperatorHasEvaluate("+");
    } else {
      addOperator("+");
    }
  }

  function substract() {
    if (
      operator !== "" &&
      operators.includes(contentScreen[contentScreen.length - 1])
    ) {
      changeOperator("-");
    } else if (operator !== "") {
      addOperatorHasEvaluate("-");
    } else {
      addOperator("-");
    }
  }

  function multiply() {
    if (
      operator !== "" &&
      operators.includes(contentScreen[contentScreen.length - 1])
    ) {
      changeOperator("*");
    } else if (operator !== "") {
      addOperatorHasEvaluate("*");
    } else {
      addOperator("*");
    }
  }

  function divide() {
    if (
      operator !== "" &&
      operators.includes(contentScreen[contentScreen.length - 1])
    ) {
      changeOperator("/");
    } else if (operator !== "") {
      addOperatorHasEvaluate("/");
    } else {
      addOperator("/");
    }
  }

  function isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
  }
  function setScreen(res) {
    if (isFloat(res)) {
      res = res.toFixed(5);
    }
    result = res.toString();
    setResultScreen(res.toString());
    setContentScreen(res.toString());
    setCurrentNumber(res.toString());
  }

  function evaluate() {
    if (operator === "+") {
      let res = Number(previousNumber) + Number(currentNumber);
      setScreen(res);
    } else if (operator === "-") {
      let res = Number(previousNumber) - Number(currentNumber);
      setScreen(res);
    } else if (operator === "*") {
      let res = Number(previousNumber) * Number(currentNumber);
      setScreen(res);
    } else if (operator === "/") {
      if (Number(currentNumber) !== 0) {
        let res = Number(previousNumber) / Number(currentNumber);
        setScreen(res);
      } else {
        setScreen("");
      }
    }
    setOperator("");
    setColorButton("");
  }

  return (
    <div className="app-calculator">
      <div className="container-calculator">
        <div className="calculator">
          <div className="screen">
            <div className="contentScreen">{contentScreen}</div>
            <div className="resultScreen">{resultScreen}</div>
          </div>

          <div className="keyboard">
            {buttons.map((bt, index) => {
              return (
                <Button
                  key={index}
                  value={bt.value}
                  onClick={bt.onClick}
                  styleColor={bt.styleColor}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
