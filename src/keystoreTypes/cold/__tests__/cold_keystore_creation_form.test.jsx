import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import ColdKeystoreCreationForm from '../cold_keystore_creation_form';

const formData = {
  addresses: {},
};

describe('<ColdKeystoreCreationForm />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <ColdKeystoreCreationForm
        formData={formData}
        formChange={jest.fn}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
