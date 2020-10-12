import * as React from 'react';
import { Provider } from 'react-redux';
import AppRouter from './AppRouter';
import NavBar from './NavBar';
import store from './store';

const App: React.FC = () => (
  <Provider store={store}>
    <NavBar />
    <AppRouter />
  </Provider>
);

export default App;
