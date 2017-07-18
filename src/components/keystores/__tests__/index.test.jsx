import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Keystores from '../index';

jest.mock('react-redux', () => ({
  connect: () => component => component,
}));
jest.mock('semantic-ui-react');

const keystores = [{
  id: 1,
  type: {
    name: 'test keystore',
    color: 'red',
    icon: 'testIcon',
    subtitle: 'test subtitle',
  },
  addresses: [{
    address: '0x12345',
  }, {
    address: '0x1234567',
  }],
}, {
  id: 2,
  type: {
    name: 'test keystore 2',
    color: 'blue',
    icon: 'testIcon2',
    subtitle: 'test subtitle 2',
  },
  addresses: [{
    address: '0x54321',
  }, {
    address: '0x543210123',
  }],
}];

describe('<Keystores />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <Keystores
        keystores={keystores}
        keystoreTypes={[]}
        createKeystore={jest.fn}
        updateKeystore={jest.fn}
        deleteKeystore={jest.fn}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
