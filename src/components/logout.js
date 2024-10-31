import React, { useState, createContext, useContext, useMemo } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { EncryptStorage } from "encrypt-storage";
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

const encryptstorage = new EncryptStorage("asdffdsafdasfdasasdf", {
  prefix: "@instance",
  storageType: "sessionStorage",
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function Logout(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        navigate("/", { replace: true, state: props.to });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let navigate = useNavigate();
  return (
    <>
      {props.showEmoji ? (
        <div
          className="grid-item"
          style={{ cursor: "pointer", alignItems: "center" }}
          onClick={handleOpen}
        >
          <i
            className="bi bi-box-arrow-left navbar_item"
            style={{ height: "fit-content" }}
          ></i>
          <div>Logout</div>
        </div>
      ) : (
        <a className="nav-link" onClick={handleOpen}>
          Logout
        </a>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 500 }}>
          <h2 id="parent-modal-title">Logout of Pelicoin.cash?</h2>
          <p id="parent-modal-description" style={{ marginBottom: 20 }}>
            You can always log back in at any time.
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "70%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Button
              variant="contained"
              style={{
                marginBottom: 20,
              }}
              onClick={() => {
                logout();
              }}
            >
              Log Out
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
