import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import TokenTransferForm from '../token_transfer_form';

const formData = {
  from: '0x12345',
};

const contract = {
  balanceOf: () => ({
    shift: () => ({}),
  }),
};

const token = {
  color: 'blue',
  symbol: 'GBP',
  decimals: 2,
};

describe('<TokenTransferForm />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <TokenTransferForm
        formChange={jest.fn}
        formData={formData}
        contract={contract}
        token={token}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
