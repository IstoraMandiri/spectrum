import Dapplet from '@digix/kyc-system';

export default {
  showOverlay: process.env.NODE_ENV === 'production',
  webWorker: process.env.NODE_ENV === 'production',
  localStorage: false,
  menuStyle: 'hamburger', // default, hamburger, hidden
  dapplet: { // remove this for 'dapp store' mode
    path: '/kyc',
    name: 'Digix KYC',
    icon: 'id card',
    component: Dapplet,
  },
};
