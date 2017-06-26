import { attr, fk, Model } from 'redux-orm';
import { actions } from '~/actions/session';

import { DEFAULT_SESSION_ID } from '~/helpers/constants';

export default class Session extends Model {
  static modelName = 'Session';
  static fields = {
    id: attr(),
    signingModalData: attr(),
    defaultAddress: fk('Address'),
  }
  static reducer(action, model) {
    switch (action.type) {
      case actions.CREATE_DEFAULT_SESSION:
        return model.create({ id: DEFAULT_SESSION_ID });
      case actions.UPDATE_SESSION:
        return model.withId(DEFAULT_SESSION_ID).update(action.payload);
      default:
        return undefined;
    }
  }
}
