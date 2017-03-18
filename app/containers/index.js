import m from 'mithril';
import Root from './Root';

export function mountRoot(el, attrs) {
  function mount(Component) {
    m.mount(el, {
      view() {
        return m(Component, attrs);
      },
    });
  }

  if (module.hot) {
    module.hot.accept('./Root', () => {
      // eslint-disable-next-line global-require
      mount(require('./Root').default);
    });
  }

  mount(Root);
}
