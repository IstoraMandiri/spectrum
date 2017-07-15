import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import V3KeystoreEditForm from '../v3_keystore_edit_form';

const formData = {
  name: 'test name',
};

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

describe('<V3KeystoreEditForm />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <V3KeystoreEditForm
        formData={formData}
        formChange={jest.fn}
        setFormData={jest.fn}
        data={data}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
