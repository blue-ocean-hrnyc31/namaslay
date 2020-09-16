import axios from 'axios';

function countPracticing() {
  return axios
    .get('http://34.229.137.235:4444/countPracticing')
    .then((response) => {
      return response.data;
    }).catch((err) => console.error(err));
}

export default countPracticing;
