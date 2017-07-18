import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import TokenTxUi from '../token_tx_ui';

const address = {
  color: 'red',
  address: '0x12345',
  name: 'test address',
  keystore: {
    type: {
      color: 'black',
      icon: 'testIcon',
    },
  },
};

const network = {
  explorerAddressPrefix: 'testPrefix',
};

const ui = {
  token: {
    decimals: 2,
    symbol: 'GBP',
    color: 'orange',
    name: 'test token',
  },
  value: 10,
  to: '0x432145',
};

describe('<TokenTxUi />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <TokenTxUi
        network={network}
        address={address}
        ui={ui}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
