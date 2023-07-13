import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import Container from "./components/Container/Container";
import Login from "./components/Login/Login";
import "./App.css";


function App() {
  const history = useHistory();
  const location = useLocation();

  if (sessionStorage.getItem("isAuthenticated") === null) {
    sessionStorage.setItem("isAuthenticated", "false");
  }
  let isAuthenticated = sessionStorage.getItem("isAuthenticated");

  if (isAuthenticated === "false" && location.pathname != "/login") {
    history.push("/login");
  }

  if (isAuthenticated === "true" && location.pathname == "/") {
    history.push("/home");
  }

  return (
    <>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        {isAuthenticated ? (
          <>
            <Route path="/home">
              <Container />
            </Route>
            {/* <Route path="/register">
                <Container />
              </Route> */}
          </>
        ) : (
          ""
        )}
      </Switch>
    </>
  );
}

export default App;
