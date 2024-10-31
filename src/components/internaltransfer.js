import React, { useState, useContext, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import transfer from "../functions/transfer";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TextField from "@mui/material/TextField";

export default function Internaltransfer({
  internalTransferModalOpen,
  setInternalTransferModalOpen,
  curUser,
}) {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [amount, setAmount] = useState(null);
  console.log(curUser);

  return (
    <div>
      {/* <AnimatedCursor /> */}
      <Modal
        show={internalTransferModalOpen}
        onHide={() => setInternalTransferModalOpen(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size={{ width: "100vw" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Transfer your own balance</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{}}>
          Select Options:
          <div style={{ display: "flex" }}>
            <FormControl sx={{ m: 1, minWidth: 120 }} style={{ width: 200 }}>
              <InputLabel id="demo-simple-select-helper-label">From</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={from}
                label="From"
                onChange={(e) => setFrom(e.target.value)}
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                <MenuItem value={"Cash"}>Cash</MenuItem>
                <MenuItem value={"Current Stocks"}>Stocks</MenuItem>
                <MenuItem value={"Current Bonds"}>Bonds</MenuItem>
              </Select>
              <FormHelperText>Source of pelicoin</FormHelperText>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }} style={{ width: 200 }}>
              <InputLabel id="demo-simple-select-helper-label">To</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={to}
                label="To"
                onChange={(e) => setTo(e.target.value)}
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                <MenuItem value={"Cash"}>Cash</MenuItem>
                <MenuItem value={"Current Stocks"}>Stocks</MenuItem>
                <MenuItem value={"Current Bonds"}>Bonds</MenuItem>
                <MenuItem value={"Bonds +1"}>Bonds +1</MenuItem>
                <MenuItem value={"Stocks +1"}>Stocks +1</MenuItem>
                <MenuItem value={"Bonds +2"}>Bonds +2</MenuItem>
                <MenuItem value={"Stocks +2"}>Stocks +2</MenuItem>
                <MenuItem value={"Bonds +3"}>Bonds +3</MenuItem>
                <MenuItem value={"Bonds +3"}>Stocks +3</MenuItem>
              </Select>
              <FormHelperText>Destination of Pelicoin</FormHelperText>
            </FormControl>
            <Box style={{ paddingLeft: "20px" }}>
              <TextField
                id="input-with-sx"
                label="Amount of Pelicoin"
                variant="standard"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
            </Box>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setInternalTransferModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              console.log(amount);
              transfer(
                curUser["Student"],
                curUser["Student"],
                amount,
                from,
                to
              );
              setInternalTransferModalOpen(false);
            }}
          >
            Make Transfer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
