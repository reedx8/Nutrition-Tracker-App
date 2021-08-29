const router = require("express").Router();
let Log = require("../models/log.model");
const startOfDay = require("date-fns/startOfDay");
const endOfDay = require("date-fns/endOfDay");

router.route("/").get((req, res) => {
    Log.find()
        .then((logs) => res.json(logs))
        .catch((err) => res.status(400).json("Error (routes/log.js): " + err));
});

// Logs nutrition entry
router.route("/add").post((req, res) => {
    // catches data called req sent through the axios POST request..
    const name = req.body.name;
    const calories = Number(req.body.calories);
    const protein = Number(req.body.protein);
    const fats = Number(req.body.fats);
    const carbs = Number(req.body.carbs);
    const mealType = req.body.mealType;
    const user = req.body.user;

    const newLog = new Log({
        user,
        name,
        calories,
        protein,
        fats,
        carbs,
        mealType,
        //date,
    });
    //newLog.user = req.user.id;
    console.log("NEWLOG:");
    console.log(newLog);

    // saves Log data to mongodb
    newLog
        .save()
        .then(() => res.json("Log added"))
        .catch((err) => res.status(400).json("Error (routes/log.js): " + err));
});
/*
router.route("/:user").get(async (req, res) => {
    const logs = await Log.find({ user: req.params.user });
    const totalCalos = logs.reduce((total, log) => total + log.calories, 0);
    res.json({ totalCalos });
});
*/

/*
router.route("getTotalCals/:user").get(async (req, res) => {
    const logs = await Log.find({ user: req.params.user });
    res.json({ logs });
});
*/

// Gets user-specific nutrition data, for todays date
router.route("/:userID").get((req, res) => {
    Log.find({
        user: req.params.userID,
        createdAt: { $gte: startOfDay(new Date()), $lte: endOfDay(new Date()) },
    })
        .then((logs) => res.json(logs))
        .catch((error) =>
            res.status(400).json("Error (routes/log.js): " + error)
        );
});

/*
router.route("/:id").get((req, res) => {
    Log.findById(req.params.id)
        .then((log) => res.json(log))
        .catch((err) => res.status(400).json("Error: " + err));
});
*/

router.route("/:id").delete((req, res) => {
    Log.findByIdAndDelete(req.params.id)
        .then(() => res.json("Log deleted"))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
    Log.findById(req.params.id).then((log) => {
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
