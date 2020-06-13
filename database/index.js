const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {useNewUrlParse: true});

mongoose.connection.once('open', function(){
  console.log('Database Connected')
});
mongoose.connection.on('error', console.error.bind(console, 'connection error:' ));

//defines what my db tables/model willl look like
//SCHEMA
let repoSchema = mongoose.Schema({
  repoId: {
    type: Number,
    required: true,
    },
  userId: Number,
  username: String,
  url: String,
  private: Boolean
}, {collection: 'allRepos'});

let Repo = mongoose.model('Repo', repoSchema);

let  save = (usersRepos) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  usersRepos.forEach(repository => {
    console.log(repository)
    //constructs new document from Model
    let newAddition = new Repo(repository);

    //saved document to the DB
    newAddition.save((err, newAddition) => {
      err ? console.log('Could Not Save Repo too DB') : console.log(`Saved Repo #${newAddition.repoId} to DB.`)
    });
  })

}

module.exports.save = save;
module.exports.Repo = Repo;