const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const logSchema = new Schema ({
    username: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    calories: {
        type: Number,
        required: true
    },
    protein: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
}, {
    timestamps: true,
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;
