import React from "react";
import "./Home.css";

import { NavLink } from "react-router-dom";
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

import HomeSportBox from "./components/HomeSportBox/HomeSportBox";
import HomeMatchBox from "./components/HomeMatchBox/HomeMatchBox";
import HomeBlogBox from "./components/HomeBlogBox/HomeBlogBox";

import ModalForm from "../../components/ModalForm/ModalForm";
import { HiPlus } from "react-icons/hi";

function Home() {
  const [showModal, setShowModal] = useState(false);

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
    <div className="home">
      <header>
        <div className="h_mobileTopBar">
          <h1 className="mobileTitle">Home</h1>
          <button
            className="mobileCreateEventButton"
            onClick={() => setShowModal(true)}
          >
            <HiPlus />
          </button>
        </div>
      </header>

      <div className="eventForm">
        {showModal && <ModalForm onClose={() => setShowModal(false)} />}
      </div>

      {/* SPORTS */}
      <div className="h_sports">
        <p className="sectionTitle">Sports you follow</p>
        <div className="h_sportsList">
          <HomeSportBox sportName={"Football"} />
          <HomeSportBox sportName={"Basketball"} />
          <HomeSportBox sportName={"Swimming"} />
          <HomeSportBox sportName={"Sailing"} />
          <HomeSportBox sportName={"Dance"} />
          <HomeSportBox sportName={"Lifting"} />
          <HomeSportBox sportName={"Hiking"} />
        </div>
      </div>

      {/* BLOG */}
      <div className="h_blog">
        <p className="sectionTitle">
          Around <b>İzmir</b>
        </p>
        <div className="h_blogList">
          <NavLink to="/uriyat/jimmykey" className="navLinkReset">
            <HomeBlogBox
              title={"Jimmy Key Universail Yat Yarışları"}
              date={"9 July 2023"}
              location={"Urla, İskele"}
              picId={"sail.png"}
            />
          </NavLink>

          <NavLink to="/salsanama/izmir" className="navLinkReset">
            <HomeBlogBox
              title={"Salsanama Turkey İzmir Semi-Finals"}
              date={"17 July 2023"}
              location={"Konak, Alsancak"}
              picId={"salsanama.jpg"}
            />
          </NavLink>

          <NavLink to="/arkas/windsurf" className="navLinkReset">
            <HomeBlogBox
              title={"Youth & Junior Windsurf Foil World Cup 2023"}
              date={"20 July 2023"}
              location={"Urla, Gülbahçe"}
              picId={"windsurf.jpeg"}
            />
          </NavLink>

          <NavLink to="/redbull/halfcourtizmir" className="navLinkReset">
            <HomeBlogBox
              title={"Redbull Half Court Regional Finals"}
              date={"8 August 2023"}
              location={"Karşıyaka, Bostanlı"}
              picId={"redbull.webp"}
            />
          </NavLink>

          <NavLink to="/eayk/republiccup" className="navLinkReset">
            <HomeBlogBox
              title={"100th Anniversary Republic Cup EAYK"}
              date={"30 August 2023"}
              location={"Çeşme, Marina"}
              picId={"sail2.png"}
            />
          </NavLink>
          <span className="gap" style={{ height: "6em" }} />
          <span className="gap" style={{ height: "6em" }} />
        </div>
      </div>

      {/* RECENT EVENTS */}
      <div className="h_recentEvents">
        <p className="sectionTitle">Latest Match Lobbies</p>
        <div className="h_recentEventsList">
          {eventList.map((event) => (
            <div key={event.id}>
              <NavLink
                to={`/lobby/${event.id}`}
                style={{ textDecoration: "none", color: "white" }}
              >
                <HomeMatchBox
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

          <span className="gap" style={{ marginBottom: "6em" }} />
        </div>
      </div>
    </div>
  );
}

export default Home;
