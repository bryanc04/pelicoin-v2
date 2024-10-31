import React, { useState, useEffect } from "react";
import "../index.scss";
import "ka-table/style.css";
import { Column } from "ka-table/models";
import { DataType, Table, useTable } from "ka-table";
import { EditingMode, SortingMode } from "ka-table/enums";
import { kaPropsUtils } from "ka-table/utils";
import { openAllEditors } from "ka-table/actionCreators";
import { getDatabase, ref, child, get, set } from "firebase/database"; // Import set from firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navbar } from "../components/navbar/navbar.js";
import { Button, message } from "antd";

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

const columnHeaders = [
  "Full Name",
  "Grad Year",
  "Cash",
  "Current Bonds",
  "Current Stocks",
  "Bonds +1",
  "Stocks +1",
  "Bonds +2",
  "Stocks +2",
  "Bonds +3",
  "Stocks +3",
  "Loans",
  "Net Worth",
  "Wage Income",
  "Capital Gains on Current Stocks",
  "Interest Earned on Current Bonds",
  "Withdrawals from Tax Deferred Accounts",
  "Deposits to Tax Deferred Accounts",
  "Taxable Income",
  "Taxes",
  "Net Income",
  "Beginning Cash",
  "Add Net Income",
  "New Loans",
  "Grants Received",
  "Loan Payments",
  "Spending",
  "Fees and Penalties",
  "Ending Cash Balance",
];

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function Home() {
  const [themecolor, setthemecolor] = useState("#ffffff");
  const [user, loading, error] = useAuthState(auth);
  const [dataArray, setDataArray] = useState([]);
  const [columns, setColumns] = useState([]);
  const table = useTable({
    data: dataArray,
    onDispatch: (action, tableProps) => {
      setDataArray(tableProps.data); // Update dataArray when changes are made
    },
  });

  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, "/1Nv7oSKPpKPcT9-dLJh7XeUoQaBIgB0h7_OlAFigV23M/Sheet1"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          var data = snapshot.val();
          var tmp = [];
          Object.keys(data).forEach((i, index) => {
            if (data[i]["Student"] !== "Total") {
              var obj = data[i];
              obj["id"] = index + 1;
              obj["Full Name"] = obj["First Name"] + " " + obj["Last Name"];
              obj["Grad Year"] = "'" + obj["Grad Year"].toString().substr(2, 4);
              tmp.push(obj);
            }
          });
          setDataArray(tmp);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const tmpColumns = columnHeaders.map((header) => ({
      key: header,
      title: header,
      width: 120,
      dataType: DataType.String,
    }));
    setColumns(tmpColumns);
  }, []);

  const updateCells = () => {
    if (kaPropsUtils.isValid(table.props)) {
      table.saveAllEditors();
      message.success("Data saved locally");

      // Save the updated dataArray back to Firebase Realtime Database
      const db = getDatabase();
      const dbRef = ref(
        db,
        "/1Nv7oSKPpKPcT9-dLJh7XeUoQaBIgB0h7_OlAFigV23M/Sheet1"
      );

      // Prepare data for Firebase (remove id key if necessary)
      const dataForFirebase = dataArray.reduce((acc, student) => {
        const { id, ...rest } = student; // Removing the `id` field
        acc[student["Student"]] = rest; // Map student name to their data
        return acc;
      }, {});

      // Write to Firebase
      set(dbRef, dataForFirebase)
        .then(() => {
          message.success("Data saved to Firebase");
        })
        .catch((error) => {
          message.error("Failed to save data to Firebase: " + error.message);
        });
    } else {
      table.validate(); // Validate the table if not valid
    }
  };

  return (
    <>
      <div>
        <div className="all">
          <div className="row g-0">
            <div className="home_column home_column_left">
              <Navbar theme={themecolor} currentPage="Data" />
            </div>
            <div
              className="home_column"
              style={{
                width: "84.5%",
              }}
            >
              <div style={{ height: "90vh", overflow: "scroll" }}>
                {columns.length > 0 && (
                  <Table
                    table={table}
                    columns={columns}
                    data={dataArray}
                    editingMode={EditingMode.Cell}
                    rowKeyField={"id"}
                    sortingMode={SortingMode.Single}
                    singleAction={openAllEditors()}
                  />
                )}
              </div>
              <div
                style={{
                  width: "100%",
                  height: "10vh",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <div
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "fit-content",
                  }}
                >
                  <Button
                    onClick={updateCells}
                    style={{ marginLeft: "auto", marginRight: "auto" }}
                    size="lg"
                  >
                    Update
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
