import { render } from 'react-dom';
import configureStore from './app/configureStore';
import configureRoutes from './app/routing/configureRoutes';
import configureApp from './app/configureApp';
import { startAction } from './actions';

const store = configureStore();
store.dispatch(startAction());
const routes = configureRoutes(store);
const App = configureApp(store, routes);

render(App, document.querySelector('.js-main'));
