import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import 'semantic-ui-less/semantic.less';

import './helpers/offlinePlugin';

const renderApp = () => {
  /* eslint-disable global-require */
  const NewApp = require('./components/app').default;
  const store = require('./store').default;
  /* eslint-enable global-require */
  render(
    <AppContainer>
      <Provider store={store}>
        <NewApp />
      </Provider>
    </AppContainer>
    , document.getElementById('app'));
};

renderApp();

if (module.hot) {
  module.hot.accept('./components/app', () => { renderApp(); });
}
