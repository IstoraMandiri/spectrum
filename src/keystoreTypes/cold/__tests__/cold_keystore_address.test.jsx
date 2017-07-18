import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import ColdKeystoreAddress from '../cold_keystore_address';

const data = {
  address: '0x12345',
  enabled: true,
  exists: true,
  name: 'test name',
};

describe('<ColdKeystoreAddress />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <ColdKeystoreAddress
        itemId={1}
        data={data}
        onChange={jest.fn}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
