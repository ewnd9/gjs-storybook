'use strict';

const { Gtk } = imports.gi;
const holders = [];

let configureArgs;

module.exports = {
  configure,
  getStories,
  getConfigureArgs,
  storiesOf,
  reset,
  Grid
};

function configure(...args) {
  configureArgs = args;
}

function reset() {
  holders.splice(0, holders.length);
}

function getConfigureArgs() {
  return configureArgs;
}

function storiesOf(name, module) {
  const holder = {
    name: 'untitled',
    module: null,
    examples: []
  };

  holders.push(holder);

  holder.name = name;
  holder.module = module;

  const ret = {
    add(name, fn) {
      holder.examples.push({ name, fn });
      return ret;
    }
  };

  // // @TODO: investigate why `storybook` passes `modules`, require.context in `gjs-storybook.js` works without it
  // module.hot.accept(() => {
  //   console.log('update');
  //   render();
  // });

  return ret;
}

function getStories() {
  const mainStack = new Gtk.Stack();

  holders.forEach(holder => {
    holder.examples.forEach(example => {
      const name = `${holder.name}::${example.name}`;
      mainStack.add_titled(example.fn(), name, name);
    });
  });

  const stackSidebar = new Gtk.StackSidebar();
  stackSidebar.stack = mainStack;

  const paned = new Gtk.Paned({ orientation: Gtk.Orientation.HORIZONTAL });
  paned.add1(stackSidebar);
  paned.add2(mainStack);

  return [paned];
}

function Grid(props, children = []) {
  const grid = new Gtk.Grid();
  grid.orientation = Gtk.Orientation.VERTICAL;
  grid.margin = 24;
  grid.halign = Gtk.Align.CENTER;
  grid.valign = Gtk.Align.CENTER;
  grid.row_spacing = 6;

  children.forEach(child => grid.add(child));
  return grid;
}
