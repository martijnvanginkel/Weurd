const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
    langOne: {
        type: String
    },
    langTwo: {
        type: String
    }
});

module.exports = mongoose.model('Word', wordSchema);