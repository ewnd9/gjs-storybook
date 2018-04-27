'use strict';

const { configure } = require('gjs-storybook');

configure(() => {
  const context = require.context('../src', true, /\.story\.js$/);
  return context;
}, module);
