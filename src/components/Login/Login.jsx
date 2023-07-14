import { Button, Form, Input, Typography } from "antd";
import { useHistory } from "react-router-dom";
import "./login.css";

const { Title } = Typography;
const baseUrl = import.meta.env.BASE_URL;
// const default_user = [
//   {
//     username: "tuenp",
//     full_name: "Nguyễn Phúc Tuệ",
//     password: "1",
//   },
//   {
//     username: "hieuvd",
//     full_name: "Vương Duy Hiếu",
//     password: "1",
//   },
// ];
// eslint-disable-next-line react/prop-types
function Login() {
  const history = useHistory();
  const [form] = Form.useForm();

  // function doLogin() {
  //   let username = form.getFieldValue("username");
  //   let password = form.getFieldValue("password");
  //   let checkLogin = false;
  //   for (let i = 0; i < default_user.length; i++) {
  //     if (
  //       username === default_user[i].username &&
  //       password === default_user[i].password
  //     ) {
  //       checkLogin = true;
  //       let currentUser = {
  //         username: default_user[i].username,
  //         full_name: default_user[i].full_name,

  //       };
  //       sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
  //     }
  //   }
  //   if (checkLogin == true) {
  //     sessionStorage.setItem("isAuthenticated", "true");
  //     history.push("/home");
  //   } else {
  //     alert("Username or password is wrong !");
  //   }
  // }

  function doLogin() {
    let username = form.getFieldValue("username");
    let password = form.getFieldValue("password");

    fetch("http://localhost:3000/authenticate", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        sessionStorage.setItem("token", data["token"]);
        sessionStorage.setItem("isAuthenticated", "true");
        history.push(`${baseUrl}home`);
      })
      .catch(() => {
        alert("Cannot connect to server");
      });
  }

  return (
    <>
      <div className="form-login">
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
        >
          <Title style={{ textAlign: "center" }}>Login</Title>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" onClick={doLogin}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default Login;
