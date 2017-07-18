import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Tokens from '../index';

jest.mock('react-redux', () => ({
  connect: () => component => component,
}));

const tokens = [{
  id: 1,
}, {
  id: 2,
}];

describe('<Tokens />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <Tokens
        tokens={tokens}
        createToken={jest.fn}
        updateToken={jest.fn}
        deleteToken={jest.fn}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
