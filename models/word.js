const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
    langOne: {
        type: String,
        required: true
    },
    langTwo: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Word', wordSchema);