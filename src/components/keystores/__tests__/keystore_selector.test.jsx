import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import KeystoreSelector from '../keystore_selector';

const keystoreTypes = [{
  id: 1,
  name: 'keystore test 1',
  icon: 'testIcon',
  color: 'blue',
  subtitle: 'test subtitle',
}, {
  id: 2,
  name: 'keystore test 2',
  icon: 'testIcon2',
  color: 'black',
  subtitle: 'test subtitle 2',
}];

describe('<KeystoreSelector />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <KeystoreSelector
        formChange={jest.fn}
        formData={{}}
        keystoreTypes={keystoreTypes}
        resetFormData={jest.fn}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
