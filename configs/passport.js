const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs'); // !!!
const passport = require('passport');

passport.serializeUser((loggedInUser, cb) => {
  cb(null, loggedInUser._id);
});

passport.deserializeUser((userIdFromSession, cb) => {
  User.findById(userIdFromSession, (err, userDocument) => {
    if (err) {
      cb(err);
      return;
    }
    cb(null, userDocument);
  }).populate('investorProfiles portefolio');
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: true
},
  (email, password, next) => {
    User.findOne({ email }, (err, foundUser) => {
      if (err) {
        return next(err);
      }

      if (!foundUser) {
        return next(null, false, { message: 'Incorrect email.' });

      }

      if (!bcrypt.compareSync(password, foundUser.password)) {
        return next(null, false, { message: 'Incorrect password.' });
      }

      next(null, foundUser);
    }).populate('investorProfiles portefolio');
  })
);
