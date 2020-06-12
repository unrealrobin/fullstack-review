const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (username) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API
  // let options = {
  //   headers: {
  //     'User-Agent': 'request',
  //     'Authorization': `${config.TOKEN}`,
  //     'Accept': 'application/vnd.github.v3+json'
  //   }
  // };
   return axios.get(`https://api.github.com/users/${username}/repos`, {
      headers: {
        'User-Agent': 'request',
        'Authorization': `${config.TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      }
  });

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL


}

module.exports.getReposByUsername = getReposByUsername;