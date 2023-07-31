import React from "react";
import "./Login.css";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";

import { NavLink, useNavigate } from "react-router-dom";
import wireLogoYellow from "../../../assets/logos/wireLogoYellow.svg";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((useCredential) => {
      console.log(useCredential);
      navigate('/');
    }).catch((error) => {
      console.log(error);
    })
  }

  return (
    <div className="loginPage">
      <div className="loginBox">
        <div className="loginBoxDesc">
          <NavLink to="/">
            {" "}
            <img src={wireLogoYellow} alt="Wire" className="MainLogo" />
          </NavLink>

          <h1>Login to your account</h1>
          <p className="loginInstructions">lorem ipsum dolor sit amet</p>
        </div>

        <div className="loginBoxForm">
          <form className="loginForm" onSubmit={signIn}>
            <label>Email</label>
            <input
              className="loginTextInput"
              type="email"
              placeholder="user@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <label>Password</label>
            <input
              className="loginTextInput"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <div className="formDetails">
              <div>
                <input
                  className="customCheckBox"
                  type="checkbox"
                  id="remember"
                ></input>
                <label className="checkBoxLabel" for="remember">
                  Remember me.
                </label>
              </div>
              <div className="loginToRegister">
                <NavLink className="loginToRegisterLink" to="/register">
                  Forgot password?
                </NavLink>
              </div>
            </div>
            <button className="loginSubmitButton" type="submit">
                Login
            </button>
          </form>
        </div>
        <div className="loginToRegister">
          Don't have an account?{" "}
          <NavLink className="loginToRegisterLink" to="/register">
            Register Here
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Login;
