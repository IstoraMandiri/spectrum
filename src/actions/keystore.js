import { REDUX_PREFIX } from '~/helpers/constants';
import { getKeystoreAction } from '~/keystoreTypes';

export const actions = {
  CREATE_KEYSTORE: `${REDUX_PREFIX} create keystore`,
  UPDATE_KEYSTORE: `${REDUX_PREFIX} update keystore`,
  DELETE_KEYSTORE: `${REDUX_PREFIX} delete keystore`,
  ADD_ACCOUNT_TO_KEYSTORE: `${REDUX_PREFIX} add account to keystore`,
  REMOVE_ACCOUNT_FROM_KEYSTORE: `${REDUX_PREFIX} remove account from keystore`,
};

export const createKeystore = props =>
  getKeystoreAction({ id: props.type, type: 'create' })(props);

export const updateKeystore = (props, data) =>
  getKeystoreAction({ id: data.type.id, type: 'update' })(props, data);

export const deleteKeystore = payload => ({
  type: actions.DELETE_KEYSTORE, payload,
});
