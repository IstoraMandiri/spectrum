import { attr, Model } from 'redux-orm';
import { actions } from '~/actions/network';

export default class Network extends Model {
  static modelName = 'Network';
  static fields = {
    id: attr(),
    name: attr(),
    symbol: attr(),
    description: attr(),
    provider: attr(),
    color: attr(),
    default: attr(),
    networkId: attr(),
    explorerAddressPrefix: attr(),
    explorerTransactionPrefix: attr(),
    // TODO images
  }
  static reducer(action, model) {
    switch (action.type) {
      case actions.CREATE_NETWORK:
        return model.create(action.payload);
      case actions.UPDATE_NETWORK:
        return model.withId(action.payload.id).update(action.payload);
      case actions.DELETE_NETWORK:
        return model.withId(action.payload).delete();
      default:
        return undefined;
    }
  }
}
