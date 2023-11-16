const express = require('express');
const port = 3000;
const app = express();

const cors = require('cors');

// Enable CORS for a specific URL
const corsOptions = {
  origin: 'http://localhost:3001'
};

app.use(cors(corsOptions));



const cookieParser = require('cookie-parser');
const expSession = require('express-session');

const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');


const db = require('./config/mongoose');
const User = require('./models/user');
const mongostorre = require('connect-mongo');

app.use(express.urlencoded({ extended: true }));


app.use(expSession({
	name:'blaze',
	secret: 'boohahaha',
	saveUninitialized:false,
	resave:false,
	cookie: {
		maxAge: (1000*60*100)
	},
	store: mongostorre.create({
		client: db.client,
		dbName: 'byte_blaze'
	})
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use('/',require('./routes'));


app.listen(port, function(err){
	if(err){
		console.error(err);
	}
	console.log('server is running on port: ',port);
});
