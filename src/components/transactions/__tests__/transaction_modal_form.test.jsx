/* eslint global-require:0 */

import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import TransactionModalForm from '../transaction_modal_form';

jest.mock('../../../helpers/web3/connect', () => require('../../../../test/__mocks__/connectMock'));

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
