import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import GenericTransactionForm from '../generic_transaction_form';

describe('<GenericTransactionForm />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <GenericTransactionForm
        formChange={jest.fn}
        setFormData={jest.fn}
        formData={{}}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
