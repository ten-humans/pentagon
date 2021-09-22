#!/usr/bin/env node

import PentagonCore from '../@pentagon/index';
import ReadDirectory from './utils/getdir';
import 'colors';
import * as fs from 'fs';
import log from './utils/log';

const core = new PentagonCore(
  ReadDirectory(process.cwd()),
  process.cwd(),
  true,
  JSON.parse(fs.readFileSync(`${process.cwd()}\\pentagon.config.json`).toString())
);

if (process.argv[2] === undefined || process.argv[2] === 'dev') {
  log('starting dev server..', 'pentagon-core');
  core.dev();
} else if (process.argv[2] === 'build') {
  log('building..', 'pentagon-core');
  core.build();
} else if (process.argv[2] === 'server') {
  log('starting server..', 'pentagon-core');
  core.server();
} else {
  console.log(process.argv[2]);
}
