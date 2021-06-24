import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField } from "@material-ui/core";
import { Card } from "@material-ui/core";

import { withRouter, Link } from "react-router-dom";
import { useState } from "react";

const Register = (props) => {
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
        width: "30vw",

        display: "flex",
        flexDirection: "column",

        padding: "15px",
      },
      padding: "20px",
    },
  }));

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [insta_id, setInsta_id] = useState();
  const classes = useStyles();

  const loginHandler = async (event) => {
    try {
      event.preventDefault();
      let item = { name, email, password, city, insta_id };
      const postRegisterCredentials = await fetch(
        "http://35.244.8.93:4000/api/users/auth/register",
        {
          method: "POST",
          body: JSON.stringify(item),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const registerResponse = postRegisterCredentials.json();
      console.log(registerResponse);
      props.history.push("/login");
    } catch (error) {
      console.log("Register.js" + error);
    }
  };

  return (
    <div className={classes.loginContainer}>
      <span>
        Already registered?<Link to="/login">Login</Link>
      </span>
      <h2>I don't have an account</h2>
      <span>Sign up with your Institute ID</span>
      <Card className={classes.root}>
        <TextField
          id="standard-basic"
          label="Name"
          onChange={(e) => setName(e.target.value)}
        />
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
        <TextField
          id="standard-basic"
          label="City"
          onChange={(e) => setCity(e.target.value)}
        />
        <TextField
          id="standard-basic"
          label="Institute ID"
          type="number"
          onChange={(e) => setInsta_id(e.target.value)}
        />
        <Button onClick={loginHandler}>SignUp</Button>
      </Card>
    </div>
  );
};
export default withRouter(Register);
