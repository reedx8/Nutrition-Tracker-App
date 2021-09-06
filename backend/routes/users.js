/* 
route is '/users/signup', '/users/signin', etc...
TODO: add update and delete routes
*/
const router = require("express").Router();
let User = require("../models/user.model");
const mongoose = require("mongoose");
const passport = require("passport");
require("../passportConfig")(passport);

// Pasword handler
const bcrypt = require("bcrypt");

// get request
// 1st route/endpoint that handles incoming http get requests on the /users url path
router.route("/").get((req, res) => {
    // find() is a mongoose method, list of all the users from the mongodb database
    User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/getUser").get((req, res) => {
    res.json(req.user);
});

// Signup user (post request)
router.route("/signup").post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const ID = req.body.ID;

    // TODO: Add reg express tests for email and password
    if (email == "" || password == "") {
        res.json({
            status: "FAILED",
            message: "Empty input fields",
        });
    } else {
        // Checking if user already exists
        User.find({ email })
            .then((result) => {
                if (result.length) {
                    // user already exists
                    res.json({
                        status: "FAILED",
                        message: "User already exists",
                    });
                } else {
                    // Try to add user
                    // password handling
                    const saltRounds = 10;
                    bcrypt
                        .hash(password, saltRounds)
                        .then((hashedPassword) => {
                            const newUser = new User({
                                //_id: new mongoose.Types.ObjectId(),
                                _id: ID,
                                email,
                                password: hashedPassword,
                            });

                            newUser
                                .save()
                                .then((result) => {
                                    res.json({
                                        status: "SUCCESS",
                                        message: "Signup succesfull",
                                        data: result,
                                    });
                                })
                                .catch((error) => {
                                    res.json({
                                        status: "FAILED",
                                        message:
                                            "Error occured while saving user: " +
                                            error,
                                    });
                                });
                        })
                        .catch((error) => {
                            res.json({
                                status: "FAILED",
                                message: "Error occured while hashing password",
                            });
                        });
                }
            })
            .catch((error) => {
                console.log(err);
                res.json({
                    status: "FAILED",
                    message: "Error occured when checked for existing user",
                });
            });
    }

    /*
    const newUser = new User({ email, password });
    newUser
        .save()
        .then(() => res.json("User added"))
        .catch((err) => res.status(400).json("Error: " + err));
    */
});

//signin user
router.route("/signin").post((req, res, next) => {
    // TODO: Add reg express tests for email and password
    /* 
    passport.authenticate sends the req.body.email and password 
    to passportConfig.js's passport.use()..
    */
    passport.authenticate("local", (error, user, info) => {
        if (error) {
            res.json({
                status: "FAILED",
                message: error,
            });
        }
        if (!user) {
            res.json({
                status: "FAILED",
                message: "No user exists -> " + user,
            });
        } else {
            req.logIn(user, (error) => {
                if (error) console.log("ERROR: " + error);
                console.log("Succesfully authenticated");

                // sending user data back to caller in the front end (axious.post() in Signin.js)..
                res.json(req.user);
            });
        }
    })(req, res, next);

    // Logging in user without passportjs..
    /*
    const email = req.body.email;
    const password = req.body.password;
    if (email == "" || password == "") {
        res.json({
            status: "FAILED",
            message: "Empty credentials supplied",
        });
    } else {
        User.find({ email })
            .then((data) => {
                if (data.length) {
                    //user exists
                    const hashedPassword = data[0].password;
                    bcrypt
                        .compare(password, hashedPassword)
                        .then((result) => {
                            if (result) {
                                //password matched
                                res.json({
                                    status: "SUCCESS",
                                    message: "Signin successfull",
                                    data: data,
                                });
                            } else {
                                res.json({
                                    status: "FAILED",
                                    message: "Invalid password entered",
                                });
                            }
                        })
                        .catch((error) => {
                            res.json({
                                status: "FAILED",
                                message:
                                    "An error occured while comparing passwords",
                            });
                        });
                } else {
                    res.json({
                        status: "FAILED",
                        message: "Invalid credentials entered",
                    });
                }
            })
            .catch((error) => {
                res.json({
                    status: "FAILED",
                    message:
                        "An error occured while checking for existing user",
                });
            });
    }
    */
});

router.route("/addGoals").post((req, res) => {
    User.updateOne(
        {
            _id: req.body.user,
        },
        {
            $set: {
                "goals.calories": req.body.calorieGoal,
                "goals.protein": req.body.proteinGoal,
                "goals.fat": req.body.fatGoal,
                "goals.carbs": req.body.carbsGoal,
            },
        }
    )
        .then(() => res.json("User's nutrition goals added"))
        .catch((error) => res.status(400).json("routes/users.js:" + error));
});

module.exports = router;
