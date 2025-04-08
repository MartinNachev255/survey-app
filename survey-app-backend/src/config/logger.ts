import winston, { format, transports } from 'winston';
import path from 'path';

import DailyRotateFile from 'winston-daily-rotate-file';

const logDir = path.join(process.cwd(), '../logs/');

const levels = { error: 0, warn: 1, info: 2, http: 3, debug: 4 };
const level = (): string => {
  const env = process.env.NODE_ENV || 'development';
  return env === 'development' ? 'debug' : 'info';
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};
winston.addColors(colors);

const simpleFormat = format.combine(
  format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss:ms' }),
  format.errors({ stack: true }),
  format.splat(),
  format.printf(
    (info) =>
      `${info.timestamp} ${info.level}: ${info.message}` +
      (info.stack ? `\n${info.stack}` : ''),
  ),
);

const consoleFormat = format.combine(
  format.colorize({ all: true }),
  simpleFormat,
);

const fileJsonFormat = format.combine(
  format.timestamp(),
  format.errors({ stack: true }),
  format.splat(),
  format.json(),
);

const loggerTransports: winston.transport[] = [
  new transports.Console({
    level: 'debug',
    format: consoleFormat,
  }),

  new transports.File({
    level: 'error',
    filename: path.join(logDir, 'error.log'),
    format: fileJsonFormat,
    handleExceptions: true,
    handleRejections: true,
    maxsize: 5242880,
    maxFiles: 5,
  }),

  new DailyRotateFile({
    level: 'info',
    dirname: logDir,
    filename: 'app-%DATE%.log',
    datePattern: 'DD-MM-YYYY',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: fileJsonFormat,
  }),
];

const logger = winston.createLogger({
  level: level(),
  levels,
  format: simpleFormat,
  transports: loggerTransports,
  exitOnError: false,
});

export default logger;
