const User = require('../models/user');
const Room = require('../models/room');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


module.exports.getroomdat = async function(req,res){
	try{
		console.log('api hit');
		// let roomname = req.query.name;
		// let roomdate = req.query.date;
		const rooms = await Room.find();
		const date = new Date();
		let day = date.getDate();
		let month = date.getMonth() + 1;
		let year = date.getFullYear();
		let currentDate = `${day}-${month}-${year}`;

		let resobj = {};

		for(let i=0; i<rooms.length; i++){
			let missing = 0;
			for(let date in rooms[i].occupancy){
				missing++;
				for(let key in rooms[i].occupancy){
					let keyday = key[0];
					if(key[1] != '-'){
						keyday+=key[1];
					}
					if(keyday < day){
						console.log('deleting an old date');
						missing--;
						delete rooms[i].occupancy[key];
					}
					// console.log(key);
				}
			}
			let curdate = date;
			while(4-missing>0){
				let nextdate = new Date(curdate);
				nextdate.setDate(curdate.getDate() + missing);
				let day = nextdate.getDate();
				let month = nextdate.getMonth() + 1;
				let year = nextdate.getFullYear();
				let newnextdate = `${day}-${month}-${year}`;
				rooms[i].occupancy[newnextdate] = 
				{
			      "9-10": {
			        "status": "free",
			        "occupant": "nil"
			      },
			      "10-11": {
			        "status": "free",
			        "occupant": "nil"
			      },
			      "11-12": {
			        "status": "free",
			        "occupant": "nil"
			      },
			      "12-1": {
			        "status": "free",
			        "occupant": "nil"
			      },
			      "1-2": {
			        "status": "free",
			        "occupant": "nil"
			      },
			      "2-3": {
			        "status": "free",
			        "occupant": "nil"
			      },
			      "3-4": {
			        "status": "free",
			        "occupant": "nil"
			      },
			      "4-5": {
			        "status": "free",
			        "occupant": "nil"
			      }
	    		};
	    		missing++;
			}
		}
		for(let date in rooms[0].occupancy){
			resobj[date] = {};
		}
		for(let i=0; i<rooms.length; i++){
			for(let date in rooms[i].occupancy){
				let name = rooms[i].name;
				resobj[date][name]= rooms[i].occupancy[date];
			}	
		}
		console.log(resobj["17-11-2023"]);
		for(let i=0; i<rooms.length; i++){
			await Room.findByIdAndUpdate(rooms[i].id, rooms[i]);

		}
		return res.status(200).json({
				resobj
		});
	}catch(error){
		console.log(error);
	}
	
}