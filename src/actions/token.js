import { REDUX_PREFIX } from '~/helpers/constants';
import { validateProps } from '~/helpers/validation';

export const actions = {
  CREATE_TOKEN: `${REDUX_PREFIX} create token`,
  UPDATE_TOKEN: `${REDUX_PREFIX} update token`,
  DELETE_TOKEN: `${REDUX_PREFIX} delete token`,
};

const requiredProps = {
  address: 'address',
  color: true,
  decimals: 'number',
  name: true,
  network: true,
  symbol: true,
};

export const createToken = (payload) => {
  validateProps(requiredProps, payload);
  return {
    type: actions.CREATE_TOKEN,
    payload,
  };
};

export const updateToken = (payload) => {
  validateProps(requiredProps, payload);
  return {
    type: actions.UPDATE_TOKEN,
    payload,
  };
};

export const deleteToken = payload => ({
  type: actions.DELETE_TOKEN,
  payload,
});
