import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Advanced from '../advanced';

describe('<Advanced />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <Advanced><div>Test</div></Advanced>,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
