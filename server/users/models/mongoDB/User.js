const mongoose = require('mongoose');
const imageSchema = require('./Image');
const addressSchema = require('./Address');
const nameSchema = require('./Name');

const UserSchema = mongoose.Schema({
    name: nameSchema,
    phone: {
        type: String,
        match: RegExp(/^[0][5][0|2|3|4|5|8|9]{1}[-]{0,1}[0-9]{7}$/g)
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true,
        match: RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
    },
    password: {
        type: String,
        match: RegExp(/((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/)
    },
    image: imageSchema,
    address: addressSchema,
    isAdmin: {
        type: Boolean,
        default: false
    },
    isBusiness: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model("user", UserSchema);
