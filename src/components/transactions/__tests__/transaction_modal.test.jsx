import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import TransactionModal from '../transaction_modal';

describe('<TransactionModal />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <TransactionModal
        handleTransaction={jest.fn}
        trigger={<div />}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
