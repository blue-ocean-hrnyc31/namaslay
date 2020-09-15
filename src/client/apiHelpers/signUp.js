import axios from 'axios';

function signUp(firstName, lastName, username, password, email, handleLog) {
  return axios
    .post('http://localhost:3000/signUp', {
      firstName,
      lastName,
      username,
      password,
      email,
    })
    .then((response) => {
      console.log('post /signup response:', response);
      if (response.status === 201) {
        console.log('successfully signed up');
      }
      return response.status;
    });
}

export default signUp;
