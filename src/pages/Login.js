import React, { useState, useEffect } from "react";
import s from "./Login.module.css";
import Loomis from "../assets/loomis.png";
import Logo from "../assets/logo.png";
import Logo2 from "../assets/logo2.png";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { message, Space } from "antd";
import "antd/dist/antd.css";
import { encryptstorage } from "../components/encrypt";
import { initializeApp } from "firebase/app";
import AnimatedCursor from "react-animated-cursor";

import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import AOS from "aos";
import "aos/dist/aos.css";
import { useAuthState } from "react-firebase-hooks/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA-B5x48uBebjEHU75Na3EVRHMxQ893yDs",
  authDomain: "pelicoin-e331f.firebaseapp.com",
  databaseURL: "https://pelicoin-e331f-default-rtdb.firebaseio.com",
  projectId: "pelicoin-e331f",
  storageBucket: "pelicoin-e331f.appspot.com",
  messagingSenderId: "242170394132",
  appId: "1:242170394132:web:3c7c216bcebc1f6f525901",
  measurementId: "G-V9ZNH403FE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function Login({ setLoginOpen, setSignupOpen }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  let navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      console.log(username);
      console.log("fdafdafasd");
      navigate("/Home", { replace: true });
    }
  }, [user, loading]);

  const login = () => {
    setIsLoading(true);
    const auth = getAuth();

    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setIsLoading(false);
        console.log(username.toLowerCase() == "admin@gmail.com");
        if (
          username.toLowerCase() == "linda_fisher@loomis.org" ||
          username.toLowerCase() == "admin@gmail.com"
        ) {
          navigate("/Admin", { replace: true });
        } else {
          navigate("/Home", { replace: true });
        }
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        if (errorCode == "auth/invalid-email") {
          message.error("Invalid email format.");
          setIsLoading(false);
        } else if (errorCode == "auth/wrong-password") {
          message.error("Incorrect Password");
          setIsLoading(false);
        } else if (errorCode == "auth/user-not-found") {
          message.error("User does not exist, please sign up");
          setIsLoading(false);
        }
      });
  };

  const enterPress = (el) => {
    if (el.keyCode === 13) {
      login();
    }
  };

  return (
    <div className={s.login_container} style={{ alignItems: "center" }}>
      <AnimatedCursor />
      <div
        style={{
          width: "100%",
        }}
      >
        <div
          className={s.left_container}
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <div
            style={{
              padding: "0 20%",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              height: "80vh%",
            }}
          >
            <div style={{ display: "flex" }}>
              <div style={{ fontSize: "30px", fontWeight: "bold" }}>
                Welcome!
              </div>{" "}
            </div>
            <div>
              <div className="form-group" style={{ marginTop: 20 }}>
                <label for="inputUsername">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputUsername"
                  aria-describedby="usernameHelp"
                  placeholder="example@example.com"
                  onChange={(event) => setUsername(event.target.value)}
                  onKeyDown={(el) => enterPress(el)}
                />
                <small id="usernameHelp" className="form-text text-muted">
                  Enter your email
                </small>
              </div>
              <div className="form-group" style={{ marginTop: 20 }}>
                <label for="inputPassword">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  aria-describedby="passwordHelp"
                  placeholder="Enter your password"
                  onChange={(event) => setPassword(event.target.value)}
                  onKeyDown={(el) => enterPress(el)}
                />
                <small id="usernameHelp" className="form-text text-muted">
                  Enter your new password
                </small>
              </div>

              <button
                type="submit"
                onClick={() => {
                  login();
                }}
                className={`${s.login_button} btn btn-primary shadow-none`}
                style={{ width: "100%", marginTop: 20 }}
              >
                {isLoading ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  "Sign in"
                )}
              </button>
              <div
                style={{
                  textAlign: "center",
                }}
              >
                Don't have an account?{" "}
                <span
                  style={{ fontWeight: "bold", cursor: "pointer" }}
                  onClick={() => {
                    setLoginOpen(false);
                    setSignupOpen(true);
                  }}
                >
                  Sign Up
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
