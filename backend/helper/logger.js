import fs from "fs";
import log4js from "log4js";

log4js.configure({
  appenders: {
    stdout: { type: "stdout" },
    file: { type: "file", filename: "logs/error.log" },
  },
  categories: {
    default: { appenders: ["stdout", "file"], level: "error" },
  },
});
export const logger = log4js.getLogger();
export const readLog = () => {
  let log = fs.readFileSync("logs/error.log", "utf8", (error, content) => {
    if (error) {
      logger.error(error);
      return error;
    }
    return content;
  });
  return log;
};
