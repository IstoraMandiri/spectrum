import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import KeystoreCreationForm from '../keystore_creation_form';

jest.mock('../../../keystoreTypes');

const formData = {};

const keystoreTypes = [{
  id: 'testType',
}, {
  id: 'testType2',
}];

describe('<KeystoreCreationForm />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <KeystoreCreationForm
        hideMenu
        formData={formData}
        formChange={jest.fn}
        resetFormData={jest.fn}
        keystoreTypes={keystoreTypes}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
