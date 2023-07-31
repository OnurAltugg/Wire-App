import React from "react";
import "./MatchLobby.css";

import { CATEGORIES } from "../../helpers/sportCategories";

import { useParams, useNavigate } from "react-router-dom";

import { FaChevronLeft } from "react-icons/fa";
import { TiLocationOutline } from "react-icons/ti";
import { BiUser } from "react-icons/bi";
import { HiPlus } from "react-icons/hi";

import { useState, useEffect } from "react";
import { firestore, auth } from "../../firebase";
import {getDocs, collection, doc, updateDoc} from "@firebase/firestore";

function MatchLobby() {
  const navigate = useNavigate();

  let { lobbyId } = useParams();

  const eventCollectionRef = collection(firestore, "events");
  const userCollectionRef = collection(firestore, "users");

  //Read Events States
  const [eventList, setEventList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [showUsersList, setShowUsersList] = useState([]);

  const getEventList = async () => {
    try {
      const data = await getDocs(eventCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setEventList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };
  const getUserList = async() => {
    //READ THE DATA
    //SET THE USER LIST
    try{
        const data = await getDocs(userCollectionRef);
        const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id,}))
        setUserList(filteredData);
    }
    catch(err){
        console.error(err);
    } 
}
  useEffect(() => {
    getEventList();
    getUserList();
  }, []);

  const joinEvent = async (id) => {
    try {
      const userData = await getDocs(userCollectionRef);
      const users = userData.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
  
      const eventData = await getDocs(eventCollectionRef);
      const events = eventData.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
  
      let currentEvent = null;
      let currentUser = null;
  
      for (const event of events) {
        if (event.data.id === id) {
          currentEvent = event;
          break;
        }
      }
  
      for (const user of users) {
        if (user.data.userId === auth.currentUser?.uid) {
          currentUser = user;
          break;
        }
      }
  
      if (currentEvent.data.eventCurrentUsers[0] === auth.currentUser?.uid) {
        alert('You have already joined the event!');
        return;
      }
  
      for (const userEventJoined of currentUser.data.eventsJoined) {
        if (userEventJoined === id) {
          alert('You have already joined the event!');
          return;
        }
      }
  
      if (currentEvent.data.limit <= currentEvent.data.eventCurrentUserCount) {
        alert('The event is full!');
        return;
      }
  
      await updateDoc(doc(eventCollectionRef, currentEvent.id), {
        eventCurrentUserCount: currentEvent.data.eventCurrentUserCount + 1,
        eventCurrentUsers: [...currentEvent.data.eventCurrentUsers, auth.currentUser.uid],
      });
  
      await updateDoc(doc(userCollectionRef, currentUser.id), {
        eventsJoined: [...currentUser.data.eventsJoined, id],
      });
  
      alert('You have successfully joined the event!');
    } catch (err) {
      console.error(err);
    }
  }

 async function showUsers() {
  try {
    const userData = await getDocs(userCollectionRef);
    const users = userData.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));

    const eventData = await getDocs(eventCollectionRef);
    const events = eventData.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));

    let currentEvent = null;
    let currentUser = null;

    for (const event of events) {
      if (event.data.id === lobbyId) {
        currentEvent = event;
        break;
      }
    }
    for (const user of users) {
      console.log(!showUsersList.includes(user.data.name))
      console.log(showUsersList)
      console.log(user.data.name)
      if (currentEvent.data.eventCurrentUsers.includes(user.data.userId) && !showUsersList.includes(user.data.name)) {
        console.log("1");
        console.log(!showUsersList.includes(user.data.name))
        console.log(showUsersList)
        console.log(user.data.name)
        setShowUsersList(prevState => [...prevState, user.data.name])  
      }
    }

  } catch (err) {
    console.error(err);
  }
  }

  const isFull = 0;

  return (
    <div className="matchLobby">
      {eventList
        .filter((event) => event.id === lobbyId)
        .map((event) => (
          <div key={event.id}>
            <button className="backButton" onClick={() => navigate(-1)}>
              <FaChevronLeft />
              Back
            </button>

            <div className="matchLobbyContent">
              <div className="matchLobbyInfo">
                <h1 className="matchLobbyTitle">{event.title}</h1>
                <div className="lobbyDateMobile">
                  {event.date} <b>{event.time}</b>
                </div>
                <p className="sectionTitle">Posted by</p>
                <div className="lobbyUser">
                  <img></img>
                  <div className="matchUserName">{event.creator}</div>
                </div>

                <p className="sectionTitle">Details</p>
                <div className="lobbyDetails">
                  <div className="lobbyDate">
                    <div className="lobbyDateDay">{event.date}</div>
                    <div className="lobbyDateTime">{event.time}</div>
                  </div>
                  <div className="lobbySport">
                    <div className="lobbySportIconWrapper">
                      <img
                        src={`../sportsIconsDark/${event.sport}.svg`}
                        alt="Product"
                      />
                    </div>
                    {event.sport}
                  </div>
                  <div className="lobbyLocation">
                    <TiLocationOutline size="1.2em" />
                    {event.location}
                  </div>
                </div>
                <p className="sectionTitle">Description</p>
                <div className="lobby Description">
                  {event.description}
                </div>
              </div>

              <div className="matchLobbyTeamsSection">
                <p className="sectionTitle">Teams</p>
                <div className="matchLobbyTeams">
                  <div className="lobbyTeamLeft">
                    <div className="leftTeamTitle">
                      Team 1
                      <div
                        className="leftTeamCount"
                        style={{
                          color: isFull ? "#FF6C6C" : "#BEFF6C",
                          backgroundColor: isFull
                            ? "RGBA(255,108,108,.2)"
                            : "RGBA(190,255,108,.2)",
                        }}
                      >
                        <BiUser />
                        1/4
                      </div>
                    </div>
                    <div className="leftTeamList">
                      <div className="leftTeamUser">
                      {userList
                      .filter(user => user.eventsJoined.includes(lobbyId))
                      .map(user => user.name)
                      .map(userName => (
                        <div key={userName}>{userName}</div>
                      ))}
                      </div>
                      <div className="leftTeamJoin" onClick={() => joinEvent(event.id)}>
                        <div className="joinCircle">
                          <HiPlus />
                        </div>
                        <p className="joinText">Join</p>
                      </div>
                      <div className="leftTeamJoin">
                        <div className="joinCircle">
                          <HiPlus />
                        </div>
                        <p className="joinText">Join</p>
                      </div>
                      <div className="leftTeamJoin">
                        <div className="joinCircle">
                          <HiPlus />
                        </div>
                        <p className="joinText">Join</p>
                      </div>
                      <div className="leftTeamJoin">
                        <div className="joinCircle">
                          <HiPlus />
                        </div>
                        <p className="joinText">Join</p>
                      </div>
                      <div className="leftTeamJoin">
                        <div className="joinCircle">
                          <HiPlus />
                        </div>
                        <p className="joinText">Join</p>
                      </div>
                    </div>
                  </div>
                  <div className="lobbyTeamRight">
                    <div className="rightTeamTitle">
                      <div
                        className="rightTeamCount"
                        style={{
                          color: isFull ? "#FF6C6C" : "#BEFF6C",
                          backgroundColor: isFull
                            ? "RGBA(255,108,108,.2)"
                            : "RGBA(190,255,108,.2)",
                        }}
                      >
                        0/4
                        <BiUser />
                      </div>
                      Team 2
                    </div>
                    <div className="rightTeamList">
                      <div className="rightTeamUser"></div>
                      <div className="rightTeamJoin">
                        <p className="joinText">Join</p>
                        <div className="joinCircle">
                          <HiPlus />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default MatchLobby;
