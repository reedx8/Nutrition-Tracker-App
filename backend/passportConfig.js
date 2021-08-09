let User = require("./models/user.model");
const bcrypt = require("bcrypt");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
    passport.use(
        new localStrategy(
            {
                usernameField: "email",
                passwordField: "password",
            },
            function (email, password, done) {
                User.findOne({ email: email }, (error, user) => {
                    if (error) {
                        throw error;
                    }
                    if (!user) {
                        return done(null, false);
                    }
                    bcrypt.compare(password, user.password, (error, result) => {
                        if (error) throw error;
                        if (result === true) {
                            return done(null, user);
                        } else {
                            return done(null, false);
                        }
                    });
                });
            }
        )
    );
    // Create cookie with the user id inside it
    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });
    // Takes cookie, decrypts it, returning a user
    passport.deserializeUser((id, cb) => {
        User.findOne({ _id: id }, (error, user) => {
            cb(error, user);
        });
    });
};
