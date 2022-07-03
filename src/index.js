import { StrictMode } from "react";
import ReactDOM from "react-dom";

import {
  BrowserRouter,
  Route,
  useLocation, Switch, Router, Redirect
} from 'react-router-dom';

import App from "./App";
import FullCalendar from "./FullCalendar";
import TuiCalendar from "./TuiCalendar";
import ReactCalendar from "./ReactCalendar";
import ReactBigCalendar from "./ReactBigCalendar";
import Login from "./pages/Login";
import Register from "./pages/Register";

const rootElement = document.getElementById("root");
ReactDOM.render(

<BrowserRouter >
      <Switch>
        <Route exact path="/" component={ReactBigCalendar} />
        {/* {loggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />} */}

        <Route exact path="/1" component={TuiCalendar} />
        <Route exact path="/2" component={ReactCalendar} />
        <Route exact path="/3" component={FullCalendar} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />

      </Switch>
    </BrowserRouter>
  

  ,
  rootElement
);
