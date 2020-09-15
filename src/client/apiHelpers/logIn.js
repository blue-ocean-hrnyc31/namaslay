import axios from 'axios';

function logIn(username, password, handleUser) {
  return axios
    .post('http://localhost:3000/login', {
      username,
      password,
    })
    .then((response) => {
      // console.log('post /login response:', response);
      if (response.status === 200) {
        // console.log('post /login response:', response);
        handleUser(response.data);
        return response.status;
      }
    });
}

export default logIn;
