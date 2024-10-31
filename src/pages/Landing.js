import React, { useState, useContext, useEffect } from "react";
import AnimatedCursor from "react-animated-cursor";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Wave from "react-wavify";
import ReactiveButton from "reactive-button";
import Box from "@mui/material/Box";
import Login from "./Login";
import Signup from "./Signup";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  getDoc,
  doc,
  documentId,
  setDoc,
} from "firebase/firestore";
import "../index.scss";
import ChromeDinoGame from "react-chrome-dino";
import { ChromePicker } from "react-color";
import { encryptstorage } from "../components/encrypt.js";
import axios from "axios";
import { message, Space } from "antd";
import "antd/dist/antd.css";
import dayjs from "dayjs";
import Highlighter from "react-highlight-words";
import ThemePop from "../components/popup2.js";
import { Route, Routes } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navbar2 } from "../components/navbar/navbar2.js";
import { Navbar3 } from "../components/navbar/navbar3.js";
import { useLocation, useNavigate } from "react-router-dom";
import logo2 from "../assets/logo2.png";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AbcdHome() {
  let navigate = useNavigate();

  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  return (
    <>
      <AnimatedCursor
        innerSize={8}
        outerSize={35}
        innerScale={1}
        outerScale={2}
        outerAlpha={0}
        hasBlendMode={true}
        innerStyle={{
          backgroundColor: "var(--cursor-color)",
        }}
        outerStyle={{
          border: "3px solid brown",
        }}
      />

      <div
        className="all"
        style={{
          backgroundColor: "#F5E8C7",
          width: "100vw",
          height: "100vh",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <img
          className="lc_logo"
          src={logo2}
          style={{
            width: 80,
            height: 80,
            position: "absolute",
            top: 20,
            left: 20,
          }}
        />
        <Modal
          open={loginOpen}
          onClose={() => setLoginOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {/* <Box sx={style}> */}
          <Login setLoginOpen={setLoginOpen} setSignupOpen={setSignupOpen} />
          {/* </Box> */}
        </Modal>
        <Modal
          open={signupOpen}
          onClose={() => setSignupOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {/* <Box sx={style}> */}
          <Signup setLoginOpen={setLoginOpen} setSignupOpen={setSignupOpen} />
          {/* </Box> */}
        </Modal>
        <div
          style={{
            width: "100vw",
            height: "80%",
            alignItems: "center",
            display: "grid",
          }}
        >
          <div style={{ width: "100vw" }}>
            <div
              style={{
                fontWeight: 700,
                fontSize: "60px",
                color: "black",
                fontFamily: "DM Sans",
                width: "fit-content",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              pelicoin banking,
            </div>
            <div
              style={{
                fontWeight: 700,
                fontSize: "60px",
                color: "black",
                fontFamily: "DM Sans",
                width: "fit-content",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              made easy
            </div>
            <div style={{ width: "100vw" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto auto",
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "fit-content",
                }}
              >
                <div>
                  <ReactiveButton
                    idleText={"Sign Up"}
                    style={{
                      border: "2px solid #9E7777",
                      color: "black",
                      fontFamily: "DM Sans",
                      backgroundColor: "#9E7777",
                      marginRight: 10,
                    }}
                    size={"large"}
                    rounded
                    outline
                    onClick={() => setSignupOpen(true)}
                  />
                </div>
                {/* Sigma Skibidi */}
                <div>
                  <ReactiveButton
                    idleText={"Log In"}
                    style={{
                      backgroundColor: "#9E7777",
                      color: "white",
                      fontFamily: "DM Sans",
                      marginLeft: 10,
                    }}
                    rounded
                    size={"large"}
                    onClick={() => setLoginOpen(true)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Wave
          fill="#9E7777"
          paused={false}
          style={{
            display: "flex",
            position: "absolute",
            bottom: "0",
            height: "35%",
          }}
          options={{
            height: 70,
            amplitude: 40,
            speed: 0.25,
            points: 4,
          }}
        />
      </div>
    </>
  );
}
