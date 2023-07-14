import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import Container from "./components/Container/Container";
import Login from "./components/Login/Login";
import "./App.css";

export const baseUrl = import.meta.env.BASE_URL;

function App() {
  const history = useHistory();
  const location = useLocation();

  if (sessionStorage.getItem("isAuthenticated") === null) {
    sessionStorage.setItem("isAuthenticated", "false");
  }
  let isAuthenticated = sessionStorage.getItem("isAuthenticated");

  if (isAuthenticated === "false" && location.pathname != baseUrl + "login") {
    history.push(baseUrl + "login");
  }

  if (isAuthenticated === "true") {
    if (location.pathname == baseUrl || location.pathname == "/") {
      history.push(baseUrl + "home");
    }
  }
  console.log(baseUrl + "home")

  return (
    <>
      <Switch>
        <Route path={`${baseUrl}login`}>
          <Login />
        </Route>
        {isAuthenticated ? (
          <>
            <Route path={`${baseUrl}home`}>
              <Container />
            </Route>
          </>
        ) : (
          ""
        )}
      </Switch>
    </>
  );
}

export default App;
