const express = require('express');
const router = express.Router();
const passport = require('passport');



// const homeController = require('../controllers/homecontroller');

// router.get('/',homeController.home);

// router.post('/createuser', homeController.createnewuser);
// router.post('/sessioncreate',passport.authenticate(
// 	'local',
// 	{failureRedirect: '/'},
// 	),
// 	homeController.createnewsession
// );

// router.post('/dessess', homeController.destroysession);


router.use('/getroomdat',require('./getroomdat'));
router.use('/user',require('./user'));
// router.use('/get_apis', require('./get_apis'));

console.log("router is working");

module.exports = router;