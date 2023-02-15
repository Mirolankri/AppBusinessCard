const config= require('config');
const DB = config.get("DB");
const mongoose = require('mongoose');
const CardSchema = require('./mongoDB/Cards');

const getCards = async () => {
    if(DB === 'mongoDB'){
        try {
            const getCards = mongoose.model('card', CardSchema);
            const cards = await getCards.find();
            return Promise.resolve(cards);
        } catch (error) {
            error.status = 404;
            return Promise.reject(error);
        }
    }

    return Promise.resolve('Not in mongoDB');
};

const getCard = async (id) => {
    if(DB === 'mongoDB'){
        try {
            const getCard = mongoose.model('card', CardSchema);
            let card = await getCard.findById(id);
            if (!card) throw new Error('Could not fint this id in DataBase');
            return Promise.resolve(card);
        } catch (error) {
            error.status = 404;
            return Promise.reject(error);
        }
    }

    return Promise.resolve('Not in mongoDB');
};

const createCard = async (normalizeCard) => {
    if(DB === 'mongoDB'){
        try {
            const createCard = mongoose.model('card', CardSchema);
            const card = new createCard(normalizeCard);
            await card.save();
            return Promise.resolve(card);
        } catch (error) {
            error.status = 400;
            return Promise.reject(error);
        }
    }

    return Promise.resolve('Not in mongoDB');
};

const deleteCard = async (_id, authUser) => {
    if(DB === 'mongoDB'){
        try {
            const deleteCard = mongoose.model('card', CardSchema);
            let card = await deleteCard.findById(_id, {user_id: 1});
            if (!card) throw new Error(`Could not find this card id - ${_id}`);

            if((authUser._id != card.user_id) && !authUser.isAdmin) throw new Error('You are not Authorized');

            card = await deleteCard.findByIdAndDelete(_id);
            return Promise.resolve(card);
        } catch (error) {
            error.status = 404;
            return Promise.reject(error);
        }
    }

    return Promise.resolve('Not in mongoDB');
};

const updateCard = async (_id, normalizeCard, authUser) => {
    if(DB === 'mongoDB'){
        try {
            const updateCard = mongoose.model('card', CardSchema);
            let card = await updateCard.findById(_id, {user_id: 1});
            if (!card) throw new Error(`Could not find this id - ${_id}`);

            if(authUser != card.user_id) throw new Error('You are not Authorized');

            card = await updateCard.findByIdAndUpdate(_id, normalizeCard, {new: true});

            return Promise.resolve(card);
        } catch (error) {
            error.status = 404;
            return Promise.reject(error);
        }
    }

    return Promise.resolve('Not in mongoDB');
};

const likeCard = async (_id_card, _id_user) => {
    if(DB === 'mongoDB'){
        try {
            const likeCard = mongoose.model('card', CardSchema);
            let card = await likeCard.findById(_id_card);

            if (!card) throw new Error('Could not find this card ID');

            if(!card.likes.length) {
                card.likes.push(_id_user);
                card = await likeCard.findByIdAndUpdate(card._id, {likes: card.likes},{new: true});
                return Promise.resolve(card);
            }

            const index = card.likes.findIndex(id => id === _id_user);
            if (index === -1) {
                card.likes.push(_id_user);
                card = await likeCard.findByIdAndUpdate(card._id, {likes: card.likes},{new: true});
                return Promise.resolve(card);
            }

            card.likes.pop(index);
            card = await likeCard.findByIdAndUpdate(card._id, {likes: card.likes},{new: true});
            return Promise.resolve(card);

        } catch (error) {
            error.status = 404;
            return Promise.reject(error);
        }
    }

    return Promise.resolve('Not in mongoDB');
};

const getMyCards = async (userId) => {
    if(DB === 'mongoDB'){
        try {
            const getCard = mongoose.model('card', CardSchema);
            let card = await getCard.find({user_id: userId});
            if (!card) card = 'Could not fint this id in DataBase';
            return Promise.resolve(card);
        } catch (error) {
            error.status = 404;
            return Promise.reject(error);
        }
    }

    return Promise.resolve('Not in mongoDB');
}

const getMyLikesCards = async (userId) => {
    if(DB === 'mongoDB'){
        try {
            const getCard = mongoose.model('card', CardSchema);
            const userLikes = await getCard.find({likes: {"$in": [userId]}});
            return Promise.resolve(userLikes);
        } catch (error) {
            error.status = 404;
            return Promise.reject(error);
        }
    }
}

const updateBizNumber = async (id, bizNumber) => {
    if(DB === 'mongoDB'){
        try {
            const updateCard = mongoose.model('card', CardSchema);
            let bizCard = await updateCard.findOne({bizNumber: bizNumber});
            if(bizCard) throw new Error('This Biz Number is already exists');
            bizCard = await updateCard.findByIdAndUpdate(id, {bizNumber: bizNumber}, {new: true});
            return Promise.resolve(bizCard);
        } catch (error) {
            error.status = 404;
            return Promise.reject(error);
        }
    }
}

module.exports = { getCards, getCard, createCard, deleteCard, updateCard, likeCard, getMyCards, getMyLikesCards, updateBizNumber };