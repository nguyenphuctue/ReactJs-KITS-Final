import { SearchOutlined } from "@ant-design/icons";
import { Card, Form, Input, Space, Typography } from "antd";
const { Title } = Typography;
import { useState } from "react";

// eslint-disable-next-line react/prop-types
function HelloWorld({t}) {
  const [inputValue, setInputValue] = useState("");

  function getValue(e) {
    setInputValue(e.target.value);
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url(" + "/img/hello.jpg" + ")",
        backgroundSize: "100% 100%",
      }}
    >
      <div>
        <Title style={{ textAlign: "center", color: "#29465B" }}>
          {t("content.hello-world.title")}
        </Title>
        <Form
          labelCol={{
            span: 0,
          }}
          wrapperCol={{
            span: 24,
          }}
        >
          <Form.Item>
            <Input
              prefix={<SearchOutlined />}
              placeholder="Input here"
              onChange={getValue}
              style={{
                borderRadius: "50px"
              }}
            />
          </Form.Item>
        </Form>
        <div
          style={{
            textAlign: "center",
          }}
        >
          <Space direction="vertical">
            <Card
              title="Output Value"
              style={{
                width: "400px",
                border: "1px solid"
              }}
            >
              {inputValue}
            </Card>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default HelloWorld;
