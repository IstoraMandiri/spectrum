jest.mock('react-redux', () => ({
  connect: () => component => component,
}));

import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import GenericTransactionForm from '../index';

describe('<GenericTransactionForm />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <GenericTransactionForm />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
