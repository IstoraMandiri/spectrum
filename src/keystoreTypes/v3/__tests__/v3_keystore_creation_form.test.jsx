import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import V3KeystoreCreationForm from '../v3_keystore_creation_form';

describe('<V3KeystoreCreationForm />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <V3KeystoreCreationForm
        formData={{}}
        formChange={jest.fn}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
