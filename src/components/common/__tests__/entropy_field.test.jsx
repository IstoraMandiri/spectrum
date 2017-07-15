import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import EntropyField from '../entropy_field';

const formData = {
  test: 'Test name',
};

describe('<EntropyField />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <EntropyField
        formChange={jest.fn}
        formData={formData}
        name="test"
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
