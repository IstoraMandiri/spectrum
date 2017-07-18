import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import LedgerKeystoreCreationForm from '../ledger_keystore_creation_form';

describe('<LedgerKeystoreCreationForm />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <LedgerKeystoreCreationForm
        formData={{}}
        formChange={jest.fn}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
