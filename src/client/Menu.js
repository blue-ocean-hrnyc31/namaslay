<<<<<<< HEAD
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Menu = (props) => {
  let location = useLocation();
  if (location.pathname !== '/') {
    return (
      <div className="menu">
        <Link to="/">Home</Link>
        <Link to="/meditation-river">Meditation River</Link>
        <Link to="/asana-river">Asana River</Link>
        <Link to="/bulletinboard">Upcoming Events</Link>
        <Link to="/leaderboard">Leader Board</Link>
        <Link to="/about">About</Link>
        {(!props.authTokens || props.authTokens === "undefined") && (
          <Link to="/login">Log In</Link>
        )}
        {(!props.authTokens || props.authTokens === "undefined") && (
          <Link to="/signup">Sign Up</Link>
        )}
        {props.authTokens && props.authTokens !== "undefined" && (
          <Link to="/logout">Log Out</Link>
        )}
      </div>
    );
  } else {
    return null;
  }
};
=======
import React from 'react';
import { Link } from 'react-router-dom';

const Menu = (props) => (
  <div className='menu'>
    <Link to='/'>Home</Link>
    <Link to='/meditation-river'>Meditation River</Link>
    <Link to='/asana-river'>Asana River</Link>
    <Link to='/bulletinboard'>Upcoming Events</Link>
    <Link to='/leaderboard'>Leader Board</Link>
    <Link to='/about'>About</Link>
    {(!props.authTokens || props.authTokens === 'undefined') && (
      <Link to='/login'>Log In</Link>
    )}
    {props.authTokens && props.authTokens !== 'undefined' && (
      <Link to='/logout'>Log Out</Link>
    )}
  </div>
);
>>>>>>> master

export default Menu;
