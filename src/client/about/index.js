import React, { useState, useEffect } from "react";
import "../stylesheets/about.scss";
import Jeremy from "../images/jeremy.png";
import Shannon from "../images/shannon.jpg";
import Mike from "../images/mike.jpg";


const About = (props) => {
  return (
    <div>
      <h1 className="aboutHeader">ABOUT US</h1>
      <div className="aboutContainer">
        <div className="A">
          Namaslay is a values driven organization. Here is what we believe in.
        </div>
        <div className="B">Our Team</div>
        <div className="C">
          <ul>
            <li>Value Number One</li>
            <li>Value Number Two</li>
            <li>Value Number Three</li>
            <li>Value Number Four</li>
          </ul>
        </div>
        <div className="D">
          <div>
            <img src={Jeremy} alt="individual" width="80px"></img>
            <p>INFO ABOUT THIS PERSON</p>
          </div>
          <div>
            <img src={Shannon} alt="woman" width="80px"></img>
            <p>INFO ABOUT THIS PERSON</p>
          </div>
          <div>
            <img src={Mike} alt="man" width="80px"></img>
            <p>INFO ABOUT THIS PERSON</p>
          </div>{" "}
        </div>
      </div>
      <div className="aboutFooter">
        <h2>"Yoga does not just change the way we see things, it transorms the person who sees."<br/>- B.K.S. lyengar</h2>
      </div>
    </div>
  );
};

export default About;
