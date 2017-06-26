import uuid from 'uuid';
import { attr, oneToOne, Model } from 'redux-orm';
import { actions } from '~/actions/keystore';

export default class Keystore extends Model {
  static modelName = 'Keystore';
  static fields = {
    id: attr({ getDefault: () => uuid() }),
    data: attr(),
    type: oneToOne('KeystoreType'),
  }
  static reducer(action, model) {
    switch (action.type) {
      case actions.CREATE_KEYSTORE: {
        return model.create(action.payload);
      }
      case actions.UPDATE_KEYSTORE: {
        return model.withId(action.payload.id).update(action.payload);
      }
      case actions.DELETE_KEYSTORE: {
        model.withId(action.payload).addresses.all().toModelArray().forEach(address => address.delete());
        return model.withId(action.payload).delete();
      }
      default:
        return undefined;
    }
  }
}
