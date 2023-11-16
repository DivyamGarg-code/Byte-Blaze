const mongoose = require('mongoose');

const roomschema = new mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	occupancy:{
		type: mongoose.Schema.Types.Object
	}
});


const Room = mongoose.model('Room',roomschema);
module.exports = Room;
