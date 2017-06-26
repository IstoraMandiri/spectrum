import { schema } from '~/models';
import { createSelector } from 'reselect';
import { createSelector as createOrmSelector } from 'redux-orm';

export const ormSelector = state => state.orm;

export const getNetworks = createSelector(
    ormSelector,
    createOrmSelector(schema, session => session.Network.all().toRefArray()),
);

export const getNetworksWithTokens = createSelector(
    ormSelector,
    createOrmSelector(schema, session =>
      session.Network.all().toModelArray().map(network => ({
        ...network.ref, tokens: network.tokens.all().toRefArray(),
      }),
    )),
);

export const getDefaultNetworks = createSelector(
    ormSelector,
    createOrmSelector(schema, session =>
      session.Network.filter({ default: true }).toModelArray().map(({ id }) => id),
    ),
);

export const getKeystoreTypes = createSelector(
    ormSelector,
    createOrmSelector(schema, session =>
      session.KeystoreType.all().toRefArray(),
    ),
);

export const getKeystores = createSelector(
    ormSelector,
    createOrmSelector(schema, (session) => {
      const { defaultAddress } = session.Session.first() || {};
      return session.Keystore.all().toModelArray().map((keystore) => {
        const addresses = keystore.addresses.all().toModelArray().map((address) => {
          const networks = address.networks.all().toRefArray();
          const networkIds = networks.map(({ id }) => id);
          if (!address.ref) { return null; }
          const isDefault = defaultAddress && address.ref.address === defaultAddress.address;
          return {
            ...address.ref,
            isDefault,
            networks,
            tokens: address.tokens.all().toModelArray().map(token => ({
              ...token.ref,
              network: token.network.ref,
              networkEnabled: networkIds.indexOf(token.ref.network) >= 0,
            })),
          };
        }).filter(a => a);
        return {
          ...keystore.ref, addresses, type: keystore.type.ref,
        };
      });
    }),
);

export const getTokens = createSelector(
    ormSelector,
    createOrmSelector(schema, session =>
      session.Token.all().orderBy('name').toModelArray().map(token => ({
        ...token.ref,
        network: token.network.ref,
      }),
    )),
);

export const getAddresses = createSelector(
  ormSelector,
  createOrmSelector(schema, (session) => {
    const { defaultAddress } = session.Session.first() || {};
    return session.Address.all().orderBy('name').toModelArray().map((address) => {
      const ref = address.ref;
      return {
        ...ref,
        isDefault: defaultAddress && defaultAddress.address === ref.address,
        keystore: {
          ...address.keystore.ref,
          type: { ...address.keystore.type.ref },
        },
      };
    });
  }),
);

export const getDefaultAddress = createSelector(
  ormSelector,
  createOrmSelector(schema, (session) => {
    const { defaultAddress } = session.Session.first() || {};
    return defaultAddress && defaultAddress.ref;
  }),
);

export const getSigningModalData = createSelector(
  ormSelector,
  createOrmSelector(schema, session => (session.Session.first() || {}).signingModalData),
);
