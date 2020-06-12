const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');


//defines what my db tables/model willl look like
let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  userId: Number,
  username: String,
  url: String,
  privacy: Boolean
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (/* TODO */) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;