import axios from 'axios';

function signUp(firstName, lastName, username, password, email) {
  return axios
    .post('/signUp', {
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
