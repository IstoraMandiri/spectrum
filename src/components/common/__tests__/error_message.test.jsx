import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import ErrorMessage from '../error_message';

describe('<ErrorMessage />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <ErrorMessage
        content="Test Error message"
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
