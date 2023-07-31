import "./ModalForm.css";

import { FaChevronLeft } from "react-icons/fa";

import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { firestore, auth } from "../../firebase";
import {
  getDocs,
  collection,
  addDoc,
  doc,
  updateDoc,
} from "@firebase/firestore";

function ModalForm({ onClose }) {

  const navigate = useNavigate();
  const modalRef = useRef(); // import useRef from 'react'

  const closeModal = (event) => {
    if (event.target === modalRef.current) {
      onClose();
    }
  };

  const eventCollectionRef = collection(firestore, "events");
  const userCollectionRef = collection(firestore, "users");

  //Read Events States
  const [eventList, setEventList] = useState([]);
  const [userList, setUserList] = useState([]);

  const [nameEventSport, setnameEventSport] = useState("");
  const [nameEventTitle, setnameEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLimit, setEventLimit] = useState(0);
  const [nameEventLocation, setnameEventLocation] = useState("");
  const [eventTime, seteventTime] = useState("");
  const [description, setDescription] = useState("");

  const getEventList = async () => {
    //READ THE DATA
    //SET THE EVENT LIST
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

  const onAddEvent = async (e) => {
    e.preventDefault()
    //WRITE THE DATA
    if(auth.currentUser){
      alert("LOG IN!");
      return;
    }
    if (
      nameEventSport === "" ||
      nameEventTitle === "" ||
      eventDate === "" ||
      eventLimit === "" ||
      nameEventLocation === "" ||
      eventTime === ""
    ) {
      alert("Please fill in all fields!");
      return;
    }
    if (eventLimit <= 0) {
      alert("Event Limit Number cannot be less than 1!");
      return;
    }

    try {
      const newEvent = {
        sport: nameEventSport,
        title: nameEventTitle,
        date: eventDate,
        time: eventTime,
        limit: eventLimit,
        location: nameEventLocation,
        eventCurrentUserCount: 1,
        eventCurrentUsers: [auth.currentUser.uid],
        description: description,
      };

      const docRef = await addDoc(eventCollectionRef, newEvent);
      const eventId = docRef.id;
      await updateDoc(docRef, { id: eventId });
      const userData = await getDocs(userCollectionRef);
      const users = userData.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      var currentUser = null;

      for (const user of users) {
        if (user.data.userId === auth.currentUser?.uid) {
          currentUser = user;
          
        }
      }
      await updateDoc(doc(userCollectionRef, currentUser.id), {
        eventsJoined: [...currentUser.data.eventsJoined, eventId],
      });

      await updateDoc(docRef, { creator: currentUser.data.name });

      await getEventList();
      await getUserList();
    } catch (err) {
      console.error(err);
      console.log("3");
    }
    navigate('/');
    onClose();
    window.location.reload(false);
  };

  return (
    <div className="modal" onClick={closeModal} ref={modalRef}>
      <div className="modal-content">
        <span className="backButton" onClick={onClose}>
          <FaChevronLeft />
          Back
        </span>
        <h2>Create an event</h2>

        <form>
          <input
            list="sports"
            placeholder="Sports..."
            onChange={(e) => setnameEventSport(e.target.value)}
          />
          <datalist id="sports">
            <option>Football</option>
            <option>Basketball</option>
            <option>Tennis</option>
            <option>Other</option>
          </datalist>
          <input
            placeholder="Title..."
            onChange={(e) => setnameEventTitle(e.target.value)}
          />
          <input
            placeholder="Date..."
            type="date"
            onChange={(e) => setEventDate(e.target.value)}
          />
          <input
            placeholder="Time..."
            type="time"
            onChange={(e) => seteventTime(e.target.value)}
          />
          <input
            placeholder="Limit..."
            type="number"
            onChange={(e) => setEventLimit(Number(e.target.value))}
          />
          <input
            placeholder="Location..."
            onChange={(e) => setnameEventLocation(e.target.value)}
          />
          <input
            placeholder="Description..."
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={onAddEvent}>Add Event</button>
        </form>
      </div>
    </div>
  );
}

export default ModalForm;
