import { attr, Model } from 'redux-orm';
import { actions } from '~/actions/keystoreType';

export default class KeystoreType extends Model {
  static modelName = 'KeystoreType';
  static fields = {
    id: attr(),
    name: attr(),
    description: attr(),
    icon: attr(),
  }
  static reducer(action, model) {
    switch (action.type) {
      case actions.CREATE_KEYSTORE_TYPE:
        return model.create(action.payload);
      case actions.DELETE_KEYSTORE_TYPE:
        return model.withId(action.payload).delete();
      default:
        return undefined;
    }
  }
}
