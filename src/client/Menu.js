import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { logOut } from './apiHelpers';

const Menu = (props) => {
  let path = useLocation().pathname;
  const handleLogout = () => {
    logOut().then((login) => {
      if (!login) {
        props.setAuthTokens(false);
        document.cookie =
          'connect.sid' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      }
    });
  };

  if (path !== '/') {
    return (
      <div className='menu'>
        <Link to='/'>Home</Link>
        <Link to='/meditation-river'>Meditation River</Link>
        <Link to='/asana-river'>Asana River</Link>
        <Link to='/bulletinboard'>Upcoming Events</Link>
        <Link to='/leaderboard'>Leader Board</Link>
        <Link to='/about'>About</Link>
        {!props.authTokens && <Link to='/login'>Log In</Link>}
        {props.authTokens && (
          <a onClick={handleLogout} className='logout-btn'>
            Log Out
          </a>
        )}
      </div>
    );
  }
  return null;
};

export default Menu;
