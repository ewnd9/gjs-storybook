#!/usr/bin/env node

'use strict';

const path = require('path');
const { spawn } = require('child_process');

spawn(
  `${__dirname}/gjs-webpack.js`,
  [path.resolve(`${__dirname}/../src/app.js`)],
  { stdio: 'inherit' }
);
