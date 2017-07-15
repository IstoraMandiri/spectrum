import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import TransactionInfo from '../transaction_info';

describe('<TransactionInfo />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <TransactionInfo txData={{}} />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
