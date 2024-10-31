import { getDatabase, ref, get, set } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { message, Space } from "antd";

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function transfer(
  fromUser,
  toUser,
  amount,
  fromType = "Cash",
  toType = "Cash"
) {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    const dbRef = ref(
      db,
      "/1Nv7oSKPpKPcT9-dLJh7XeUoQaBIgB0h7_OlAFigV23M/Sheet1"
    );

    get(dbRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const fromUserData = Object.values(data).find(
            (user) => user.Student === fromUser
          );
          const toUserData = Object.values(data).find(
            (user) => user.Student === toUser
          );

          if (!fromUserData || !toUserData) {
            message.error("One or both users not found");
            throw new Error("One or both users not found");
          }
          amount = parseInt(amount);

          if (amount <= 0 || !Number.isInteger(amount)) {
            console.log(Number.isInteger(amount));
            message.error("Invalid amount");
            throw new Error("Invalid amount");
          }

          const fromUserCash = parseFloat(fromUserData[fromType]) || 0;
          if (fromUserCash < amount) {
            message.error("Insufficient funds");
            throw new Error("Insufficient funds");
          }

          // Update cash values
          fromUserData[fromType] = (fromUserCash - amount).toString();
          toUserData[toType] = (
            parseFloat(toUserData[toType]) + amount
          ).toString();

          //update more...

          // Prepare updated data for Firebase
          const updatedData = Object.keys(data).reduce((acc, key) => {
            if (data[key].Student === fromUser) {
              acc[key] = fromUserData;
            } else if (data[key].Student === toUser) {
              acc[key] = toUserData;
            } else {
              acc[key] = data[key];
            }
            return acc;
          }, {});

          // Write updated data back to Firebase
          return set(dbRef, updatedData);
        } else {
          throw new Error("No data available");
        }
      })
      .then(() => {
        resolve("Transfer successful");
        message.success(
          `Successfully transferred ${amount} Pelicoin from ${fromUser}'s ${fromType} to ${toUser}'s ${toType}`
        );
      })
      .catch((error) => {
        reject("Error in transfer: " + error.message);
      });
  });
}
