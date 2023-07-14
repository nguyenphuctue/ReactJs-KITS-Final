import { useState } from "react";
import { Button, Card, Space, Typography, Pagination, InputNumber } from "antd";
const { Title } = Typography;

// eslint-disable-next-line react/prop-types
function Quote({ t }) {
  const [listQuotes, setListQuotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputNum, setInputNum] = useState(0);

  function handlePageChange(page) {
    setCurrentPage(page);
  }
  function getInputNum(value) {
    setInputNum(value);
  }
  function getQuote() {
    fetch("http://localhost:3000/quote", {
      headers: {
        "Content-Type": "application/json",
        token: sessionStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => setListQuotes([data, ...listQuotes]))
      .catch(() => {
        alert("Cannot connect to server");
      });
  }

  function getMultiQuote() {
    fetch("http://localhost:3000/quotes", {
      headers: {
        "Content-Type": "application/json",
        token: sessionStorage.getItem("token"),
      },
      method: "POST",
      body: JSON.stringify({
        num: inputNum,
      }),
    })
      .then((response) => response.json())
      .then((data) => setListQuotes([...data, ...listQuotes]))
      .catch(() => {
        alert("Cannot connect to server");
      });
  }

  const itemsPerPage = 4;
  let startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedItems = listQuotes.slice(startIndex, endIndex);

  return (
    <div className="list-quotes" style={{ textAlign: "center" }}>
      <Title>
        {t("content.quote.title")}({listQuotes.length})
      </Title>
      <Space direction="vertical" size={16}>
        <Button type="primary" onClick={getQuote}>
          Add one Quote
        </Button>
        <Space>
          <InputNumber value={inputNum} onChange={getInputNum}></InputNumber>
          <Button type="primary" onClick={getMultiQuote}>
            Add multi Quote
          </Button>
        </Space>
        {paginatedItems.map((quote, index) => (
          <Card
            title={quote.author}
            style={{
              width: 500,
              border: "1px solid",
            }}
            key={index}
          >
            <p>{quote.quote}</p>
          </Card>
        ))}
        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          total={listQuotes.length}
          onChange={handlePageChange}
        ></Pagination>
      </Space>
    </div>
  );
}
export default Quote;
