import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import BaseTokenButton from '../index';

const web3Redux = {
  web3: () => {},
};

const address = {
  address: '0x12345',
};

const network = {
  enabled: true,
};

describe('<BaseTokenButton />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <BaseTokenButton
        web3Redux={web3Redux}
        network={network}
        address={address}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
