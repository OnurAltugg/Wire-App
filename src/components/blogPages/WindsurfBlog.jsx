import React from "react";
import "./BlogPageStyles.css";

import { useNavigate, NavLink } from "react-router-dom";

import { FaChevronLeft } from "react-icons/fa";
import { TiLocationOutline } from "react-icons/ti";

import BlogBox from "./BlogBox/BlogBox";

function WindsurfBlog() {
  const navigate = useNavigate();

  return (
    <div className="blogPage">
      <button className="backButton" onClick={() => navigate(-1)}>
        <FaChevronLeft />
        Back
      </button>

      <div className="blogPageContainer">
        <div className="blogContent">
          <div className="blogContentHeader">
            <div
              className="blogImage"
              style={{ backgroundImage: `url(/eventPics/windsurf.jpeg` }}
            />
            <div className="blogHeaderInfo">
              <h1>Youth & Junior Windsurf Foil World Cup 2023</h1>

              <div className="blogLocTime">
                <div className="blogLocation">
                  <TiLocationOutline color="#ffffff" size="1.2em" />
                  Urla, Gülbahçe
                </div>
                <div className="blogDate">20 July 2023</div>
              </div>

              <p className="sectionTitle">Organizator</p>
              <div className="blogOraganizator">
                <div
                  className="blogOrganizatorPic"
                  style={{ backgroundImage: `url(/organizatorLogos/arkas.jpg` }}
                />
                <h3>ARKAS Spor Kulübü</h3>
              </div>
            </div>
          </div>

          <div className="blogContentDesc">
            <p className="sectionTitle">Description</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
              massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien
              fringilla, mattis ligula consectetur, ultrices mauris. Maecenas
              vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum
              auctor ornare leo, non suscipit magna interdum eu. Curabitur
              pellentesque nibh nibh, at maximus ante fermentum sit amet.
              Pellentesque commodo lacus at sodales sodales. Quisque sagittis
              orci ut diam condimentum, vel euismod erat placerat.
            </p>
          </div>
        </div>

        <div className="blogSimilarEvents">
          <p className="sectionTitle">See Other Events</p>
          <div className="blogSimilarEventsList">
            <NavLink to="/uriyat/jimmykey" className="navLinkReset">
              <BlogBox
                title={"Jimmy Key Universail Yat Yarışları"}
                date={"9 July 2023"}
                location={"Urla, İskele"}
                picId={"sail.png"}
              />
            </NavLink>

            <NavLink to="/salsanama/izmir" className="navLinkReset">
              <BlogBox
                title={"Salsanama Turkey İzmir Semi-Finals"}
                date={"17 July 2023"}
                location={"Konak, Alsancak"}
                picId={"salsanama.jpg"}
              />
            </NavLink>

            <NavLink to="/redbull/halfcourtizmir" className="navLinkReset">
              <BlogBox
                title={"Redbull Half Court Regional Finals"}
                date={"8 August 2023"}
                location={"Karşıyaka, Bostanlı"}
                picId={"redbull.webp"}
              />
            </NavLink>

            <NavLink to="/eayk/republiccup" className="navLinkReset">
              <BlogBox
                title={"100th Anniversary Republic Cup EAYK"}
                date={"30 August 2023"}
                location={"Çeşme, Marina"}
                picId={"sail2.png"}
              />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WindsurfBlog;
