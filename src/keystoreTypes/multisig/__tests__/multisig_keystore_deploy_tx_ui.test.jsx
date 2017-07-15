import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import MultisigKeystoreDeployTxUi from '../multisig_keystore_deploy_tx_ui';

const address = {
  keystore: {
    type: {
      color: 'black',
      icon: 'testIcon',
    },
  },
  name: 'test network',
  address: '0x213452',
  color: 'blue',
};

const network = {
  explorerAddressPrefix: 'testPrefix',
  name: 'test network',
};

const ui = {
  required: 2,
  count: 5,
};

describe('<MultisigKeystoreDeployTxUi />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <MultisigKeystoreDeployTxUi
        address={address}
        network={network}
        ui={ui}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
