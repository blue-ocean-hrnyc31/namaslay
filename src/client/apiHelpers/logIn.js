import axios from 'axios';

function logIn(username, password) {
  axios
    .post('/login', {
      username,
      password,
    })
    .then((response) => {
      console.log('successfully posted login credentials');
    })
    .catch((err) => {
      console.log('error posting login credentials:', err);
    });
}

export default logIn;
