/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import { createFilter } from 'redux-persist-transform-filter';
import { reducer as cryptoPrices } from '@digix/redux-crypto-prices/src';
import { reducer as web3Redux } from 'web3-redux';

import config from '~/../spectrum.config';
import { reducers as importedReducers } from '~/../spectrum.imports';

import { reducer as orm } from '~/models';
import { REDUX_PREFIX } from '~/helpers/constants';
import seedStore from '~/helpers/seedStore';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const keySuffix = config.publicPath ? config.publicPath.replace(/\//g, '_').toUpperCase() : '';
const persist = config.persistCore === undefined ? process.env.ENVIRONMENT !== 'production' : config.persistCore;
const reducerConfig = importedReducers || {};

const enhancers = composeEnhancers(autoRehydrate({ log: true }), applyMiddleware(thunk));
const appReducers = Object.keys(reducerConfig).reduce((o, k) => ({ ...o, [k]: reducerConfig[k].src }), {});
const reducers = combineReducers({ ...appReducers, web3Redux, orm, cryptoPrices });
const store = createStore(reducers, {}, enhancers);

const persistanceConfig = {
  debounce: 300,
  keyPrefix: `${REDUX_PREFIX}${keySuffix}`,
  whitelist: (
    (persist ? ['orm'] : []).concat((
      Object.keys(reducerConfig).map(k => reducerConfig[k].persist && k).filter(r => r)
    ))
  ),
  transforms: (
    Object.keys(reducerConfig).map(k => (
      Array.isArray(reducerConfig[k].persist) && createFilter(k, reducerConfig[k].persist)
    )).filter(r => r)
  ),
};

persistStore(store, persistanceConfig, () => seedStore(store));

export default store;
