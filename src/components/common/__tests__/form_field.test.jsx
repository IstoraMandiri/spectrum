import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import FormField from '../form_field';

const formData = {
  TestField: 'test value',
};

describe('<FormField />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <FormField
        formChange={jest.fn}
        formData={formData}
        name="TestField"
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
