import { REDUX_PREFIX } from '~/helpers/constants';

export const actions = {
  CREATE_KEYSTORE_TYPE: `${REDUX_PREFIX} create keystore type`,
  DELETE_KEYSTORE_TYPE: `${REDUX_PREFIX} delete keystore type`,
};

export const createKeystoreType = props => ({
  type: actions.CREATE_KEYSTORE_TYPE,
  payload: props,
});

export const deleteKeystoreType = id => ({
  type: actions.DELETE_KEYSTORE_TYPE,
  payload: id,
});
