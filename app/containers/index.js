import m from 'mithril';
import Root from './Root';

export function mountRoot(el, attrs) {
  const mount = Component => m.mount(el, <Component {...attrs} />);

  if (module.hot) {
    module.hot.accept('./Root', () => {
      mount(require('./Root').default);
    });
  }

  mount(Root);
}
