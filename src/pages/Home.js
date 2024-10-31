import React, { useState, useContext, useEffect } from "react";
import "../index.scss";
import "react-big-calendar/lib/sass/styles.scss";
import styled, { css } from "styled-components";
import { Calendar as Bigcalendar, momentLocalizer } from "react-big-calendar";
import Navbar from "../components/navbar/navbar";
import { v4 as uuidv4 } from "uuid";
import MenuCardCarousel from "../components/MenuCarouselCards";
import MenuCarousel from "../components/MenuCarousel";
import Pop from "../components/popup";
import Logout from "../components/logout";
import { bgimage } from "../components/popup";
import { background } from "../components/popup";
import { useSelector } from "react-redux";
import { UserContext } from "../components/popup";
import moment from "moment";
import Login from "./Login";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { GridLoader, PulseLoader } from "react-spinners";
import { HexColorPicker } from "react-colorful";
import { PieChart } from "@mui/x-charts/PieChart";
import { getDatabase, ref, child, get } from "firebase/database";
import transfer from "../functions/transfer";
import AnimatedCursor from "react-animated-cursor";
import { Dropdown } from "primereact/dropdown";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import logo2 from "../assets/logo2.png";
import "../index.scss";
import ChromeDinoGame from "react-chrome-dino";
import { ChromePicker } from "react-color";
import { encryptstorage } from "../components/encrypt";
import axios from "axios";
import { message, Space } from "antd";
import "antd/dist/antd.css";
import dayjs from "dayjs";
import Highlighter from "react-highlight-words";
import ThemePop from "../components/popup2";
import { Route, Routes } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import DataTable from "react-data-table-component";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navbar2 } from "../components/navbar/navbar2.js";
import { Navbar3 } from "../components/navbar/navbar3.js";
import Internaltransfer from "../components/internaltransfer.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

export default function Home() {
  // const [isLoggedin, setIsLoggedIn] = useState(false);

  // const [backgroundOption, setBackgroundOption] =
  //   useState("change_bg_option_1");
  // const [color1, setColor1] = useState("#efefef");
  // const [color2, setColor2] = useState("#efefef");
  // const [cardview, setCardview] = useState(true);
  // const [cards, setCards] = useState([]);
  // const [breakfastMenu, setBreakfastMenu] = useState();
  // const [lunchMenu, setLunchMenu] = useState();
  // const [dinnerMenu, setDinnerMenu] = useState();

  const [themecolor, setthemecolor] = useState("#ffffff");
  const [internalTransferModalOpen, setInternalTransferModalOpen] =
    useState(false);
  const [externalTransferModalOpen, setExternalTransferModalOpen] =
    useState(false);

  // const [dayArray, setDayArray] = useState([
  //   "Sunday",
  //   "Monday",
  //   "Tuesday",
  //   "Wednesday",
  //   "Thursday",
  //   "Friday",
  //   "Saturday",
  // ]);

  // const [isLoading, setIsLoading] = useState(false);

  // const [dailyBulletin, setDailyBulletin] = useState([
  //   {},
  //   {},
  //   {},
  //   {},
  //   {},
  //   {},
  //   {},
  //   {},
  // ]);
  // const [showFullDailyBulletin, setShowFullDailyBulletin] = useState(false);
  // const [grade, setgrade] = useState({});

  // const [isNews, setIsNews] = useState(true);
  // const [isGrades, setIsGrades] = useState(true);

  // const [assignments, setAssignments] = useState();
  // const [displayAssignments, setDisplayAssignments] = useState();
  // const [checkflag, setCheckFlag] = useState(false);
  // const [checked, setChecked] = useState([]);
  // const { DateTime } = require("luxon");
  // const [displayBlock, setDisplayBlock] = useState("");

  // const [blocks, setBlocks] = useState({
  //   B1: "",
  //   B2: "",
  //   B3: "",
  //   B4: "",
  //   B5: "",
  //   B6: "",
  //   B7: "",
  // });
  // const [block, setBlock] = useState();
  // const [blockSubject, setBlockSubject] = useState();
  // const [nextBlock, setNextBlock] = useState("");
  // const [rotation, setRotation] = useState("");

  // const localizer = momentLocalizer(moment);

  // const [events, setEvents] = useState();

  // const [Menu, setMenu] = useState();
  // const [Meal, setMeal] = useState();

  // const [assignmentsDisplay, setAssignmentsDisplay] = useState();
  // const [displayClass, setDisplayClass] = useState("");

  // const [data, setData] = useState([]);

  const [user, loading, error] = useAuthState(auth);
  const [curUser, setCurUser] = useState({});
  const [piechartdata, setPiechartdata] = useState([]);
  // const navigate = useNavigate();
  // const [isBlocksLoading, setIsBlocksLoading] = useState(false);
  // const [schedule, setSchedule] = useState();
  // const columns = [
  //   {
  //     name: "Team",
  //     selector: (row) => row.Team,
  //   },
  //   {
  //     name: "Opponent",
  //     selector: (row) => row.Opponent,
  //   },
  //   {
  //     name: "Date",
  //     selector: (row) => row.Date,
  //   },
  //   {
  //     name: "Time",
  //     selector: (row) => row.Time,
  //   },
  // ];

  // const [modalLoading, setModalLoading] = useState(false);
  // const [showModal, setShowModal] = useState(false);
  // const [blockChanged, setBlockChanged] = useState(false);
  // const handleClose = () => setShowModal(false);
  // const handleShow = () => setShowModal(true);
  // const saveBlocks = async () => {
  //   setModalLoading(true);
  //   var emptyBlock = Object.values(blocks).filter((x) => x === "");
  //   if (emptyBlock.length != 0) {
  //     alert("Please fill in all blocks");
  //     return;
  //   } else {
  //     await setDoc(doc(db, "Block", user.email), blocks);
  //     setBlockChanged(!blockChanged);
  //   }
  //   setModalLoading(false);
  //   handleClose();
  // };

  // const location = useLocation();

  // const navigateTo = (destination) => {
  //   navigate(destination);
  // };

  // useEffect(() => {
  //   if (loading) {
  //     return;
  //   }
  //   if (!user) {
  //     console.log("not user");
  //     navigate("/Login");
  //   }
  // }, [user, loading]);

  useEffect(() => {
    const dbRef = ref(getDatabase());
    console.log(dbRef);
    get(child(dbRef, "/1Nv7oSKPpKPcT9-dLJh7XeUoQaBIgB0h7_OlAFigV23M/Sheet1"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          var data = snapshot.val();
          var tmp = [];
          let index = 0;
          console.log(data);
          Object.keys(data).forEach((i) => {
            if (
              user &&
              data[i]["Email"].toLowerCase() == user.email.toLowerCase()
            ) {
              setCurUser(data[i]);
              if (data[i]["Cash"] > 0) {
                tmp.push({
                  id: index,
                  value: data[i]["Cash"],
                  label: "Cash",
                  color: "#BEADFA",
                });
                index += 1;
              }
              if (data[i]["Current Bonds"] > 0) {
                tmp.push({
                  id: index,
                  value: data[i]["Current Bonds"],
                  label: "Current Bonds",
                  color: "#D0BFFF",
                });
                index += 1;
              }
              if (data[i]["Current Stocks"] > 0) {
                tmp.push({
                  id: index,
                  value: data[i]["Current Stpcls"],
                  label: "Current Stocks",
                  color: "#DFCCFB",
                });
                index += 1;
              }
              if (data[i]["Bonds +1"] > 0) {
                tmp.push({
                  id: index,
                  value: data[i]["Bonds +1"],
                  label: "Bonds +1",
                  color: "#78a2cc",
                });
                index += 1;
              }
              if (data[i]["Stocks +1"] > 0) {
                tmp.push({
                  id: index,
                  value: data[i]["Stocks +1"],
                  label: "Stocks +1",
                  color: "#88aed0",
                });
                index += 1;
              }
              if (data[i]["Bonds +2"] > 0) {
                tmp.push({
                  id: index,
                  value: data[i]["Bonds +2"],
                  label: "Bonds +2",
                  color: "#BFD8AF",
                });
                index += 1;
              }
              if (data[i]["Stocks +2"] > 0) {
                tmp.push({
                  id: index,
                  value: data[i]["Stocks +2"],
                  label: "Stocks +2",
                  color: "#E1F0DA",
                });
                index += 1;
              }
              if (data[i]["Bonds +3"] > 0) {
                tmp.push({
                  id: index,
                  value: data[i]["Bonds +3"],
                  label: "Bonds +3",
                  color: "#FAEDCD",
                });
                index += 1;
              }
              if (data[i]["Stocks +3"] > 0) {
                tmp.push({
                  id: index,
                  value: data[i]["Stocks +3"],
                  label: "Stocks +3",
                  color: "#FEFAE0",
                });
                index += 1;
              }
            }
          });
          setPiechartdata(tmp);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user]);

  // useEffect(() => {
  //   const checkupdated = async () => {
  //     var date = new Date();
  //     console.log(date.toString().substring(0, 10));
  //     const docRef = doc(db, "last_updated", user.email);
  //     const docSnap = await getDoc(docRef);
  //     var data = docSnap.data();
  //     if (!docSnap.exists()) {
  //       await setDoc(doc(db, "last_updated", user.email), {
  //         last_updated: date,
  //       });
  //       console.log("fakjsdhfjkdsahkj");
  //     } else {
  //       console.log(data["last_updated"].toDate().getDay());
  //       if (
  //         data["last_updated"].toDate().toString().substring(0, 10) !=
  //         date.toString().substring(0, 10)
  //       ) {
  //         console.log("date mismatch");
  //         //run update grades
  //         axios
  //           .post("https://loomis.herokuapp.com/updateGrades", {
  //             username: user.email,
  //             password: userInfo[1],
  //           })
  //           .then(function (response) {
  //             message.success("Grades were succesfully updated");
  //             axios
  //               .post("https://loomis.herokuapp.com/updateAssignments", {
  //                 username: user.email,
  //                 password: userInfo[1],
  //               })
  //               .then(async function (response) {
  //                 message.success("Assignments were succesfully updated");
  //                 await setDoc(doc(db, "last_updated", user.email), {
  //                   last_updated: date,
  //                 });
  //               })
  //               .catch(function (error) {
  //                 console.log(error);
  //               });
  //           })
  //           .catch(function (error) {
  //             console.log(error);
  //           });
  //       }
  //     }
  //   };

  //   const checkOverallUpdated = async () => {
  //     axios
  //       .post("https://loomis.herokuapp.com/getRecommendation", {
  //         username: user.email,
  //         password: userInfo[1],
  //       })
  //       .then(function (response) {
  //         var array = response.data;
  //         console.log(response.data);
  //         if (array.indexOf("assignments") <= array.indexOf("calendar")) {
  //           setAssignmentsDisplay(true);
  //         } else {
  //           setAssignmentsDisplay(false);
  //           getCalendar();
  //         }
  //       });
  //     var date = new Date();
  //     console.log(date.toString().substring(0, 10));
  //     const docRef = doc(db, "last_updated", "Overall");
  //     const docSnap = await getDoc(docRef);
  //     var data = docSnap.data();
  //     if (!docSnap.exists()) {
  //       await setDoc(doc(db, "last_updated", "Overall"), {
  //         last_updated: date,
  //       });
  //     } else {
  //       console.log(data["last_updated"].toDate().toString().substring(0, 10));
  //       if (
  //         !dayjs().isSame(
  //           data["last_updated"].toDate().toISOString().split("T")[0],
  //           "week"
  //         )
  //       ) {
  //         console.log("overall date mismatch");
  //         //run updates
  //         axios
  //           .get("https://loomis.herokuapp.com/updateNews")
  //           .then(function (response) {
  //             message.success("The Daily Bulletin was succesfully updated");
  //             axios
  //               .get("https://loomis.herokuapp.com/updateMenu")
  //               .then(function (response) {
  //                 message.success("Menu was succesfully updated");
  //                 axios
  //                   .get("https://loomis.herokuapp.com/updateAthleticSchedule")
  //                   .then(async function (response) {
  //                     message.success(
  //                       "Althetic Schedule was succesfully updated"
  //                     );
  //                     await setDoc(doc(db, "last_updated", "Overall"), {
  //                       last_updated: date,
  //                     });
  //                   })
  //                   .catch(function (error) {
  //                     console.log(error);
  //                   });
  //               })
  //               .catch(function (error) {
  //                 console.log(error);
  //               });
  //           })
  //           .catch(function (error) {
  //             console.log(error);
  //           });
  //       }
  //     }
  //   };

  //   const getDailyBulletin = async () => {
  //     // const querySnapshot = await getDocs(collection(db, "daily_bulletin"));
  //     // querySnapshot.forEach((doc)=>{
  //     //     console.log(doc.data());
  //     // })

  //     const collectionRef = collection(db, "daily_bulletin");
  //     const q = query(collectionRef, orderBy("uupdate_date", "desc"), limit(1));
  //     const querySnapshot = await getDocs(q);
  //     var tempArray = [];
  //     querySnapshot.forEach((doc) => {
  //       var data = doc.data();
  //       delete data["uupdate_date"];
  //       for (var key in data) {
  //         console.log(data[key]["Title"]);
  //         data[key]["Title"] = data[key]["Title"].replace(" ", "");
  //       }
  //       setDailyBulletin(data);
  //     });
  //   };

  //   const getMenu = async () => {
  //     const collectionRef = collection(db, "menu");
  //     const q = query(collectionRef);
  //     const querySnapshot = await getDocs(q);
  //     var tempBreakfast;
  //     var tempLunch;
  //     var tempDinner;
  //     querySnapshot.forEach((doc) => {
  //       var data = doc.data();
  //       setBreakfastMenu(data.breakfast);
  //       setLunchMenu(data.lunch);
  //       setDinnerMenu(data.dinner);
  //       tempBreakfast = data.breakfast;
  //       tempLunch = data.lunch;
  //       tempDinner = data.dinner;
  //       console.log("Menu Gotten");
  //     });
  //     console.log(data.dinner);
  //   };

  //   setIsLoading(false);

  //   const getSchedule = async () => {
  //     const collectionRef = collection(db, "Athletics_schedule");
  //     const q = query(collectionRef);
  //     const querySnapshot = await getDocs(q);
  //     querySnapshot.forEach((doc) => {
  //       var data = doc.data();
  //       var tempArray = [];
  //       Object.values(data).map((element, index) => {
  //         tempArray.push(element);
  //       });
  //       setData(tempArray);
  //       setSchedule(data);
  //     });
  //   };

  //   if (user) {
  //     getSchedule();
  //     getDailyBulletin();
  //     // checkupdated();
  //     // checkOverallUpdated();
  //     getMenu();
  //     getCalendar();
  //   }
  // }, [user]);

  // };

  return (
    <>
      <div>
        <div className="all" style={{ backgroundColor: "#f8f9faa3" }}>
          {/* <div className="pickers_grid">
                        <Pop changeBackground={setBackgroundOption} color1={color1} setColor1={setColor1} color2={color2} setColor2={setColor2} />
                        <ThemePop changeTheme={adjustTheme} color1={themecolor} setthemecolor={setthemecolor} />
                    </div> */}
          {/* <div
            className="container-fluid blur"
            style={{
              backgroundColor: "rgb(254, 254, 254)",
              backgroundImage:
                backgroundOption === "change_bg_option_1"
                  ? "none"
                  : backgroundOption === "change_bg_option_2"
                  ? "linear-gradient(62deg, #8ec5fc, #e0c3fc, #86a8e7, #eaafc8)"
                  : backgroundOption === "change_bg_option_3"
                  ? "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)"
                  : backgroundOption === "change_bg_option_4"
                  ? "linear-gradient(120deg, #fccb90 0%, #d57eeb 100%)"
                  : backgroundOption === "change_bg_option_5" &&
                    `linear-gradient(120deg, ${color1} 0%, ${color2} 100%)`,
              animation: "gradient 5s ease infinite !important",
              WebkitAnimation: "gradient 5s ease infinite !important",
            }}
          ></div> */}
          <div className="row g-0">
            <div className="home_column home_column_left">
              <Navbar3 theme={themecolor} currentPage="Home" />
            </div>
            <div style={{ height: "100vh", width: "85%" }}>
              <div
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  height: "98vh",
                  borderRadius: "3%",
                  marginTop: "1%",
                  marginBottom: "1%",
                  border: "4px solid #f5f5f5",
                  padding: "7%",
                }}
              >
                <p
                  className="home_hi"
                  style={{
                    fontSize: "30px",
                    fontWeight: 700,
                    marginLeft: 10,
                    marginBottom: 20,
                    fontFamily: "Open Sans",
                  }}
                >
                  Hello, {curUser["First Name"]}!
                </p>
                <div style={{ height: "80%" }}>
                  <div className="home_column home_column_center" style={{}}>
                    <div
                      className="home_center_top"
                      style={{
                        padding: "5%",
                        borderRadius: "20px",
                        width: "100%",
                        marginRight: "0px",
                        border: "1px solid #f5f5f5",
                        height: "70%",
                      }}
                    >
                      {piechartdata && (
                        <div
                          style={{
                            width: "100%",
                            height: "80%",
                            position: "relative",
                          }}
                        >
                          <div
                            style={{
                              width: "fit-content",
                              height: "fit-content",
                              marginLeft: "auto",
                              marginRight: "auto",
                            }}
                          >
                            <PieChart
                              style={{
                                marginLeft: "auto",
                                marginRight: "auto",
                              }}
                              slotProps={{
                                legend: {
                                  direction: "column",
                                  position: {
                                    vertical: "middle",
                                    horizontal: "right",
                                  },
                                  labelStyle: {
                                    fontSize: 14,
                                  },
                                  itemGap: 0,
                                },
                              }}
                              series={[
                                {
                                  data: piechartdata,
                                  innerRadius: 30,
                                  outerRadius: 100,
                                  paddingAngle: 3,
                                  cornerRadius: 5,
                                  arcLabel: (item) =>
                                    item.value > curUser["Net Worth"] * 0.25
                                      ? `${item.label}`
                                      : "",
                                },
                              ]}
                              width={400}
                              height={300}
                            />
                          </div>
                        </div>
                      )}
                      <div
                        style={{
                          marginLeft: "auto",
                          marginRight: "auto",
                          width: "fit-content",
                          fontSize: "20px",
                          fontWeight: 500,
                          marginTop: "20px",
                        }}
                      >
                        Net Worth: {curUser["Net Worth"]} Pelicoin
                      </div>
                    </div>
                    <div
                      className="home_center_bottom"
                      style={{
                        borderRadius: "20px",
                        marginRight: "0px",
                        width: "100%",
                        marginTop: "5%",
                        height: "30%",
                      }}
                    >
                      <div
                        className="content_title"
                        style={{ fontSize: "20px" }}
                      >
                        Transfer Pelicoin
                      </div>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "auto auto",
                          width: "60%",
                          marginLeft: "auto",
                          marginRight: "auto",
                          height: "60%",
                          alignItems: "center",
                        }}
                      >
                        <div style={{ padding: "1px" }}>
                          <button
                            style={{
                              marginLeft: "auto",
                              marginRight: "auto",
                              display: "block",
                              border: "none",
                              padding: "20px",
                              fontSize: "15px",
                              borderRadius: "20px",
                            }}
                            onClick={() => setInternalTransferModalOpen(true)}
                          >
                            Internal Transfer
                          </button>
                          {console.log(curUser)}
                          <Internaltransfer
                            internalTransferModalOpen={
                              internalTransferModalOpen
                            }
                            setInternalTransferModalOpen={
                              setInternalTransferModalOpen
                            }
                            curUser={curUser}
                          />
                        </div>
                        <div style={{ margin: "1px" }}>
                          <button
                            style={{
                              marginLeft: "auto",
                              marginRight: "auto",
                              display: "block",
                              border: "none",
                              padding: "20px",
                              fontSize: "15px",
                              borderRadius: "20px",
                            }}
                            onClick={() => setExternalTransferModalOpen(true)}
                          >
                            External Transfer
                          </button>

                          <Modal
                            show={externalTransferModalOpen}
                            onHide={() => setExternalTransferModalOpen(false)}
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>Modal heading</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              Woohoo, you are reading this text in a modal!
                            </Modal.Body>
                            <Modal.Footer>
                              <Button
                                variant="secondary"
                                onClick={() =>
                                  setExternalTransferModalOpen(false)
                                }
                              >
                                Close
                              </Button>
                              <Button
                                variant="primary"
                                onClick={() =>
                                  setExternalTransferModalOpen(false)
                                }
                              >
                                Save Changes
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </div>
                      </div>
                      *To be updated
                    </div>
                  </div>
                  <div
                    className="home_column home_column_right"
                    style={{
                      paddingRight: "1%",
                    }}
                  >
                    {/* <div
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      width: "90%",
                      marginLeft: "auto",
                      marginRight: "auto",
                      marginTop: 25,
                      marginBottom: 10,
                    }}
                  ></div> */}
                    <div className="home_right_top" style={{ height: "50%" }}>
                      <div
                        style={{
                          fontSize: "20px",
                          borderRadius: "20px",
                          fontFamily: "Open Sans",
                          fontWeight: "bold",
                        }}
                      >
                        Announcements
                      </div>
                      *To be updated
                    </div>
                    <div
                      className="home_right_top"
                      style={{ height: "50%", marginTop: "5%" }}
                    >
                      <div
                        style={{
                          fontSize: "20px",
                          borderRadius: "20px",
                          fontFamily: "Open Sans",
                          fontWeight: "bold",
                        }}
                      >
                        Shop
                      </div>
                      *To be updated
                    </div>
                    {/* <div
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      width: "fit-content",
                      marginLeft: "auto",
                      marginRight: "auto",
                      paddingLeft: 30,
                      marginTop: 50,
                      marginBottom: 10,
                      display: "inline-block",
                    }}
                  >
                    YYY{" "}
                  </div>
                  <div
                    style={{
                      display: "inline-block",
                      float: "right",
                      margin: "50px auto 10px",
                      marginRight: "35px",
                      color: "blue",
                      cursor: "pointer",
                    }}
                  >
                    Content
                  </div>
                  <div className="home_right_bottom">
                    <div
                      style={{
                        overflow: "auto",
                        height: "100%",
                        overflowY: "scroll",
                        width: "100%",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    >
                      Content
                    </div>
                  </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
