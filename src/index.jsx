import 'react-hot-loader/patch';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import 'semantic-ui-less/semantic.less';

import './offlinePlugin';

import App from './components/app';
import store from './store';

const renderApp = () => {
  render(
    <AppContainer>
      <Provider store={store}>
        <App />
      </Provider>
    </AppContainer>
    , document.getElementById('app'));
};

renderApp();

if (module.hot) {
  module.hot.accept('./components/app', renderApp);
}
