import React, { useState, useEffect } from "react";

import { TextField } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  iconSmall: {
    fontSize: 20
  },
  input: {
    marginBottom: theme.spacing(2)
  },
  form: {
    padding: 10,
    borderRadius: 3,
    width: 250,
    backgroundColor: "rgb(26,30,38)"
  },
  invalid: {
    color: "red",
    fontSize: "12px"
  },
  valid: {
    color: "green",
    fontSize: "12px"
  }
}));

function Login(props) {
  const classes = useStyles();
  console.log(props.loggedIn);
  let loggedIn = props.loggedIn;
  const [user, setUser] = useState("");
  const [status, setStatus] = useState(loggedIn);
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    setStatus(loggedIn);
    console.log("useEffect");
  }, [setStatus, loggedIn]);

  console.log(loggedIn);
  let handleSubmit = async event => {
    event.preventDefault();
    console.log(event.target);
    let formData = new FormData(event.target);
    [...formData.values()].forEach(value => {
      console.log(value);
    });
    localStorage.removeItem("token");

    try {
      const res = await fetch("/users/login", {
        method: "POST",
        body: formData
      });
      if (res.status === 200) {
        const token = await res.json();
        console.log(token);
        localStorage.setItem("token", token.token);
        setUser("Logged In");
        setStatus(true);
        props.isAuth(true);
      } else {
        setUser("Invalid Username/Password");
        setStatus(false);
        props.isAuth(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          name="username"
          label="Username"
          className={classes.input}
          fullWidth={true}
        >
          {" "}
        </TextField>
        <TextField
          name="password"
          label="Password"
          className={classes.input}
          fullWidth={true}
        >
          {" "}
        </TextField>
        <Button variant="contained" type="submit" className={classes.button}>
          Log In
        </Button>
        <span className={status ? classes.valid : classes.invalid}>
          {status ? "Logged In" : user}
        </span>
      </form>
    </ThemeProvider>
  );
}

export default Login;
