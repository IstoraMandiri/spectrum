import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import LedgerKeystoreEditForm from '../ledger_keystore_edit_form';

const data = {
  type: 'testType',
  addresses: [{
    name: 'test address 1',
    address: '0x12345',
    kdPath: 'kdpath test',
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

const formData = {
  addresses: [],
};

describe('<LedgerKeystoreEditForm />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <LedgerKeystoreEditForm
        setFormData={jest.fn}
        data={data}
        formChange={jest.fn}
        formData={formData}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
