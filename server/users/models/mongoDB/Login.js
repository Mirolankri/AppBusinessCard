const mongoose = require('mongoose');

const LoginUserSchema = mongoose.Schema({
    userId:{
        type: mongoose.Types.ObjectId
    },
    counter: [Date]
});

module.exports = mongoose.model("user_login", LoginUserSchema);