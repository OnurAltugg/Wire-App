import React from "react";
import "./HomeSportBox.css";

import { CATEGORIES } from "../../../../helpers/sportCategories";

import { NavLink } from "react-router-dom";

function HomeSportBox(props) {
  return (
    <NavLink to={`/sport/${props.sportName}`} style={{ textDecoration: 'none' }} >
      <div className="homeSportBox">
        <div className="homeSportBoxIconWrapper">
          <img
            src={`../sportsIcons/${
              CATEGORIES.find(({ name }) => name === props.sportName)?.icon
            }`}
            alt="Product"
          />
        </div>
        <p className="homeSportBoxTitle">{props.sportName}</p>
      </div>
    </NavLink>
  );
}

export default HomeSportBox;
