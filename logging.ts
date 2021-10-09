import * as winston from 'winston';

export const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.json(),
});

logger.add(new winston.transports.Console());
logger.add(new winston.transports.File({ filename: 'app.log' }))
