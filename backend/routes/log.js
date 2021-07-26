const router = require("express").Router();
let Log = require("../models/log.model");

router.route("/").get((req, res) => {
    Log.find()
        .then((logs) => res.json(logs))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
    //const username = req.body.username;
    const name = req.body.name;
    const calories = Number(req.body.calories);
    const protein = Number(req.body.protein);
    const mealType = req.body.mealType;
    //const date = Date.parse(req.body.date);

    const newLog = new Log({
        //username,
        name,
        calories,
        protein,
        mealType,
        //date,
    });

    newLog
        .save()
        .then(() => res.json("Log added"))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
    Log.findById(req.params.id)
        .then((log) => res.json(log))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
    Log.findByIdAndDelete(req.params.id)
        .then(() => res.json("Log deleted"))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
    Log.findById(req.params.id).then((log) => {
        //log.username = req.body.username;
        log.name = req.body.name;
        log.calories = Number(req.body.calories);
        log.protein = Number(req.body.protein);
        log.mealType = req.body.mealType;
        //log.date = Date.parse(req.body.date);

        log.save()
            .then(() => res.json("Log updated"))
            .catch((err) => res.status(400).json("Error: " + err));
    });
});

module.exports = router;
