const { createLogger, format, transports } = require('winston');
const { combine, printf } = format;


const Format = printf(({ level, message }) => {
    return `[${process.env.npm_package_name}] ${level}: ${message}`;
});

const logger = createLogger({
    prettyPrint: true,
    transports: [
        new transports.Console({
            format: combine(
                format.colorize(),
                Format,
            )
        })
    ]
})

module.exports = logger;