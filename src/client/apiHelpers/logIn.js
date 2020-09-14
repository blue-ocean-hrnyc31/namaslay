import axios from 'axios';

function logIn(username, password) {
  return axios
    .post('/login', {
      username,
      password,
    })
    .then((response) => {
      console.log('post /login response:', response);
      if (response.status === 200) {
        console.log('post /login response:', response);
        return response.status;
      }
    });
}

export default logIn;
