/* 
TODO: add update and delete routes
*/
const router = require("express").Router();
let User = require("../models/user.model");

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

// Signup user (post request)
router.route("/signup").post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // TODO: Add reg express tests for username and password
    if (username == "" || password == "") {
        res.json({
            status: "FAILED",
            message: "Empty input fields",
        });
    } else {
        // Checking if user already exists
        User.find({ username })
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
                                username,
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
                                            "Error occured while saving user",
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
    const newUser = new User({ username, password });
    newUser
        .save()
        .then(() => res.json("User added"))
        .catch((err) => res.status(400).json("Error: " + err));
    */
});

module.exports = router;
