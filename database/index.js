const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost/fetcher', {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.once('open', function(){
  console.log('Database Connected')
});
mongoose.connection.on('error', console.error.bind(console, 'connection error:' ));

//heroku info
//un: robin
//pw: BrgKjhMgsRkfydDg



// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://robin:BrgKjhMgsRkfydDg@cluster0-5k4vt.mongodb.net/cloudFetcher?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });



//defines what my db tables/model willl look like
//SCHEMA
let repoSchema = mongoose.Schema({
  repoId: {
    type: Number,
    required: true,
    unique: true
    },
  userId: Number,
  username: String,
  url: {
    type: String,
    unique: true},
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