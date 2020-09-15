import axios from 'axios';

function logOut() {
  return axios
    .post('http://localhost:3000/logout')
    .then(({ data }) => {
      // console.log('logout data:', data);
      return data.login;
    })
    .catch((err) => {
      throw err;
    });
}

export default logOut;
