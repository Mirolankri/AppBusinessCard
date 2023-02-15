const express = require('express');
const app = express();
const morganLogger = require('./loggers/morganLogger');
const config = require('config');
const LOGGER = config.get("LOGGER");

const fs = require("fs");
const path = require('path');
const morgan = require('morgan');

let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})

if(LOGGER === 'morgan'){
    app.use(morgan('combined',{skip: (req, res)=>{ return res.statusCode < 400}, stream: accessLogStream}));
    app.use(morganLogger);
}

module.exports = app;