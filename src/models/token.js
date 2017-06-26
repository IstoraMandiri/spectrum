import { attr, fk, Model } from 'redux-orm';
import { actions } from '~/actions/token';

export default class Token extends Model {
  static modelName = 'Token';
  static fields = {
    id: attr(),
    decimals: attr({ getDefault: () => 18 }),
    address: attr(),
    network: fk('Network', 'tokens'),
    // TODO
    // type: fk('TokenType'),
  }
  static reducer(action, model) {
    switch (action.type) {
      case actions.CREATE_TOKEN: {
        return model.create({
          ...action.payload,
          id: `${action.payload.network}_${action.payload.address.toLowerCase()}`,
        });
      }
      case actions.UPDATE_TOKEN: {
        return model.withId(action.payload.id).update(action.payload);
      }
      case actions.DELETE_TOKEN: {
        return model.withId(action.payload).delete();
      }
      default:
        return undefined;
    }
  }
}
