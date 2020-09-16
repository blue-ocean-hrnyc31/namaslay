import axios from 'axios';

function getUpcoming() {
  return axios
    .get('http://34.229.137.235:4444/events/upcoming')
    .then((response) => {
      return response.data;
    }).catch((err) => console.error(err));
}

export default getUpcoming;
