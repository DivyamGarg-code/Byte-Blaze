const express = require('express');
const router = express.Router();
const passport = require('passport');


router.use('/getroomdat',require('./getroomdat'));
router.use('/user',require('./user'));	
// router.use('/get_apis', require('./get_apis'));	

console.log("router is working");

module.exports = router;