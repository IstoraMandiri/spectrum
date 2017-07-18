import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import ActiveLink from '../active_link';

describe('<ActiveLink />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <ActiveLink to="/" testProp="test" />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
