import React from "react";
import "./Discover.css";

import DiscoverSportBox from "./components/DiscoverSportBox/DiscoverSportBox";
import DiscoverRecentSearches from "./components/DiscoverRecentSearch/DiscoverRecentSearch";

import { FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
import { firestore } from "../../firebase";
import {getDocs, collection} from "@firebase/firestore";

function Discover() {

  const userCollectionRef = collection(firestore, "users");
  const [userList, setUserList] = useState([]);

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
    getUserList();
  }, []);

  return (
    <div className="discover">
      <div className="searchSection">
        <div className="searchBarBox">
          <FiSearch size={".8em"} />
          <input
            type="text"
            placeholder="Search teams, leagues or events"
            className="topSearchBar"
          />
        </div>
        <div className="recentSearches">
          <DiscoverRecentSearches searchKey={"Futbol"}/>
          <DiscoverRecentSearches searchKey={"teke tek"}/>
          <DiscoverRecentSearches searchKey={"Tolga Cevik"}/>
        </div>
      </div>

      <div className="peopleSection">
        <h2>People</h2>
        <div className="peopleList">
          {userList
            .map(user => user.name)
            .map(userName => (
              <div className="person">
                <div className="personCircle" />
                <div className="personName">{userName}</div>
              </div>
            ))}
          <div className="person">
            <div className="personCircle" />
            <div className="personName">Ahmet Yilmaz</div>
          </div>
          <div className="person">
            <div className="personCircle" />
            <div className="personName">Ahmet Yilmaz</div>
          </div>
          <div className="person">
            <div className="personCircle" />
            <div className="personName">Ahmet Yilmaz</div>
          </div>
          <div className="person">
            <div className="personCircle" />
            <div className="personName">Ahmet Yilmaz</div>
          </div>
        </div>
      </div>

      <div className="sportsSection">
        <div className="discoverTeamSports">
          <h2>Team Sports</h2>
          <div className="discoverTeamSportsList">
            <DiscoverSportBox sportName={"Football"} />
            <DiscoverSportBox sportName={"Basketball"} />
            <DiscoverSportBox sportName={"Volleyball"} />
          </div>
        </div>
        <div className="discoverWaterSports">
          <h2>Water Sports</h2>
          <div className="discoverWaterSportsList">
            <DiscoverSportBox sportName={"Sailing"} />
            <DiscoverSportBox sportName={"Swimming"} />
            <DiscoverSportBox sportName={"Water Polo"} />
          </div>
        </div>
        <div className="discoverOpenSports">
          <h2>Open Group</h2>
          <div className="discoverOpenSportsList">
            <DiscoverSportBox sportName={"Football"} />
            <DiscoverSportBox sportName={"Basketball"} />
            <DiscoverSportBox sportName={"Volleyball"} />
            <DiscoverSportBox sportName={"Football"} />
            <DiscoverSportBox sportName={"Basketball"} />
            <DiscoverSportBox sportName={"Volleyball"} />
            <DiscoverSportBox sportName={"Football"} />
            <DiscoverSportBox sportName={"Basketball"} />
          </div>
        </div>
        <div className="discoverOneSports">
          <h2>Duel Matchmaking</h2>
          <div className="discoverOneSportsList">
            <DiscoverSportBox sportName={"Football"} />
            <DiscoverSportBox sportName={"Basketball"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Discover;
