const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');
const passport = require('passport');


router.get('/profile/:id', passport.checkAuthentication,usersController.profile);
router.get('/signIn', usersController.signIn);
router.get('/signUp', usersController.signUp);
router.post('/create', usersController.create);
router.post('/create_session', passport.authenticate(
    'local',
    {failureRedirect:'/users/signIn'}
), usersController.create_session);
router.get('/logout', usersController.destroy_session);
router.post('/update/:id', passport.checkAuthentication,usersController.update);
module.exports = router;