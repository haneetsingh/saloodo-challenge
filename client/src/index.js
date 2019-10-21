import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './js/helpers';
import App from './js/components/App.js';

import './sass/style.scss';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);