import React, { useState, createContext, useContext, useMemo } from "react";
import Loomis from "../../assets/loomis.png";
import { NavLink, useNavigate } from "react-router-dom";
import { EncryptStorage } from "encrypt-storage";
import loomis2 from "../../assets/loomis2.png";
import { initializeApp } from "firebase/app";
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
  increment,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import logo2 from "../../assets/logo2.png";
import Logout from "../logout";
import { useMediaQuery } from "react-responsive";

const encryptstorage = new EncryptStorage("asdffdsafdasfdasasdf", {
  prefix: "@instance",
  storageType: "sessionStorage",
});

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

export function Navbar(props) {
  const [isShown, setIsShown] = useState(false);

  const screenWidth = window.innerWidth;
  const IsMobile = useMediaQuery({ query: "(min-width: 1000px)" });

  const handleClick = (event) => {
    setIsShown((current) => !current);
  };
  let navigate = useNavigate();

  const logout = () => {
    encryptstorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <>
      {IsMobile ? (
        <div
          className="navbar_style"
          id="navbar_bg"
          style={{ backgroundColor: props.theme }}
        >
          <div
            style={{
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "auto auto",
                width: "100%",
              }}
            >
              <div>
                <img
                  className="lc_logo"
                  src={logo2}
                  style={{ width: 30, height: 30 }}
                />
              </div>
              <div
                style={{
                  fontSize: 15,
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "bold",
                  marginLeft: 10,
                }}
              >
                Pelicoin.cash
              </div>
            </div>
          </div>
          <div className="navbar3_content" style={{ height: "10%" }}>
            <NavLink to="/Admin" className="navbar_item_container">
              <div className="grid-item">
                <i
                  className="bi bi-file-bar-graph navbar_item"
                  style={{ fontSize: "19px" }}
                ></i>
                {"Data" == props.currentPage ? (
                  <div style={{ fontWeight: "bold" }}>Data</div>
                ) : (
                  <div>Data</div>
                )}
              </div>
            </NavLink>
            <NavLink to="/Admin" className="navbar_item_container">
              <div className="grid-item">
                <i
                  className="bi bi-bank navbar_item"
                  style={{ fontSize: "19px" }}
                ></i>
                {"Transfer" == props.currentPage ? (
                  <div style={{ fontWeight: "bold" }}>Transfer</div>
                ) : (
                  <div>Transfer</div>
                )}
              </div>
            </NavLink>
            {/* <NavLink
              to="/Calendar"
              className="navbar_item_container"
              onClick={() => update("calendar")}
            >
              <div className="grid-item">
                <i className="bi bi-calendar navbar_item"></i>
                {"Calendar" == props.currentPage ? (
                  <div style={{ fontWeight: "bold" }}>Calendar</div>
                ) : (
                  <div>Calendar</div>
                )}
              </div>
            </NavLink>
            <NavLink
              to="/Menu"
              className="navbar_item_container"
              onClick={() => update("menu")}
            >
              <div className="grid-item">
                <i className="bi bi-table navbar_item"></i>
                {"Menu" == props.currentPage ? (
                  <div style={{ fontWeight: "bold" }}>Menu</div>
                ) : (
                  <div>Menu</div>
                )}
              </div>
            </NavLink>
            <NavLink
              to="/Schedule"
              className="navbar_item_container"
              onClick={() => update("schedule")}
            >
              <div className="grid-item">
                <i className="bi bi-dribbble navbar_item"></i>
                {"Schedule" == props.currentPage ? (
                  <div style={{ fontWeight: "bold" }}>Schedule</div>
                ) : (
                  <div>Schedule</div>
                )}
              </div>
            </NavLink> */}
          </div>
          <div style={{ marginLeft: "10px" }}>
            <Logout showEmoji={true} />
          </div>
        </div>
      ) : (
        <nav
          className="navbar navbar-expand-lg navbar-light bg-light"
          style={{ zIndex: 300000 }}
        >
          <div className="container-fluid" style={{ paddingLeft: "50px" }}>
            <a className="navbar-brand" href="#">
              Pelicoin
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink
                    to="/Home"
                    className="nav-link"
                    onClick={() => update("home")}
                  >
                    Home
                  </NavLink>
                </li>
                {/* <li className="nav-item">
                  <NavLink
                    to="/Calendar"
                    className="nav-link"
                    onClick={() => update("calendar")}
                  >
                    Calendar
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/Menu"
                    className="nav-link"
                    onClick={() => update("menu")}
                  >
                    Menu
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/Schedule"
                    className="nav-link"
                    onClick={() => update("schedule")}
                  >
                    Schedule
                  </NavLink>
                </li>
                <li className="nav-item">
                  <Logout showEmoji={false} />
                </li> */}
              </ul>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
