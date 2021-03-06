const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const logSchema = new Schema(
    {
        user: {
            type: String,
            required: true,
            /*
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            */
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
        fats: {
            type: Number,
            required: true,
        },
        carbs: {
            type: Number,
            required: true,
        },
        mealType: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const Log = mongoose.model("Log", logSchema);

module.exports = Log;
