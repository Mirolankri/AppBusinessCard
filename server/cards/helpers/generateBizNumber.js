const CardSchema = require('../models/mongoDB/Cards');
const mongoose = require('mongoose');
const lodash = require('lodash');
const handleBadRequest = require('../../utils/errorHandler');

const generateBizNumber = async () => {
    try{
        const random = lodash.random(1_000_000, 9_000_000);
        const findCard = mongoose.model('card', CardSchema);
        const card = await findCard.findOne({bizNumber: random}).select(['-_id','bizNumber']);
        if(!card) return random;
        generateBizNumber();
    } catch (error) {
        handleBadRequest("generateBizNumber", error);
    }
};

module.exports = generateBizNumber;