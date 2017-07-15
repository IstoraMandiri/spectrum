import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import NetworkStatus from '../network_status';

describe('<NetworkStatus />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <NetworkStatus
        name
        network={{
          name: 'test network',
        }}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
