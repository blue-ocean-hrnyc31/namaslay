import React from "react";
import { logOut } from "../apiHelpers";
import "../stylesheets/loginSignup.scss";

const Logout = ({ setAuthTokens }) => {
  const handleLogout = () => {
    logOut().then((login) => {
      if (!login) {
        setAuthTokens(false);
        document.cookie =
          "connect.sid" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      }
    });
  };

  return <button onClick={handleLogout}>Log Out</button>;
};

export default Logout;
