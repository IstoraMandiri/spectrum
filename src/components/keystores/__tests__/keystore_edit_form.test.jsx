import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import KeystoreEditForm from '../keystore_edit_form';

jest.mock('../../../keystoreTypes', () => ({
  getKeystoreComponent: () => jest.fn,
}));

const data = {
  type: {
    id: 'testId',
  },
};

describe('<KeystoreEditForm />', () => {
  test.skip('renders correctly', () => {
    const component = shallow(
      <KeystoreEditForm data={data} />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
