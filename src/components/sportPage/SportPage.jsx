import React from "react";
import "./SportPage.css";

import { useParams, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

import MatchBox from "./matchBox/MatchBox";

import { FaChevronLeft } from "react-icons/fa"

import { useState, useEffect } from "react";
import { firestore } from "../../firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
  getDoc,
} from "@firebase/firestore";

function SportPage() {
  const navigate = useNavigate();

  let { sportName } = useParams();

  const eventCollectionRef = collection(firestore, "events");
  const userCollectionRef = collection(firestore, "users");

  //Read Events States
  const [eventList, setEventList] = useState([]);
  const [userList, setUserList] = useState([]);

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
  useEffect(() => {
    getEventList();
  }, []);

  const getUserList = async () => {
    //READ THE DATA
    //SET THE USER LIST
    try {
      const data = await getDocs(userCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUserList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getUserList();
  }, []);

  return (
    <div className="sportPage">
      <div className="sportPageMobileOpaque" />

      <button className="backButton" onClick={() => navigate(-1)}><FaChevronLeft/>Back</button>
      <div className="sportPageTop">
        <h1>{sportName}</h1>
        <button className="followButton">Follow</button>
      </div>

      <p className="sectionTitle sport">Match Lobbies</p>
      <div className="sportPageList">
      {eventList.filter((event) => event.sport === sportName).map((event) => (
            <div key={event.id}>
              <NavLink
                to={`/lobby/${event.id}`}
                style={{ textDecoration: "none", color: "white" }}
              >
                <MatchBox
                  title={event.title}
                  userName={event.creator}
                  sportName={event.sport}
                  location={event.location}
                  time={event.time}
                  date={event.date}
                  userLimit={parseInt(event.limit)}
                  currentUsers={"0"}
                />
              </NavLink>
            </div>
          ))}
      </div>
    </div>
  );
}

export default SportPage;
