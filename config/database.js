const mongoose = require("mongoose");
const path = require("path");

const values = require(path.join(__dirname, "config.json"));

const dburi = values.database.uri;

// checks if mongoose is connected to the database
function isConnected(){
  return mongoose.connection.readyState == 1;
}

// connects mongoose to the database
function connect(){
  if (!isConnected()) {
    mongoose.connect(dburi, {
        useNewUrlParser : true
    });
    mongoose.Promise = global.Promise;
  }
}

connect();

module.exports.mongoose = mongoose;
