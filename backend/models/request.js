const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
	title:{
		type:String,
		required:true
	},
	description:{
		type: String,
		required:true
	},
	reqby:{
		type:String,
		required:true
	},
	timefrom:{
		type:Number
	},
	timeto:{
		type:Number
	},
	date:{
		type:String
	}
});

const Request = mongoose.model('Request',requestchema);
module.exports = Request;
