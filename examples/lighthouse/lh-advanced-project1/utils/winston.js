'use strict';
const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');
const fs = require('fs');

const env = process.env.NODE_ENV || 'development';
const logDir = './logs';

let Wlogger = null;

const createWinstonLogger = (isLogs) => {
  let config = {
    // change level if in dev environment versus production
    level: env === 'development' ? 'verbose' : 'info',
    format: format.combine(
      format.colorize(),
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.printf(
        info => `${info.timestamp} ${info.level}: ${info.message}`
      )
    ),
    transports: [
      new transports.Console({
        level: 'info',
        format: format.combine(
          format.colorize(),
          format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          format.printf(
            info => `${info.timestamp} ${info.level}: ${info.message}`
          )
        )
      }),
      new transports.Console({
          level: 'error',
          format: format.combine(
            format.colorize(),
            format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            format.printf(
              info => `${info.timestamp} ${info.level}: ${info.message}`
            )
          )
        })
    ]
  }

  if(isLogs) {
    // Create the log directory if it does not exist
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }
    
    const dailyRotateFileTransport = new transports.DailyRotateFile({
      filename: `${logDir}/io-api-%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true, // writes to gzip archive
      maxSize: '200m' // use only integer for number bytes, or add suffix of k, m, or g for kilobytes, megabytes and gigabytes respectively 
      //maxFiles: '14d' // use integer for number of log files to keep or add d as suffix for number of days
    });

    config.transports.push(dailyRotateFileTransport);
  }

  Wlogger = createLogger(config);
};

const addLoggingInfo = (msg) => Wlogger.info(msg);

const addLoggingError = (msg) => Wlogger.error(msg);

module.exports = { createWinstonLogger, addLoggingInfo, addLoggingError };
