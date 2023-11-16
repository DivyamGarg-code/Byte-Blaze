const User = require('../models/user');
const Room = require('../models/room');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


module.exports.getroomdat = async function(req,res){
	console.log('api hit');
	// let roomname = req.query.name;
	// let roomdate = req.query.date;
	const room = await Room.find();
	let resobj = {};
	// console.log(room[0]);
	for(let key in room[0].occupancy){
		console.log(key);
	}
	return res.status(200).json({
		data:{
			room
		}
	});
}