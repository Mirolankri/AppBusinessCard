const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    url: {
        type: String,
        match: RegExp(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/g)
    },
    alt: {
        type: String,
        trim: true,
        minLength: 2
    }
});

module.exports = imageSchema;