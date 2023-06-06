import winston from "winston";

const env = process.env.NODE_ENV || "development";

const options = {};

if (env === "production") {
  options.levels = customeLogger.levels;
  options.transports = [
    new winston.transports.Console({
      level: "info",
      format: winston.format.combine(
        winston.format.colorize({ colors: customeLogger.colors }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      level: "error",
      filename: "logs/error.log",
      format: winston.format.simple(),
    }),
  ];
} else {
  options.transports = [new winston.transports.Console({ level: "debug" })];
}

const customeLogger = {
  levels: {
    debug: 0,
    http: 1,
    info: 2,
    warning: 3,
    error: 4,
    fatal: 5,
  },
  colors: {
    debug: "blue",
    http: "cyan",
    info: "green",
    warning: "yellow",
    error: "orange",
    fatal: "red",
  },
};
const logger = winston.createLogger(options);
logger.info(`NODE_ENV=${env}`);

export const addLogger = (req, res, next) => {
  req.logger = logger;
  req.logger.http(
    `${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`
  );

  next();
};
