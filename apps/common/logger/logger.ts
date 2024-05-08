// import { v4 as uuidv4 } from 'uuid';
// import { getNamespace } from 'continuation-local-storage';
// import { createLogger, format, transports } from 'winston';
// import DailyRotateFile from 'winston-daily-rotate-file';
// import appRoot from 'app-root-path';
// interface DailyRotateFileOptions {
//   filename: string;
//   level?: string;
//   handleExceptions?: boolean;
//   json?: boolean;
//   maxsize?: number;
//   colorize?: boolean;
// }
// const namespace = getNamespace('logger');
// const logsPath = `${appRoot}/lib/logger/logs/`;

// const fileFormat = format.combine(
//   format.timestamp(),
//   format.align(),
//   format.printf((info) => {
//     let log = '';
//     try {
//       const logId =
//         namespace && namespace.get('logId') ? namespace.get('logId') : uuidv4();
//       const { timestamp, level, message, ...args } = info;
//       const ts = timestamp.slice(0, 19).replace('T', ' ');
//       log = `${ts} - ${logId} - ${level}: ${message ? message.trim() : ''} ${
//         Object.keys(args).length ? JSON.stringify(args, null, 2) : ''
//       }`;
//       return log;
//     } catch (error) {
//       console.log('Error @ fileFormat @ logger ', error);
//     }
//   }),
// );

// const infoTransportOptions = {
//   level: 'info',
//   filename: `${logsPath}/info-%DATE%.log`,
//   handleExceptions: true,
//   json: true,
//   maxsize: 5242880, // 5MB
//   colorize: false,
// };

// const errorTransportOptions = {
//   level: 'error',
//   filename: `${logsPath}/error-%DATE%.log`,
//   handleExceptions: true,
//   json: true,
//   maxsize: 5242880, // 5MB
//   colorize: false,
// };

// const info = createLogger({
//   level: 'info',
//   format: fileFormat,
//   transports: [
//     new DailyRotateFile(infoTransportOptions as DailyRotateFileOptions),
//   ],
// });

// const error = createLogger({
//   level: 'error',
//   format: fileFormat,
//   transports: [
//     new DailyRotateFile(errorTransportOptions as DailyRotateFileOptions),
//   ],
// });

// const consoleFormat = format.combine(
//   format.colorize(),
//   format.timestamp(),
//   format.align(),
//   format.printf((info) => {
//     let log = '';
//     try {
//       const logId =
//         namespace && namespace.get('logId') ? namespace.get('logId') : uuidv4();
//       const { timestamp, level, message, ...args } = info;
//       const ts = timestamp.slice(0, 19).replace('T', ' ');
//       log = `${ts} - ${logId} - ${level}: ${message ? message.trim() : ''} ${
//         Object.keys(args).length ? JSON.stringify(args, null, 2) : ''
//       }`;
//       return log;
//     } catch (error) {
//       console.log('Error @ fileFormat @ logger ', error);
//     }
//   }),
// );

// if (process.env.NODE_ENV !== 'production') {
//   info.add(
//     new transports.Console({
//       format: consoleFormat,
//     }),
//   );
//   error.add(
//     new transports.Console({
//       format: consoleFormat,
//     }),
//   );
// }

// const logger = {
//   info: async (msg, ...args) => {
//     info.info(msg, ...args);
//   },
//   error: async (msg, ...args) => {
//     error.error(msg, ...args);
//   },
// };

// export default logger;
