const User = require('../models/user');
const Room = require('../models/room');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


module.exports.createreq = async function(req,res){
	try{
		let reqobj = req.body;
		console.log(reqobj);
	}catch(error){
		console.log(error);
	}
}