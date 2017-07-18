import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import App from '../app';

describe('<App />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <App />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
