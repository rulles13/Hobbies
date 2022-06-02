const axios = require('axios');
const params = {
  access_key: '',
  query: '36 rue de Mulhouse Liège',
  country: 'BE',
}

axios.get('https://api.positionstack.com/v1/forward', {params})
  .then(response => {
    console.log(response.data);
  }).catch(error => {
    console.log(error);
  });