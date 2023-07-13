import Cell from "../Cell/Cell"
import "./row.css"

// eslint-disable-next-line react/prop-types
function Row({size, rowType, colorEven, colorOdd}) {

  const rows = Array.from(Array(size).keys());

  return (
    <div className="row">
      {rows.map((idx,i) => {
        var cellType;
        if(rowType === "even"){
            cellType = idx % 2 == 0 ? "black" : "white";
        }else {
            cellType = idx % 2 != 0 ? "black" : "white";
        }  
        return (
            // eslint-disable-next-line react/jsx-key
            <Cell key={i} cellType={cellType} colorEven={colorEven} colorOdd={colorOdd}></Cell>
        );
      })}
    </div>
  );
}

export default Row;
