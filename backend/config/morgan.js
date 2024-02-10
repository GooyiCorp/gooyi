import chalk from "chalk";

export function morgan_log(tokens, req, res) {
  const log =
    tokens.date({ format: "web" }) +
    " " +
    tokens.method(req, res) +
    " " +
    tokens.url(req, res) +
    " " +
    tokens.status(req, res) +
    " " +
    tokens["response-time"](req, res) +
    " ms";
  if (tokens.status(req, res) == 200) {
    return chalk.green(log);
  }
  return chalk.red(log);
}
