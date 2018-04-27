'use strict';

const { storiesOf, Grid } = require('gjs-storybook');
const { Gtk } = imports.gi;

storiesOf('basic', module)
  .add('entry', () => {
    return Grid({}, [new Gtk.Entry({ text: `hello world` })]);
  })
  .add('button', () => {
    return Grid({}, [new Gtk.Button({ label: `Button` })]);
  });
