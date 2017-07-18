import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import BaseTokenTxUi from '../base_token_tx_ui';

jest.mock('../../../../helpers/stringUtils', () => ({
  parseBigNumber: () => 20,
}));

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
  color: 'red',
  symbol: 'GBP',
  description: 'test description',
};

const txData = {
  to: '0x123456ff',
  value: 10,
};

describe('<BaseTokenTxUi />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <BaseTokenTxUi
        address={address}
        network={network}
        txData={txData}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
