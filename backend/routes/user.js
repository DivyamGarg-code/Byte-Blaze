const passport = require('passport');
const express = require('express');
const router = express.Router();

const user_controller = require('../api_controllers/user_controller');
console.log("user router hit");

router.get('/debug', user_controller.debug);

router.post('/signup', user_controller.createnewuser);
// router.post('/login',passport.authenticate(
// 	'local',
// 	),
// 	user_controller.createnewsession
// );

// router.post('/dessess', user_controller.destroysession);


// router.get('/getsupportcarddata',passport.checkAuthentication,hangarcontroller.getsupport);


module.exports = router;