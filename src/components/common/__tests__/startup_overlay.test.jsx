import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import StartupOverlay from '../startup_overlay';

describe('<StartupOverlay />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <StartupOverlay />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
