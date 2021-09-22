import * as fs from 'fs';
import { join } from 'path';

let result: string[] = [];

function isdir(dir: string): boolean {
  try {
    return fs.lstatSync(dir).isDirectory();
  } catch (err) {
    return false;
  }
}

function explore(dir: string, d: string = '') {
  fs.readdirSync(dir).forEach((e) => {
    if (isdir(join(dir, e))) {
      explore(join(dir, e), `${d}\\${e}`);
    } else {
      result.push(`${d}\\${e}`);
    }
  });
  return result;
}

function init() {
  result = [];
}

// Main Function

export default function ReadDirectory(dir: string): string[] {
  if (!fs.existsSync(`${dir}\\pentagon.config.json`)) {
    console.log("(!) [pentagon] Couldn't find 'pentagon.config.json'".yellow);
  }
  init(); // INIT
  return explore(dir + '\\src\\pages');
}
