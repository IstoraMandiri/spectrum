import { fk, many, attr, Model } from 'redux-orm';
import { actions } from '~/actions/address';

import { DEFAULT_SESSION_ID } from '~/helpers/constants';

export default class Address extends Model {
  static modelName = 'Address';
  static fields = {
    name: attr(),
    address: attr(),
    networks: many('Network', 'addresses'),
    tokens: many('Token', 'addresses'),
    keystore: fk('Keystore', 'addresses'),
  }
  static options = {
    idAttribute: 'address',
  }
  static reducer(action, model) {
    switch (action.type) {
      case actions.CREATE_ADDRESS: {
        const newAddress = model.create(action.payload);
        // set the default address
        if (model.all().count() === 1) {
          newAddress.sessionSet.modelClass.withId(DEFAULT_SESSION_ID).update({ defaultAddress: newAddress.address });
        }
        return undefined;
      }
      case actions.UPDATE_ADDRESS: {
        const address = model.withId(action.payload.address);
        // TODO why can't redux-orm figure this out?
        address.tokens.clear();
        address.networks.clear();
        address.update(action.payload);
        return undefined;
      }
      case actions.DELETE_ADDRESS:
        return model.withId(action.payload).delete();
      default:
        return undefined;
    }
  }
}
