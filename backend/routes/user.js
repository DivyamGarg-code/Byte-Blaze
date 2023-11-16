const passport = require('passport');
const express = require('express');
const router = express.Router();

const user_controller = require('../api_controllers/user_controller');


router.post('/createuser', user_controller.createnewuser);
router.post('/sessioncreate',passport.authenticate(
	'local',
	{failureRedirect: '/'},
	),
	user_controller.createnewsession
);

router.post('/dessess', user_controller.destroysession);


// router.get('/getsupportcarddata',passport.checkAuthentication,hangarcontroller.getsupport);


module.exports = router;