import m from 'mithril';
import {configureStore} from './store';
import {mountRoot} from './containers';

const store = configureStore();

mountRoot(document.getElementById('root'), {store});

store.subscribe(m.redraw);
