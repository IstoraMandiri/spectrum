jest.mock('../../../helpers/web3/connect', () => require('../../../../test/__mocks__/connectMock'));

import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import TransactionModalForm from '../transaction_modal_form';

describe('<TransactionModalForm />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <TransactionModalForm
        formChange={jest.fn}
        formData={{}}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
