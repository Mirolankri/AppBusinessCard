const chalk = require('chalk');
const morgan = require('morgan');
const currentTime = require('../../utils/timeService');

const fs = require("fs");
const path = require('path');
const { mkdir, writeFile } = require("fs/promises");
const dirlog = 'logs';

const morganLogger = morgan((tokens, req, res)=>{
    const { year, month, day, hour, minute, seconds } = currentTime();
    const currentDate = `[${year}-${month}-${day}]`;
    const currentDateAndTime = `[${year}-${month}-${day} ${hour}:${minute}:${seconds}]`;
    const errorArr = [
        currentDateAndTime,
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res), '-',
        tokens['response-time'](req, res), 'ms'
    ];
    
    if(tokens.status(req, res) >= 400) {
        if (!fs.existsSync(`${dirlog}`)) mkdir(dirlog);

        if(CheckIfFileExsist(`${dirlog}/${currentDate}.log`)) {
            fs.appendFile(`${dirlog}/${currentDate}.log`, `\n${errorArr.join(' ')}`, (err)=> {
                if (err) return console.log(err);
             });
        } else {
            writeFile(`${dirlog}/${currentDate}.log`,`${errorArr.join(' ')}`);
        }
        return chalk.redBright(errorArr.join(' '))
    };

    
    return chalk.cyanBright([
        currentDateAndTime,
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res), '-',
        tokens['response-time'](req, res), 'ms'
    ].join(' '));
});

module.exports = morganLogger;

const CheckIfFileExsist = (path)=>{
    if (fs.existsSync(path)) {
        return true
    } else {
        return false
    }
}