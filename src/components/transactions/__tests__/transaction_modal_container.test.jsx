import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import TransactionModalContainer from '../transaction_modal_container';

jest.mock('react-redux', () => ({
  connect: () => component => component,
}));

const web3Redux = {
  web3: () => ({
    eth: {
      contract: () => ({
        at: () => ({}),
      }),
    },
  }),
};

describe('<TransactionModalContainer />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <TransactionModalContainer
        handleSubmit={jest.fn}
        web3Redux={web3Redux}
        content={jest.fn}
        loading={false}
        error="test error"
        header="test header"
        trigger={<div />}
        data={{}}
        closeButtonText="test close button text"
        noSubmitButton={false}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
