const passport = require('passport');

const localStrategy = require('passport-local').Strategy;

const User = require('../models/user');


passport.use(new localStrategy({
	usernameField: 'email'
	},
	async function(email,password, done){
		try{
			const user = await User.findOne({email:email});
			if(!user || user.password != password){
				console.log("wrong login");
				return done(null,false)
			}
			// user found
			else{
				return done(null,user);
			}
		}catch(error){
			console.error(error);
		}
	}
));



passport.serializeUser(function(user,done){
	done(null,user.id);
});

passport.deserializeUser( async function(id,done){
	try{
		const user = await User.findById(id);
		return done(null,user);
	}catch(error){
		console.error(error,'error');
		return done(error);
	}
});

passport.checkAuthentication = function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	return res.redirect('/');
}

passport.setAuthenticatedUser = function(req,res,next){
	if(req.isAuthenticated()){
		// req.session.useruserid = user.userid;
		res.locals.user = req.user;
	}
	return next();
}

module.exports = passport