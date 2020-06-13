const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//github api request function
const helper = require('../helpers/github.js');

//import db functions
const db = require('../database/index.js');




const app = express();

app.use(cors());
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
      let usersFullRepos = result['data'];
      let allRepos = usersFullRepos.map(individualRepo => {
        let { id, name, private, html_url, owner} = individualRepo;
        let schemaObj = {
          repoId: id,
          userId: owner.id,
          username: owner.login,
          url: html_url,
          private: private
        }
        return schemaObj;
      })
      //console.log(allRepos);

      return allRepos;
    })
    .then(allRepos =>{
      db.save(allRepos);
      //console.log("All Repos Saved to MongoDB.");

    })
    .then(response => {
      res.send(response)
    })
    .catch(err => console.log('err getting repos'))
  //return a list of repos for the users
  //store desired data in db using my created schema


});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos

  // on componentDidMount() look up top 25 repos in the "repos" collection
  // send an array to the data of the index components and pass as props to the list component

  db.Repo.find((err, data) => {
    if(err){
      res.sendStatus(404);
    }else{
      res.send(data)
    }
  }).limit(25).sort({"repoId" : 1});
  //
  // console.log(top25);
  // res.json(top25);


});



let port = process.env.PORT;

if (port == null || port == "") {
  port = 1128;
}


app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

// githbu personal access token
//9f28139a27fc0bddb02f1cafff915c1cda1de6e5

