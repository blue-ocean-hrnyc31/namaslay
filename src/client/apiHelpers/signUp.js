import axios from 'axios';

function signUp(firstName, lastName, username, password, email, handleLog) {
  return axios
    .post('/signUp', {
      firstName,
      lastName,
      username,
      password,
      email,
    })
    .then(({ data }) => {
      console.log('response:', data);
      if (data.hasOwnProperty('error')) {
        console.log('error:', data.error);
        return data.error;
      } else {
        console.log('successfully posted login credentials');
        handleLog(true);
      }
    })
    .catch((err) => {
      console.log('error posting login credentials:', err);
    });
}

export default signUp;
