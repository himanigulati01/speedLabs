import React, { useState } from "react";

import { withRouter } from "react-router";
import { setInstituteId } from "../../utils/index";
import { login } from "../../utils";
import { isLogged, userEmail, UserDetails } from "../../States";
import { useRecoilState } from "recoil";
import MessageBox from "../../MessageBox";

function SignIn(props) {
  const [, setIsLogged] = useRecoilState(isLogged);
  const [, setUserDetails] = useRecoilState(UserDetails);
  const [user_email, setEmail] = useRecoilState(userEmail);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");

  // function validateForm() {
  //   return user_email.length > 0 && password.length > 0;
  // }

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
      console.log(loginCredentials.msg);
      console.log(loginCredentials.flag === 2);
      if (loginCredentials.flag === 2) setError(loginCredentials.msg);
      if (loginCredentials.flag === 1) {
        login(loginCredentials.token);

        setInstituteId(loginCredentials.details.user_inst_id);
        setUserDetails(loginCredentials.details);
        setIsLogged(true);
        props.history.push(`/${loginCredentials.details.user_inst_id}`);
        window.location.reload();
        console.log(loginCredentials.details.user_inst_id);
      }
    } catch (error) {
      console.log("Login.js" + error);
    }
  };

  return (
    <>
      <header
        class="heading-banner text-white bgCover"
        style={{ backgroundImage: "url(http://placehold.it/1920x181)" }}
      >
        <div class="container holder">
          <div class="align">
            <h1>My Account</h1>
          </div>
        </div>
      </header>
      {/* <!-- breadcrumb nav --> */}
      <nav class="breadcrumb-nav">
        <div class="container">
          {/* <!-- breadcrumb --> */}
          <ol class="breadcrumb">
            <li>
              <a href="home.html">Home</a>
            </li>
            <li class="active">My Account</li>
          </ol>
        </div>
      </nav>
      {error && <MessageBox variant="danger">{error}</MessageBox>}
      <section class="container user-log-block">
        <div class="row">
          <div class="col-xs-12 col-md-6" style={{ margin: "0 266px" }}>
            {/* <!-- user log form --> */}
            <form action="#" class="user-log-form" onSubmit={loginHandler}>
              <h2>Login Form</h2>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control element-block"
                  placeholder="Username or email address *"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div class="form-group">
                <input
                  type="password"
                  class="form-control element-block"
                  placeholder="Password *"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div class="btns-wrap">
                <div class="wrap">
                  <label
                    for="rem2"
                    class="custom-check-wrap fw-normal font-lato"
                  >
                    <input type="checkbox" id="rem2" class="customFormReset" />
                    <span class="fake-label element-block">Remember me</span>
                  </label>
                  <button
                    type="submit"
                    class="btn btn-theme btn-warning fw-bold font-lato text-uppercase"
                  >
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>{" "}
      </section>
    </>
  );
}

export default withRouter(SignIn);
