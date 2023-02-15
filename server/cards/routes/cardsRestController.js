require('dotenv').config();
const express = require('express');
const { handleError } = require('../../utils/errorHandler');
const normalizeCard = require('../helpers/normalizeCard');
const { getCards, getCard, createCard, deleteCard, updateCard, likeCard, getMyCards, getMyLikesCards, updateBizNumber } = require('../models/cardsAccessDataService');
const validateCard = require('../validations/cardValidationService');
const router = express.Router();
const auth = require('../../auth/authService');

router.get('/', async (req, res) => {
    try {
        const cards = await getCards();
        return res.send(cards);
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});

router.get('/my-cards', auth, async (req, res) => {
    const user = req.user;
    try {
        if(!user.isBusiness) throw new Error('You are not Business');
        
        const card = await getMyCards(user._id);
        return res.send(card);
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});

router.get('/my-likes', auth, async (req, res) => {
    const user = req.user;
    try {
        const card = await getMyLikesCards(user._id);
        return res.send(card);
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const card = await getCard(id);
        return res.send(card);
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});

router.post('/', auth, async (req, res) => {
    try {
        const user = req.user
        if(!user.isBusiness) throw new Error('You are not a business account');

        let card = req.body;
        const { error } = validateCard(card);
        if (error) return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

        card = await normalizeCard(card, user._id);
        card = await createCard(card);
        return res.status(201).send(card);
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});

router.delete('/:id', auth, async (req, res) => {
    const id = req.params.id;
    const authUser = req.user;

    try {
        const card = await deleteCard(id, authUser);
        return res.send(card);
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        let card = req.body;
        const cardId = req.params.id;
        const authUser = req.user;

        if(!authUser.isBusiness) throw new Error('You are not Business User!');
    
        const { error } = validateCard(card);
        if (error)
          return handleError(res, 400, `Joi Error: ${error.details[0].message}`);
    
        card = await normalizeCard(card, authUser._id);
        card = await updateCard(cardId, card, authUser._id);
        return res.send(card);
      } catch (error) {
        return handleError(res, error.status || 500, error.message);
      }
});

router.patch('/update-biz-number/:id', auth, async (req, res) => {
    try {
        const id = req.params.id;
        const bizNumber = req.body.bizNumber;
        
        if(!req.user.isAdmin) throw new Error('You are not Authorized');

        const card = await updateBizNumber(id, bizNumber);
        return res.send(card);
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});

router.patch('/:id', auth, async (req, res) => {
    const id = req.params.id;
    const userId = req.user._id;
    try {
        const card = await likeCard(id, userId);
        return res.send(card);
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});

module.exports = router;