import React from "react";
import "./MatchBox.css";

import { CATEGORIES } from "../../../helpers/sportCategories";

import { BiUser } from "react-icons/bi";

function MatchBox({
  title,
  userName,
  sportName,
  location,
  time,
  date,
  userLimit,
  currentUsers,
}) {

  const isFull = userLimit === currentUsers;

  return (
    <div className="homeMatchBox">
      <div className="homeMatchBoxContent">
        <div className="homeMatchBoxInfo">
          <div className="homeMatchBoxTopTitleSection">
            <div
              className="homeMatchBoxUserStatus"
              style={{
                color: isFull ? "#FF6C6C" : "#BEFF6C",
              }}
            >
              <BiUser />
              <b>
                {userLimit}/{currentUsers}
              </b>
            </div>
            <div className="homeMatchBoxTitle">
              <b>{title}</b>
            </div>
          </div>
          <div className="homeMatchBoxTopUserName">{userName}</div>
        </div>
        <div className="homeMatchBoxTimeSection">
          <p className="homeMatchBoxDate">{date}</p>
          <p className="homeMatchBoxTime">{time}</p>
        </div>
      </div>
      <div className="homeMatchBoxTags">
        <div className="homeMatchBoxSport">
          <div className="homeMatchBoxSportImgWrapper">
            <img
              src={`../sportsIconsDark/${
                CATEGORIES.find(({ name }) => name === sportName)?.icon
              }`}
              alt="Sport"
            />
          </div>

          <p className="homeMatchBoxSportTitle">{sportName}</p>
        </div>
        <div className="homeMatchBoxLocation">
          <BiUser />
          {location}
        </div>
      </div>
    </div>
  );
}

export default MatchBox;
