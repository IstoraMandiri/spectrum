import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import BaseTokenTransfer from '../base_token_transfer';

describe('<BaseTokenTransfer />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <BaseTokenTransfer
        trigger={<div />}
        network={{
          name: 'test network',
        }}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
