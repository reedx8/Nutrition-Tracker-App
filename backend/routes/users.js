/* 
TODO: add update and delete routes
*/
const router = require("express").Router();
let User = require("../models/user.model");

// get request
// 1st route/endpoint that handles incoming http get requests on the /users url path
router.route("/").get((req, res) => {
    // find() is a mongoose method, list of all the users from the mongodb database
    User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(400).json("Error: " + err));
});

// post request
router.route("/add").post((req, res) => {
    const username = req.body.username;

    const newUser = new User({ username });
    newUser
        .save()
        .then(() => res.json("User added"))
        .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
