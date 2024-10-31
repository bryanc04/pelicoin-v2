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
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
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

export default function Signup({ setLoginOpen, setSignupOpen }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  let navigate = useNavigate();

  const { state } = useLocation();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      navigate("/Home", { replace: true });
    }
  }, [user, loading]);

  useEffect(() => {
    AOS.init();
  }, []);

  const register = () => {
    if (username == "") {
      message.error("Please input a username");
      return;
    } else if (password == "") {
      message.error("Please input a password");
      return;
    } else if (name == "") {
      message.error("Please enter a name");
      return;
    } else if (password != password2) {
      message.error("Passwords do not match");
      return;
    }

    setIsLoading(true);
    //collection called users, dID doesnt matter, save email and name
    createUserWithEmailAndPassword(auth, username, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        setIsLoading(false);
        navigate("/Home", { replace: true });
        const docRef = await addDoc(collection(db, "Users"), {
          username: username,
          first_name: name,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode == "auth/invalid-email") {
          message.error("Invalid email format.");
          setIsLoading(false);
        } else if (errorCode == "auth/email-already-in-use") {
          message.error("Account already exists.");
          setIsLoading(false);
        } else if (errorCode == "auth/weak-password") {
          message.error("Password is too weak.");
          setIsLoading(false);
        }
      });
  };

  const enterPress = (el) => {
    if (el.keyCode === 13) {
      register();
    }
  };

  return (
    <div className={s.login_container}>
      <AnimatedCursor />

      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
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
              height: "80%",
            }}
          >
            <div style={{ fontSize: "30px", fontWeight: "bold" }}>Join Us!</div>
            <div>
              <div className="form-group" style={{ marginTop: 20 }}>
                <label for="inputUsername">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputUsername"
                  aria-describedby="usernameHelp"
                  placeholder="ex: John"
                  onChange={(event) => setName(event.target.value)}
                  onKeyDown={(el) => enterPress(el)}
                />
                <small id="usernameHelp" className="form-text text-muted">
                  Enter your name
                </small>
              </div>
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
              <div className="form-group" style={{ marginTop: 20 }}>
                <label for="inputPassword">Confirm password</label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  aria-describedby="passwordHelp"
                  placeholder="Enter your password again"
                  onChange={(event) => setPassword2(event.target.value)}
                  onKeyDown={(el) => enterPress(el)}
                />
                <small id="usernameHelp" className="form-text text-muted">
                  Enter your new password again
                </small>
              </div>
              <button
                type="submit"
                onClick={() => {
                  register();
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
                  "Sign up"
                )}
              </button>
              <div
                style={{
                  textAlign: "center",
                }}
              >
                Already have an account?{" "}
                <span
                  style={{ fontWeight: "bold", cursor: "pointer" }}
                  onClick={() => {
                    setSignupOpen(false);
                    setLoginOpen(true);
                  }}
                >
                  Login
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
