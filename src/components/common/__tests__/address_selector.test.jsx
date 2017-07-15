import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import AddressSelector from '../address_selector';

const addresses = [{
  name: 'address 1',
  address: 'address test 1',
  keystore: {
    type: { color: 'white' },
  },
}, {
  name: 'address 2',
  address: 'address test 2',
  keystore: {
    type: { color: 'black' },
  },
}, {
  name: 'address 3',
  address: 'address test 4',
  keystore: {
    type: { color: 'orange' },
  },
}];

describe('<AddressSelector />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <AddressSelector
        addresses={addresses}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
