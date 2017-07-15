import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import TransactionTracker from '../transaction_tracker';

jest.mock('react-redux', () => ({
  connect: () => component => component,
}));

const networks = [{
  id: 1,
  explorerTransactionPrefix: 'testPrefix',
  explorerBlockPrefix: 'blockTestPrefix',
}, {
  id: 2,
}];

const web3Redux = {
  web3: () => ({
    eth: {
      transaction: () => jest.fn,
    },
    networkId: 1,
  }),
};

describe('<TransactionTracker />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <TransactionTracker
        networks={networks}
        txHash="0x123456"
        networkId="1"
        broadcast={new Date()}
        web3Redux={web3Redux}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
