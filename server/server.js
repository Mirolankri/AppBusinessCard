const config = require('config');
const express = require('express');
const connectToDB = require('./db/dbService');
const app = express();
const chalk = require('chalk');
const router = require('./router/router');
const cors = require('./middlewares/cors');
const logger = require('./logger/loggerService');
const generateInitialCards = require('./initialData/initialDataService');

require('./utils/timeService');

app.use(cors);
app.use(logger);
app.use(express.json());
app.use(express.static('./public'));
app.use(router);

const PORT = config.get("PORT");
const ENV = config.get("NODE_ENV");

app.listen(PORT, async () => {
    console.log(chalk.yellowBright(`Listening on: http://localhost:${PORT}`));
    connectToDB(ENV);
    await generateInitialCards();
});
