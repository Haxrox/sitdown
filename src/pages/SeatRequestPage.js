import Header from '../components/Header'
import AvailableSeat from '../components/AvailableSeat'
import PropTypes from 'prop-types'
import { useHistory } from "react-router-dom";
import {GetDocument} from "../firebase.js"
import {collection, getDoc, getDocs, doc, query, onSnapshot, getFirestore } from "firebase/firestore"
import React, { useState } from "react";
import { getAuth } from 'firebase/auth';

var id = 0;
console.log("SendRequestPage.js");

const SeatRequestPage = () => {

    const [userTokenCount, setUserTokenCount] = useState('')
    const [userDisplayname, setUserDisplayname] = useState("not logged in user")
    const auth = getAuth()
    const db = getFirestore()
    if (auth.currentUser) {
        const docRef = doc(db, "Users", auth.currentUser.uid); 
        getDoc(docRef).then((docSnap) => {
            if (docSnap.exists()) {
                console.log(docSnap.data().TokenCount.toString())
                setUserTokenCount(docSnap.data().TokenCount.toString())
            } else {
                console.log("User does not exist") 
            }
        })
        setUserDisplayname(auth.currentUser.displayName)
    }  
  
    const history = useHistory();
    const building = history.location.data;
    console.log(building);
    var seats;
    var availableSeats = [];

    GetDocument("Spaces", building).then(data => {
      seats = data.Floors.reduce((previousValue, currentValue) => 
        previousValue.Seats.filter(seat => !seat.Occupied).length + currentValue.Seats.filter(seat => !seat.Occupied).length
      );
      console.log("Seats: " + seats);
    }).catch((error) => {
      console.error("Space error - " + error);
    });

    GetDocument(building, "Requesters").then(data => {
      data.Users.forEach((seat, index) => {
        seat.leaveTime = new Date(seat.leaveTime).toLocaleTimeString('en-US');
        seat.waitTime = new Date(seat.leaveTime).getMinutes();
        seat.id = index;
      });
      availableSeats = data.Users;
      console.log(availableSeats);
    }).catch((error) => {
      console.error("Requesters error - " + error);
    });
    /*
        {
          responderMessage: "Hi my name is Joe Mama and I'm sitting behind you",
          leaveTime: "4:00PM",
          waitTime: "5 mins",
          tokenCost: "1",
          id: "1",
        },
        {
          responderMessage: "Hi my name is Sina Allen and I'm sitting in front of you",
          leaveTime: "44:00PM",
          waitTime: "55 mins",
          tokenCost: "2",
          id: "2",
        },
        {
          responderMessage: "Hi my name is Kerry Wang and I'm sitting beside you",
          leaveTime: "444:00PM",
          waitTime: "555 mins",
          tokenCost: "3",
          id: "3",
        },
      ]
      */
    return (
        <div>
            <Header tokens={userTokenCount} user={userDisplayname}/>
            <div >
                <h3>[{seats}] seats soon to be available at {building} </h3>
            </div>
            {availableSeats.map((obj)=> (
                <AvailableSeat key={obj.id} availableSeat={obj}/>
            ))}

        </div>
    )
}

SeatRequestPage.defaultProps = {
    building: "Building X",
    seats: 0
}

SeatRequestPage.propTypes = {
    building: PropTypes.string,
    seats: PropTypes.number
}

export default SeatRequestPage

