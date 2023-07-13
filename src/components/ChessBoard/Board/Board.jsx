import Row from "../Row/Row";
import "./board.css"

// eslint-disable-next-line react/prop-types
function Board({ size , colorOdd, colorEven}) {
  const rows = Array.from(Array(size).keys());
  return (
    <div className="board">
      {rows.map((idx, i) => {
        var rowType = idx % 2 == 0 ? "odd" : "even";
        return (
          // eslint-disable-next-line react/jsx-key
          <Row key={i} size={size} rowType={rowType} colorEven={colorEven} colorOdd={colorOdd}></Row>
        );
      })}
    </div>
  );
}

export default Board;
