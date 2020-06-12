const express = require('express');
// const cors = require('cors');
const bodyParser = require('body-parser');
const Promise = require('bluebird');
const helper = require('../helpers/github.js');




const app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser());


app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  const searchTerm = req.body.username;
  console.log("Search Term: ", searchTerm)
  //send an axios request to the github api
  //i want to promisify this
  helper.getReposByUsername(searchTerm)
    .then(result => {
      let individualRepo = result['data'][0];
      let { id, name, private, html_url, owner} = individualRepo;
      let schemaObj = {
        repoId: id,
        userId: owner.id,
        username: owner.login,
        url: html_url,
        private: private
      }
      console.log(schemaObj);
      res.send(result[0])
    })
    .catch(err => console.log('err getting repos'))
  //return a list of repos for the users
  //store desired data in db using my created schema










});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

// githbu personal access token
//9f28139a27fc0bddb02f1cafff915c1cda1de6e5

