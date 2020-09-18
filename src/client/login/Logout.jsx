import React from 'react';
import { logOut } from '../apiHelpers';
import '../stylesheets/loginSignup.scss';
const host = "34.229.137.235:4444";
const user = JSON.parse(window.localStorage.getItem("user"));

const Logout = ({ setAuthTokens }) => {
  const handleLogout = () => {
    logOut().then((login) => {
      if (!login) {
        setAuthTokens(false);
        handleUserExit();
        document.cookie =
          'connect.sid' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      }

    });
  };

  const updateCurrentRiver = (current) => {
    return axios
    .put(`http://${host}/${current}-river/user/${user.user_id}`, {
      current_river: null,
      current_activity: null,
    })
    .then(() => {
     console.log('Updated!')
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const handleUserExit = () => {
    const river1= 'asana'
    const river2='meditation'
    updateCurrentRiver('asana')
    updateCurrentRiver('meditation')
  };

  return <button onClick={handleLogout}>Log Out</button>;
};

export default Logout;
