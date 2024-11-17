const { signup, login ,findUserByEmail } = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');
const passport = require('passport');
const router = require('express').Router();
router.post('/login', login);
router.get('/naverlogin',
    passport.authenticate('naver'));
router.get('/naver/callback',
    passport.authenticate('naver', { failureRedirect: '/' }),
    function (req, res) {
        console.log('naver callback');
        // Successful authentication, redirect home.
        res.redirect('/');
    });
router.post('/signup', signup);
router.post("/find-email", findUserByEmail);
module.exports = router;