const { createLogger, format, transports } = require('winston');
const { combine, printf, prettyPrint } = format;
const app_name = require('../package.json').name


const Format = printf(({ level, message }) => {
    return `[${app_name}] ${level}: ${message}`;
});

const logger = createLogger({
    format: combine(
        prettyPrint(),
        format.colorize(),
        format.simple()
    ),
    transports: [
        new transports.Console({
            format: combine(
                Format,
            )
        })
    ]
})

module.exports = logger;