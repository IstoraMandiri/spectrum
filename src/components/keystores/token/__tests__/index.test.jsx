import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import BaseTokenButton from '../index';

const web3Redux = {
  web3: () => ({
    eth: {
      contract: () => ({
        at: () => ({}),
      }),
    },
  }),
};

const token = {
  address: '0x123456',
  networkEnabled: true,
  network: {
    id: 1,
    enabled: true,
  },
};

const address = {
  address: '0x5434132',
};

describe('<BaseTokenButton />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <BaseTokenButton
        web3Redux={web3Redux}
        token={token}
        address={address}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
