#!/usr/bin/env node

'use strict';

const path = require('path');
const webpack = require('webpack');
const { spawn } = require('child_process');

const argv = process.argv.slice(3);
const outputPath = path.resolve(process.cwd(), 'dist');
const mainOutput = `${outputPath}/main.js`;

let firstRun = false;
// let cgjsProcess;

webpack({
  entry: {
    main: [
      'webpack/hot/poll?1000',
      `${process.cwd()}/.storybook/config.js`,
      path.resolve(`${__dirname}/../src/app.js`)
    ]
  },
  mode: 'development',
  output: {
    filename: '[name].js',
    path: outputPath
  },
  resolve: {
    modules: [
      'node_modules'
    ]
  },
  target: 'node',
  watch: true,
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}, err => {
  if (err) {
    console.error('err', err)
  }

  if (!firstRun) {
    firstRun = true;
    console.log(mainOutput)

    // @TODO: restart process on failed hmr
    /*cgjsProcess = */spawn('cgjs', [mainOutput, ...argv], { stdio: 'inherit' });
  }
});
