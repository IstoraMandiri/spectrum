import Dapplet from '@digix/kyc-system';

export default {
  menuStyle: 'hamburger', // default, hamburger, hidden
  dapplet: { // remove this for 'dapp store' mode
    path: '/kyc',
    name: 'Digix KYC',
    icon: 'id card',
    component: Dapplet,
  },
};
