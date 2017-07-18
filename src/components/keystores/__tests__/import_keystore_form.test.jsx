import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import ImportKeystoreForm from '../import_keystore_form';

describe('<ImportKeystoreForm />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <ImportKeystoreForm
        setError={jest.fn}
        setLoading={jest.fn}
        onGetPrivateKey={jest.fn}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
