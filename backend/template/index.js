import fs from "fs";
import Handlebars from "handlebars";
export function render(file, data) {
  const source = fs.readFileSync(file, "utf8").toString();
  const template = Handlebars.compile(source);
  const output = template(data);
  return output;
}
