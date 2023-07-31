import "./NavbarAuth.css";

import React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../../firebase";

function NavbarAuth() {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("user signed out.");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="navbarAuth">
      {authUser ? (
        <>
          <div className="navbarAuthUserInfo">
            {`${authUser.email}`}
            <button className="logoutButton" onClick={userSignOut}>
              Sign Out
            </button>
          </div>
        </>
      ) : (
        <>
          <NavLink to="/register" style={{ textDecoration: "none", color: "white" }}>
            <div className="register">Register</div>
          </NavLink>
          <NavLink to="/login" style={{ textDecoration: "none", color: "white" }}>
            <div className="login">Login</div>
          </NavLink>
        </>
      )}
    </div>
  );
}

export default NavbarAuth;
