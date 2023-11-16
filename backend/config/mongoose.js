const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/byte_blaze', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// establishes the connection to the mongodb databbase and creates a new db by the name of user if not present
const db = mongoose.connection;
// creates a new instance of the connection and assigns the instance to the variable db
db.on('error',console.error.bind(console, 'error in connection'));

db.once('open',function(){
	console.log('successfully connected to the database');
});

module.exports = db;