import { REDUX_PREFIX } from '~/helpers/constants';
import { validateProps } from '~/helpers/validation';

// web3-redux hooks
import { sync } from '~/helpers/web3';
import { removeNetwork } from 'web3-redux/src/actions';

export const actions = {
  CREATE_NETWORK: `${REDUX_PREFIX} create network`,
  UPDATE_NETWORK: `${REDUX_PREFIX} update network`,
  DELETE_NETWORK: `${REDUX_PREFIX} delete network`,
};

const requiredProps = {
  name: true,
  symbol: true,
  description: true,
  provider: true,
  id: true,
  color: true,
  enabled: true,
  chainId: true,
};

function dispatchAndSync(action) {
  return (dispatch, getState) => {
    dispatch(action);
    sync({ dispatch, getState }, action.payload);
  };
}

export const createNetwork = (payload) => {
  validateProps(requiredProps, payload);
  return dispatchAndSync({ type: actions.CREATE_NETWORK, payload });
};

export const updateNetwork = (payload) => {
  validateProps(requiredProps, payload);
  return dispatchAndSync({ type: actions.UPDATE_NETWORK, payload });
};

export const deleteNetwork = payload =>
  (dispatch) => {
    dispatch(removeNetwork({ networkId: payload }));
    dispatch({ type: actions.DELETE_NETWORK, payload });
  };
