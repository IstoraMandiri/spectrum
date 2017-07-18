import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Address from '../address';

jest.mock('../../../helpers/blockie');

describe('<Address />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <Address
        address="test address"
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });

  test('renders correctly with short width', () => {
    const component = shallow(
      <Address
        address="test address 2"
        short
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
