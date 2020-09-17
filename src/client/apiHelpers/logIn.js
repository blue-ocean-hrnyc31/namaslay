import axios from 'axios';

function logIn(username, password, handleUser) {
  return axios
    .post('/login', {
      username,
      password,
    })
    .then((response) => {
      // console.log('post /login response:', response);
      if (response.status === 200) {
        // console.log('post /login response:', response);
        handleUser(response.data);
        const user = JSON.stringify(response.data);
        window.localStorage.setItem('user', user);
        return response.status;
      }
    });
}

export default logIn;
