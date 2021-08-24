const router = require("express").Router();
let daysLog = require("../models/daysLog.model");
const startOfDay = require("date-fns/startOfDay");
const endOfDay = require("date-fns/endOfDay");

router.route("/").get((req, res) => {
    daysLog
        .find()
        .then((log) => res.json(log))
        .catch((error) => res.status(400).json("Error: " + error));
});

// Adding to an existing daysLog, or creates new daysLog
router.route("/update").post((req, res) => {
    daysLog
        .updateOne(
            {
                user: req.body.user,
                createdAt: {
                    $gte: startOfDay(new Date()),
                    $lte: endOfDay(new Date()),
                },
            },
            {
                $inc: {
                    // Increments both fields if daysLog exists
                    totalCalories: req.body.calories,
                    totalProtein: req.body.protein,
                },
                $set: {
                    user: req.body.user, // in case no daysLog exists
                },
            },
            {
                upsert: true, // Creates new daysLog if none exists
            }
        )
        .then(() => res.json("Day's log updated/added"))
        .catch((error) =>
            res.status(400).json("ERROR (daysLog/update): " + error)
        );

    /*
    daysLog.findOneAndUpdate();
    */
});

// getting the user's existing daysLog for todays date (DELETE)
router.route("/getLog/:userID").get((req, res) => {
    daysLog
        .find({
            user: req.params.userID,
            createdAt: {
                $gte: startOfDay(new Date()),
                $lte: endOfDay(new Date()),
            },
        })
        .then((log) => res.json(log))
        .catch((error) =>
            res.status(400).json("Error (dayLog/GET) -> " + error)
        );
});

// adding a nonexisting daysLog (DELETE)
router.route("/add").post((req, res) => {
    const newDaysLog = new daysLog({
        user: req.body.user,
        totalCalories: req.body.calories,
        totalProtein: req.body.protein,
    });

    newDaysLog
        .save()
        .then(() => res.json("Day's log added"))
        .catch((error) =>
            res.status(400).json("Error (daysLog/POST) -> " + error)
        );
});

module.exports = router;
