import "./container.css";
import {baseUrl} from '../../App';
import { useState } from "react";
import {
  ReadOutlined,
  TableOutlined,
  CalculatorOutlined,
  ClockCircleOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BellOutlined,
  SearchOutlined,
  ChromeOutlined,
  MailOutlined,
  CarryOutOutlined,
  LogoutOutlined,
  UserOutlined,
  SettingOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import {
  Switch as RouteSwitch,
  Route,
  Link,
  useRouteMatch,
  useLocation,
  useHistory,
} from "react-router-dom";
import {
  Layout,
  Menu,
  Button,
  theme,
  Image,
  Avatar,
  Input,
  Space,
  ConfigProvider,
  Switch,
  Badge,
  Typography,
  Dropdown,
} from "antd";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import HelloWorld from "../HelloWorld/HelloWorld";
import Calculator from "../Calculator/Calculator";
import ChessBoard from "../ChessBoard/ChessBoard";
import PomodoroClock from "../PomodoroClock/PomodoroClock";
import Quote from "../Quote/Quote";
import Todolist from "../Todolist/Todolist";

const { Title } = Typography;
const { Header, Content, Sider, Footer } = Layout;

// eslint-disable-next-line react/prop-types
function Container() {
  const history = useHistory();
  const location = useLocation();
  const selectedKey = location.pathname;
  let { path, url } = useRouteMatch();
  const { t } = useTranslation("translation");
  // let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  let currentUser = { username: "tuenp", full_name: "Nguyễn Phúc Tuệ" };

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const itemsMenu = [
    getItem(
      <Link to={`${url}`}>{t("sider.menu.hello-world")}</Link>,
      `${url}`,
      <ChromeOutlined />
    ),
    getItem(
      <Link to={`${url}/chessboard`}>{t("sider.menu.chess-board")}</Link>,
      `${url}/chessboard`,
      <TableOutlined />
    ),
    getItem(
      <Link to={`${url}/calculator`}>{t("sider.menu.calculator")}</Link>,
      `${url}/calculator`,
      <CalculatorOutlined />
    ),
    getItem(
      <Link to={`${url}/pomodoro`}>{t("sider.menu.pomodoro-clock")}</Link>,
      `${url}/pomodoro`,
      <ClockCircleOutlined />
    ),
    getItem(
      <Link to={`${url}/quote`}>{t("sider.menu.quote")}</Link>,
      `${url}/quote`,
      <ReadOutlined />
    ),
    getItem(
      <Link to={`${url}/todolist`}>{t("sider.menu.todolist")}</Link>,
      `${url}/todolist`,
      <ProfileOutlined />
    ),
  ];

  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  function changeLocaleToVn() {
    i18n.changeLanguage("vie");
  }
  function changeLocaleToEn() {
    i18n.changeLanguage("eng");
  }

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const itemsDropdown = [
    {
      key: "info",
      type: "group",
      label: "Profile",
      children: [
        {
          key: "name",
          label: currentUser.full_name,
        },
      ],
    },
    {
      key: "account",
      type: "group",
      label: "Account",
      children: [
        {
          key: "message",
          label: "Messages",
          icon: <MailOutlined />,
        },
        {
          key: "task",
          label: "Tasks",
          icon: <CarryOutOutlined />,
        },
        {
          key: "logout",
          label: <span onClick={logout}>Logout</span>,
          icon: <LogoutOutlined />,
        },
      ],
    },
    {
      key: "settings",
      type: "group",
      label: "Settings",
      children: [
        {
          key: "profile",
          label: "Profile",
          icon: <UserOutlined />,
        },
        {
          key: "setting",
          label: "Setting",
          icon: <SettingOutlined />,
        },
      ],
    },
  ];

  function logout() {
    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("token");
    history.push("/login");
  }

  return (
    <>
      <ConfigProvider theme="dark">
        <Layout style={{ minHeight: "100vh" }}>
          <Sider collapsed={collapsed}>
            {!collapsed ? (
              <Header
                className="sider-header"
                style={!darkMode ? { background: colorBgContainer } : {}}
              >
                <Space>
                  <Image src={`${baseUrl}react.svg`} />
                  <Title
                    className="app-name"
                    level={5}
                    style={darkMode ? { color: "white" } : {}}
                  >
                    Nguyễn Phúc Tuệ
                  </Title>
                </Space>
              </Header>
            ) : (
              <Header
                className="sider-header"
                style={!darkMode ? { background: colorBgContainer } : {}}
              >
                <Image src={`${baseUrl}react.svg`} />
              </Header>
            )}

            <Menu
              theme={darkMode ? "dark" : "light"}
              style={{ height: "100%" }}
              defaultSelectedKeys={["hello-world"]}
              selectedKeys={selectedKey}
              items={itemsMenu}
              // mode="inline"
            ></Menu>
          </Sider>
          <Layout>
            <Header
              style={{
                padding: "0",
                background: colorBgContainer,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
              <Input
                prefix={<SearchOutlined />}
                placeholder={t("header.search.placeholder")}
                style={{
                  marginRight: "1%",
                  borderRadius: "50px",
                }}
              />
              <Space size="middle" style={{ marginRight: "2%" }}>
                <Switch checked={darkMode} onChange={toggleDarkMode} />

                <Avatar
                  size={25}
                  src={`${baseUrl}img/flag/flag_vietnam.png`}
                  onClick={changeLocaleToVn}
                />
                <Avatar
                  size={25}
                  src={`${baseUrl}img/flag/flag_usa.png`}
                  onClick={changeLocaleToEn}
                />

                <Badge count={5}>
                  <BellOutlined style={{ fontSize: "20px" }} />
                </Badge>
                <Dropdown
                  menu={{
                    items: itemsDropdown,
                  }}
                  trigger={["click"]}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Avatar
                      style={{
                        backgroundColor: "#fde3cf",
                        color: "#f56a00",
                      }}
                    >
                      {currentUser.full_name[0]}
                    </Avatar>
                  </a>
                </Dropdown>
              </Space>
            </Header>
            <Content>
              <RouteSwitch>
                <Route exact path={path}>
                  <HelloWorld t={t} />
                </Route>
                <Route path={`${path}/calculator`}>
                  <Calculator />
                </Route>
                <Route path={`${path}/chessboard`}>
                  <ChessBoard t={t} />
                </Route>
                <Route path={`${path}/pomodoro`}>
                  <PomodoroClock />
                </Route>
                <Route path={`${path}/quote`}>
                  <Quote t={t} />
                </Route>
                <Route path={`${path}/todolist`}>
                  <Todolist t={t} />
                </Route>
              </RouteSwitch>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Ant Design ©2023 Created by NPT
            </Footer>
          </Layout>
        </Layout>
      </ConfigProvider>
    </>
  );
}

export default Container;
