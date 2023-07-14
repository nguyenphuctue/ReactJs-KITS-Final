import { useState } from "react";
import Board from "./Board/Board";
import "./chess-board.css";

import { Button, Form, InputNumber, Typography, ColorPicker } from "antd";
const { Title } = Typography;

// eslint-disable-next-line react/prop-types
function ChessBoard({ t }) {
  const [size, setSize] = useState(0);
  const [colorEven, setColorEven] = useState("black");
  const [colorOdd, setColorOdd] = useState("white");
  const [value, setValue] = useState(3);

  function getSize(value) {
    setSize(value);
  }

  function getValue() {
    setValue(size);
  }

  function getColorEven(value) {
    setColorEven(value.toHexString());
  }

  function getColorOdd(value) {
    setColorOdd(value.toHexString());
  }

  function changeColor() {
    let temp = colorEven;
    setColorEven(colorOdd);
    setColorOdd(temp);
  }

  function handleInput(e) {
    if (e.key === "," || e.key === ".") {
      e.preventDefault();
    }
  }

  return (
    <div className="container-chess-board">
      <Title style={{ textAlign: "center" }}>
        {t("content.chess-board.title")}
      </Title>
      <Form labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
        <Form.Item label="Size" name="size">
          <InputNumber
            style={{ width: 500 }}
            min={1}
            max={10}
            onKeyDown={handleInput}
            onChange={getSize}
          />
        </Form.Item>
        <Form.Item label="Color Even" name="color-even">
          <ColorPicker value={colorEven} onChange={getColorEven} />
        </Form.Item>
        <Form.Item label="Color Odd" name="color-odd">
          <ColorPicker value={colorOdd} onChange={getColorOdd} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
          <Button type="primary" onClick={getValue}>
            Submit
          </Button>
        </Form.Item>
      </Form>

      <div
        className="chessBoard"
        onClick={changeColor}
        style={{ width: 50 * value + 2 + "px" }}
      >
        <Board size={value} colorEven={colorEven} colorOdd={colorOdd} />
      </div>
    </div>
  );
}

export default ChessBoard;
