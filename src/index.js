import ReactDOM from "react-dom";

import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";


const rootElement = document.getElementById("root");
const loggedIn = window.localStorage.getItem("isLoggedIn")
ReactDOM.render(

<BrowserRouter >
      <Switch>
        <Route exact path="/" component={loggedIn? Dashboard : Login} />
        {/* {loggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />} */}
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />

      </Switch>
    </BrowserRouter>
  

  ,
  rootElement
);
