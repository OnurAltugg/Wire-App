import React from "react";
import "./Register.css";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";

import { NavLink, useNavigate } from "react-router-dom";
import wireLogoYellow from "../../../assets/logos/wireLogoYellow.svg";

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const navigate = useNavigate();

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password, name, country, phoneNumber)
    .then((useCredential) => {
      console.log(useCredential);
      navigate('/');
    }).catch((error) => {
      console.log(error);
    })
  }
  return (
    <div className="registerPage">
      <div className="loginBox">
        <div className="loginBoxDesc">
          <NavLink to="/">
            {" "}
            <img src={wireLogoYellow} alt="Wire" className="MainLogo" />
          </NavLink>

          <h1>Create an account</h1>
          <p className="loginInstructions">lorem ipsum dolor sit amet</p>
        </div>

        <div className="loginBoxForm">
          <form className="loginForm" onSubmit={signUp}>
            <div className="registerFormRow">
              <div className="formElement">
                <label>Name</label>
                <input
                  className="loginTextInput"
                  type="text"
                  placeholder="Your name and surname"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>
              <div className="formElement">
                <label>Country</label>
                <select name="Country" 
                id="country" 
                className="registerSelect" 
                value={country}
                onChange={(e) => setCountry(e.target.value)}>
                  <option value="Turkey">Turkey</option>
                  <option value="Greece">Greece</option>
                  <option value="Azerbaijan">Azerbaijan</option>
                  <option value="Germany">Germany</option>
                  <option value="Italy">Italy</option>
                  <option value="France">France</option>
                  <option value="Bulgaria">Bulgaria</option>
                  <option value="Spain">Spain</option>
                </select>
              </div>
            </div>

            <div className="registerFormRow">
              <div className="formElement">
                <label>Email</label>
                <input
                  className="loginTextInput"
                  type="email"
                  placeholder="user@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>
              <div className="formElement">
                <label>Phone Number</label>
                <input
                  className="loginTextInput"
                  type="text"
                  placeholder="+90 555 123 4567"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                ></input>
              </div>
            </div>

            <div className="registerFormRow">
              <div className="formElement">
                <label>Password</label>
                <input
                  className="loginTextInput"
                  type="password"
                  placeholder="********"
                ></input>
              </div>
              <div className="formElement">
                <label>Confirm Password</label>
                <input
                  className="loginTextInput"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
            </div>

            <button className="loginSubmitButton" type="submit">Register</button>
          </form>
        </div>
        <div className="loginToRegister">
          Already have an account?{" "}
          <NavLink className="loginToRegisterLink" to="/login">
            Login Here
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Register;
