const user = require('../models/user');
const room = require('../models/room');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


module.exports.getroomdat = async function(req,res){
	let roomname = req.query.name;
	let roomdate = req.query.date;
	const room = await room.find({name:name});
	let resobj = {};
	for(let key in room.occupancies){

	}
	return res.status(200).json({
		data:{
			room
		}
	});
}