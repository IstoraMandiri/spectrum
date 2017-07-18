import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import MultisigKeystoreInfo from '../multisig_keystore_info';

const formData = {
  type: 'testType',
  addresses: [{
    name: 'test address 1',
    address: '0x12345',
    tokens: [{
      id: 1,
    }, {
      id: 2,
    }],
    networks: [{
      id: 1,
    }, {
      id: 2,
    }],
  }],
};

describe('<MultisigKeystoreInfo />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <MultisigKeystoreInfo
        formData={formData}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
