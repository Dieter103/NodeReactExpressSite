import Login from "./components/Login.js";
import Dashboard from "./components/Dashboard.js";
import React, { useState, useEffect } from "react";

import "./App.css";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

const App = props => {
  const [state, setState] = useState({
    apiResponse: "",
    id: 1,
    user: "",
    loggedIn: false
  });
  useEffect(() => {
    callAPI();
    console.log("loaind");
  }, [state.loggedIn]);

  const callAPI = async () => {
    console.log("calling!!!");
    let token = "";
    fetch("/users/validate", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "text/plain",
        Authorization: "Bearer " + token
      }
    })
      .then(res => res.json())
      .then(json => {
        let response = json;
        // if (res.status === 200) {
        //   let response = res.json();
        setState({ ...state, loggedIn: true, user: response.username });
        console.log(response);
        // }
      })
      .catch((err, res) => {
        console.log(res);
        console.error(err);
      });
  };

  const isAuth = isAuth => {
    isAuth
      ? setState({ ...state, user: "Dieter", loggedIn: true })
      : setState({ ...state, loggedIn: false });
  };

  const setPage = () => {
    let component = "";
    //TODO: fix the user db
    if (!state.loggedIn) {
      component = (
        <ThemeProvider theme={theme}>
          <Dashboard isAuth={isAuth} />
        </ThemeProvider>
      );
    } else {
      component = (
        <header className="App-header">
          <Login loggedIn={state.loggedIn} isAuth={isAuth} />
          <div>{state.user}</div>
        </header>
      );
    }
    return component;
  };

  return setPage();
};

export default App;
