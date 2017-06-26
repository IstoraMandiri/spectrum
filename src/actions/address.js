import { REDUX_PREFIX } from '~/helpers/constants';

export const actions = {
  CREATE_ADDRESS: `${REDUX_PREFIX} create address`,
  UPDATE_ADDRESS: `${REDUX_PREFIX} update address`,
  DELETE_ADDRESS: `${REDUX_PREFIX} delete address`,
};

export const createAddress = props => ({
  type: actions.CREATE_ADDRESS,
  payload: props,
});

export const updateAddress = props => ({
  type: actions.UPDATE_ADDRESS,
  payload: props,
});

export const deleteAddress = id => ({
  type: actions.DELETE_ADDRESS,
  payload: id,
});
