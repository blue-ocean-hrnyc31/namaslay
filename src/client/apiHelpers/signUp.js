import axios from 'axios';

function signUp(
  firstName,
  lastName,
  username,
  password,
  email,
  location,
  travels,
  certification,
  handleLog
) {
  return axios
    .post('/signUp', {
      firstName,
      lastName,
      username,
      password,
      email,
      location,
      travels,
      certification,
    })
    .then((response) => {
      // console.log('post /signup response:', response);
      if (response.status === 201) {
        // console.log('successfully signed up');
      }
      return response;
    });
}

export default signUp;
