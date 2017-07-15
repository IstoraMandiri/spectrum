import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import MultisigKeystoreEditForm from '../multisig_keystore_edit_form';

const data = {
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

describe('<MultisigKeystoreEditForm />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <MultisigKeystoreEditForm
        data={data}
        setFormData={jest.fn}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
