/* eslint-disable global-require */

 // default config

let config = { };

/*

// dapplet specific config

config = { // for webpack & app
  publicPath: '/marketplace/', // or '', '/'' for root; ignored in development
  appTitle: 'Digix Marketplace [Alpha]', // or null
  menuStyle: 'hidden', // or null, 'hamburger', 'hidden'
  defaultNetworks: ['eth-mainnet', 'eth-kovan'], auto-selected networks
  enabledNetworks: ['eth-mainnet', 'eth-kovan'], auto-connected networks
  availableNetworks: ['eth-mainnet', 'eth-kovan'], prepopulated networks
  persistCore: false, // or true to persist accounts / token / network config
  themeFolder: '@digix/sui-theme/semantic-ui',
  // dappletName: 'Digix KYC System',
  // dappletIcon: 'id card',
  // dappletPath: '/kyc',
};

// we don't want to include the following in the webpack config because of imports

// TODO with the dapplet store, make this dynamically registered so we don't need to do this hack
if (typeof window !== 'undefined') { // for app only
  config = Object.assign(config, {
    dapplet: require('@digix/marketplace-ui').default,
    reducers: {
      kycSystem: {
        src: require('@digix/kyc-system/spectrum/reducer').default,
        persist: ['userInfo', 'kycForm', 'authToken'],
      },
      digixMarketplace: {
        src: require('@digix/marketplace-ui/src/reducer').default,
      },
    },
  });
}

*/

module.exports = config;
