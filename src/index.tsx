import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'styles/index.css';

const render = (): void => {
  const App = require('./app/App').default;

  ReactDOM.render(
    <App />,
    document.getElementById('app'),
  );
};

render();

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./app/App', render);
}
