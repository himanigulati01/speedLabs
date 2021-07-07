import React, { useState } from "react";

import { withRouter } from "react-router";

import { getInstituteId, login, setInstituteId } from "../../utils";
import { isLogged, userEmail, UserDetails, inst_id } from "../../States";
import { useRecoilState } from "recoil";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn(props) {
  const classes = useStyles();
  const [, setIsLogged] = useRecoilState(isLogged);
  const [, setUserDetails] = useRecoilState(UserDetails);
  const [user_email, setEmail] = useRecoilState(userEmail);
  const [password, setPassword] = useState("");
  const [, setInstituteId] = useRecoilState(inst_id);

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
      props.history.push(`/${getInstituteId()}`);
    } catch (error) {
      console.log("Login.js" + error);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{ display: "flex", flexDirection: "row", padding: "50px" }}
    >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} onSubmit={loginHandler}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!validateForm()}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default withRouter(SignIn);
