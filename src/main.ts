import * as readlineSync from "readline-sync";

import interpret from "./interpret";
import replEnv from "./replEnv";
import SquirrelList from "./types/SquirrelList";
import SquirrelString from "./types/SquirrelString";
import SquirrelType from "./types/SquirrelType";

if (process.argv.length > 2) {
  replEnv.set("argv", new SquirrelList(process.argv.slice(3).map((value: string) => new SquirrelString(value))));
  interpret(`(load-file "${process.argv[2]}")`, replEnv);
  process.exit(0);
}

/* tslint:disable:no-console */
console.log("tip: _ (underscore) always contains the result of the most recently evaluated expression");
readlineSync.setPrompt("> ");
while (true) {
  const line: string = readlineSync.prompt();
  if (line.trim()) {
    let result: SquirrelType;
    try {
      result = interpret(line, replEnv);
    } catch (e) {
      console.log(e.message);
      continue;
    }
    replEnv.set("_", result);
    console.log(result.toString());
  }
}
