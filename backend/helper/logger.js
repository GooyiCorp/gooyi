import fs from "fs";
import log4js from "log4js";

log4js.configure({
  appenders: {
    stdout: { type: "stdout" },
    file: { type: "file", filename: "logs/error.log" },
  },
  categories: {
    default: { appenders: ["stdout", "file"], level: "info" },
  },
});
export const logger = log4js.getLogger();
export const readLog = () => {
  let log = fs.readFileSync("logs/error.log", "utf8", (error, content) => {
    if (error) {
      log4js.getLogger().error(error);
      return error;
    }
    //otherwise
    return content;
  });
  return log;
};
