import React, { useState, useEffect } from "react";
import "../stylesheets/about.scss";
import Jeremy from "../images/jeremy.png";
import Shannon from "../images/shannon.jpg";
import Trent from "../images/trent.jpg";

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
            <li>Every being is on the path to manifesting their highest potential</li>
            <li>Meditating helps do that</li>
            <li>Meditating live in groups combines your vibrations and is the fastest way to reach your potential</li>
            <li>When you can’t meet in person connecting over internet is good too</li>
          </ul>
        </div>
        <div className="D">
            <img src={Jeremy} alt="individual" width="80px" className="one"></img>
            <div className="two">
              <span className="name">Ayerton Jeremy Aquino 3rd</span> is the founder of the Namaslay movement.
              He's a 500 HR Certified Yoga teacher, but the breadth his
              spiritual wisdom is truly incalculable. Together with his
              community he hopes to change the vibration of the human race.
            </div>
            <img src={Shannon} alt="woman" width="80px" className="three"></img>
            <div className="four">
            <span className="name">Shannon</span> is the marketing and brand expert for Namaslay. She is a
              devoted meditator and has been practicing with the group since
              their start at Domino Park in Williamsburgh Brooklyn. She loves
              dogs and dairy-free pumpkin spice lattes.
            </div>
            <img src={Trent} alt="man" width="80px" className="five"></img>
            <div className="six">
            <span className="name">Trent</span> is the in house chef at Namaslay. He is an expert on vegan,
              gluten-free, cruelty-free cuisine. He traveled the world to learn
              everything he could about high vibrational food.
            </div>
        </div>
      </div>
      <div className="aboutFooter">
        "Yoga does not just change the way we see things, it transforms the
        person who sees."
        <br />- B.K.S. lyengar
      </div>
    </div>
  );
};

export default About;
