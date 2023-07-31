import React from "react";
import "./DiscoverSportBox.css";

import { CATEGORIES } from "../../../../helpers/sportCategories"

import { NavLink } from "react-router-dom";

function DiscoverSportBox(props) {
  return (
    <NavLink to={`/sport/${props.sportName}`} style={{ textDecoration: 'none' }} >
      <div className="discoverSportBox">
        <div className="discoverSportBoxIconWrapper">
          <img
            src={`../sportsIcons/${
              CATEGORIES.find(({ name }) => name === props.sportName)?.icon
            }`}
            alt="Product"
          />
        </div>
        <p className="discoverSportBoxTitle">{props.sportName}</p>
      </div>
    </NavLink>
  );
}

export default DiscoverSportBox;
