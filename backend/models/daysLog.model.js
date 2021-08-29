const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const daysLogSchema = new Schema(
    {
        user: {
            type: String,
            required: true,
        },
        totalCalories: {
            type: Number,
            required: true,
        },
        totalProtein: {
            type: Number,
            required: true,
        },
        totalFats: {
            type: Number,
            required: true,
        },
        totalCarbs: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const daysLog = mongoose.model("daysLog", daysLogSchema);

module.exports = daysLog;
