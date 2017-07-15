import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import AddressInput from '../address_input';

describe('<AddressInput />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <AddressInput />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
