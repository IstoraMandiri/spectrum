import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import TransactionSigningOverlay from '../transaction_signing_overlay';

jest.mock('react-redux', () => ({
  connect: () => component => component,
}));

describe('<TransactionSigningOverlay />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <TransactionSigningOverlay
        hideTxSigningModal={jest.fn}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
