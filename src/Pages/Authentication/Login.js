import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";

import { Link, Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import React, { useState } from "react";

import { login, setInstituteId } from "../../utils";
import { isLogged, userEmail, UserDetails } from "../../States";
import { useRecoilState } from "recoil";

const Login = (props) => {
  const [isLogin, setIsLogged] = useRecoilState(isLogged);
  const [userDetails, setUserDetails] = useRecoilState(UserDetails);
  const [user_email, setEmail] = useRecoilState(userEmail);
  const [password, setPassword] = useState("");

  const useStyles = makeStyles((theme) => ({
    loginContainer: {
      display: "flex",
      flexFlow: "column",
      alignItems: "center",
      justifyContent: "center",
    },

    root: {
      "& > *": {
        margin: theme.spacing(2),
        flexDirection: "column",
        display: "flex",
        padding: "20px",
        width: "25vw",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  }));

  function validateForm() {
    return user_email.length > 0 && password.length > 0;
  }

  const loginHandler = async (event) => {
    try {
      event.preventDefault();
      let item = { user_email, password };
      const response = await fetch(
        "http://35.244.8.93:4000/api/users/auth/login",
        {
          method: "POST",
          body: JSON.stringify(item),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const loginCredentials = await response.json();
      login(loginCredentials.token);
      console.log(loginCredentials);
      setInstituteId(loginCredentials.details.user_inst_id);
      setUserDetails(loginCredentials.details);
      setIsLogged(true);

      props.history.push("/courses");
    } catch (error) {
      console.table("Login.js" + error);
      <Redirect to="/register" />;
      alert("Resister yourself first");
    }
  };

  const classes = useStyles();
  return (
    <div className={classes.loginContainer}>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <Card className={classes.root}>
        <TextField
          id="standard-basic"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="standard-basic"
          label="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={loginHandler} type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Card>

      <span>
        Not yet Resistered? <Link to="/register">Register Now</Link>
      </span>
    </div>
  );
};

export default withRouter(Login);
