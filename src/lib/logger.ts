import winston, { format, transports } from 'winston'

const logFormat = format.printf(({ level, message, timestamp }) => {
    const formattedMessage = JSON.stringify(message, null, 2)
    return `[${process.env.NODE_ENV.toUpperCase()} | ${level.toUpperCase()}] ${formattedMessage} (${timestamp})`
})

const logger = winston.createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS A' }),
        logFormat
    )
})

switch(process.env.NODE_ENV) {
    case 'development':
        logger.add(new transports.Console())

        break

    default:
        logger.add(new transports.File({ filename: 'out.logger.log' }))
        logger.add(new transports.File({ filename: 'error.logger.log', level: 'error' }))

        break
}

export default logger