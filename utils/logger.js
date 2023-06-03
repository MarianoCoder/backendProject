import winston from "winston";

const options = {};

const customeLogger = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    debug: 4,
  },
  colors: {
    fatal: "red",
    error: "orange",
    warning: "blue",
    info: "black",
    debug: "brown",
  },
};
const logger = winston.createLogger({
  transports: [new winston.transports.Console({ level: "http" })],
});
export const addLogger = (req, res, next) => {
  req.logger = logger;
  req.logger.http(
    `${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`
  );

  next();
};
