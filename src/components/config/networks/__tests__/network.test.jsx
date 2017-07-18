import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Network from '../network';

const network = {
  name: 'testNetwork',
  color: 'blue',
  image: 'test.png',
  description: 'test description',
};

describe('<Network />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <Network
        web3={{}}
        updateNetwork={jest.fn}
        deleteNetwork={jest.fn}
        network={network}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
