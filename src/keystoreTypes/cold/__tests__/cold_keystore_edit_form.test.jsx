import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import ColdKeystoreEditForm from '../cold_keystore_edit_form';

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

describe('<ColdKeystoreEditForm />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <ColdKeystoreEditForm
        data={data}
        setFormData={jest.fn}
        formData={{}}
        formChange={jest.fn}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
