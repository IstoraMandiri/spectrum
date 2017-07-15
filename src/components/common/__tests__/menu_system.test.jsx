import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import MenuSystem from '../menu_system';

const tabs = [{
  icon: 'tabIcon1',
  name: 'Tab 1',
  path: '/tab-1',
  exact: true,
}, {
  icon: 'tabIcon2',
  name: 'Tab 2',
  path: '/tab-2',
  exact: true,
}];

describe('<MenuSystem />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <MenuSystem
        tabs={tabs}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
