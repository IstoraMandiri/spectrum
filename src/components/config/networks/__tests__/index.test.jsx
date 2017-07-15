import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Networks from '../index';

jest.mock('react-redux', () => ({
  connect: () => component => component,
}));

const networks = [{
  id: 1,
}, {
  id: 2,
}];

const web3Redux = {
  web3: () => {},
};

describe('<Networks />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <Networks
        createNetwork={jest.fn}
        updateNetwork={jest.fn}
        deleteNetwork={jest.fn}
        networks={networks}
        web3Redux={web3Redux}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
