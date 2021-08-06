const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const logSchema = new Schema(
    {
        /*
        username: {
            type: String,
            required: false,
        },
        */
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        name: {
            type: String,
            required: true,
        },
        calories: {
            type: Number,
            required: true,
        },
        protein: {
            type: Number,
            required: true,
        },
        mealType: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

const Log = mongoose.model("Log", logSchema);

module.exports = Log;
