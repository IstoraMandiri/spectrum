import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ConnectionStatus from '../connection_status';

jest.mock('react-redux', () => ({
  connect: () => component => component,
}));

const web3Redux = {
  web3: jest.fn(),
  pendingRequests: () => true,
};

const networks = [{
  id: 1,
  enabled: true,
}, {
  id: 2,
  enabled: false,
}];

describe('<ConnectionStatus />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <ConnectionStatus
        web3Redux={web3Redux}
        networks={networks}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
