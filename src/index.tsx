import Amplify from 'aws-amplify';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'styles/index.css';
import awsconfig from './aws-exports';

// Configure Amplify
Amplify.configure(awsconfig);

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
