const chalk = require('chalk');
const normalizeCard = require('../cards/helpers/normalizeCard');
const normalizeUser = require('../users/helpers/normalizeUser');
const { createCard } = require('../cards/models/cardsAccessDataService');
const { registerUser } = require('../users/models/usersAccessDataService');
const { generateUserPassword } = require('../users/helpers/bcrypt');
const data = require('./initialData.json');

const generateInitialCards = async () => {
    const { cards, users } = data;
    const userId = [];

    users.forEach(async (user) => {
        try {
            user = await normalizeUser(user);
            user.password = generateUserPassword(user.password);
            await registerUser(user);
            return;
        } catch (error) {
            return console.log(chalk.redBright(error.message));
        }
    });

    cards.forEach(async (card) => {
        try {
            const userId = "638503e4caa1f3d9dbbcf7bc";
            card = await normalizeCard(card, userId);
            await createCard(card);
            
            return;
        } catch (error) {
            return console.log(chalk.redBright(error.message));
        }
    });

}

module.exports = generateInitialCards;