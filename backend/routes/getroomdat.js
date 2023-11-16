const passport = require('passport');
const express = require('express');
const router = express.Router();

const getroomdat_controller = require('../api_controllers/getroomdat_controller');


router.get('/roomd',getroomdat_controller.getroomdat);
// router.get('/getsupportcarddata',passport.checkAuthentication,hangarcontroller.getsupport);


module.exports = router;