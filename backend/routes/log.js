const router = require("express").Router();
let Log = require("../models/log.model");

router.route("/").get((req, res) => {
    Log.find()
        .then((logs) => res.json(logs))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
    const username = req.body.username;
    const name = req.body.name;
    const calories = Number(req.body.calories);
    const protein = Number(req.body.protein);
    const date = Date.parse(req.body.date);

    const newLog = new Log({
        username,
        name,
        calories,
        protein,
        date,
    });

    newLog
        .save()
        .then(() => res.json("Log added"))
        .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
