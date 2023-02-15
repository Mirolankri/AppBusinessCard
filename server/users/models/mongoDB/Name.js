const mongoose = require('mongoose');
const { DEFAULT_VALIDATORE } = require('../../helpers/mongooseValidator');

const NameSchema = mongoose.Schema({
    first: DEFAULT_VALIDATORE,
    middle: {
        type: String,
        maxLength: 256,
        trim: true,
        lowercase: true
    },
    last: DEFAULT_VALIDATORE
})

module.exports = NameSchema;