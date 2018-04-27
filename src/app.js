'use strict';

const { getStories, getConfigureArgs, reset } = require('gjs-storybook');

const { Gtk } = imports.gi;
Gtk.init(null);

const headerbar = new Gtk.HeaderBar();
headerbar.show_close_button = true;

const window = new Gtk.Window();
window.connect('destroy', () => Gtk.main_quit());
window.set_default_size(400, 400);
window.set_titlebar(headerbar);
window.title = 'gjs-storybook';
window.show_all();

function render() {
  reset();

  const [createContext, module] = getConfigureArgs();
  const context = createContext();
  console.log(context.keys())
  context.keys().forEach(m => context(m));

  // https://github.com/webpack/webpack/issues/834#issuecomment-76590576
  if (module.hot) {
    module.hot.accept(context.id, () => {
      console.log('upd');
      render();
    });

    // https://webpack.js.org/api/hot-module-replacement/
    module.hot.addStatusHandler(status => {
      // console.log(status);
      if (status === 'abort') {
        Gtk.main_quit(); // @TODO: make it work
      }
    })
  }

  reconcile(window, getStories());
}

render();

Gtk.main();

function reconcile(container, children) {
  const currChildren = container.get_children().filter(_ => !(_ instanceof Gtk.HeaderBar));

  for (const currChild of currChildren) {
    if (!children.includes(currChild)) {
      container.remove(currChild);
    }
  }

  for (const child of children) {
    if (!currChildren.includes(child)) {
      container.add(child);
    }
  }

  container.show_all(); // no update without it
}
