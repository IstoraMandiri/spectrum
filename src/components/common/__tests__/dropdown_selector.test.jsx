import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import DropdownSelector from '../dropdown_selector';

describe('<DropdownSelector />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <DropdownSelector
        items={[]}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
