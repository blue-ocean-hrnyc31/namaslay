import axios from 'axios';

function logIn(username, password, handleLog) {
  axios
    .post('/login', {
      username,
      password,
    })
    .then((response) => {
      console.log('successfully posted login credentials');
      handleLog(true);
    })
    .catch((err) => {
      console.log('error posting login credentials:', err);
    });
}

export default logIn;
