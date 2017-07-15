import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import BalanceLabel from '../balance_label';

describe('<BalanceLabel />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <BalanceLabel
        item={{ color: 'blue' }}
        value="testing"
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
