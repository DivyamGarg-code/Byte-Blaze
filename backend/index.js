const express = require('express');
const port = 3000;
const app = express();


const cookieParser = require('cookie-parser');
const expSession = require('express-session');


const db = require('./config/mongoose');
const User = require('./models/user');
const mongostorre = require('connect-mongo');

app.use(express.urlencoded({ extended: true }));

const passport = require('passport');

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
app.use('/',require('./backend/routes'));


app.listen(port, function(err){
	if(err){
		console.error(err);
	}
	console.log('server is running on port: ',port);
});
