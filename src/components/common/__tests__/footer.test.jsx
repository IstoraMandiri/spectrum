import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Footer from '../footer';

describe('<Footer />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <Footer />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
