jest.mock('semantic-ui-react');

import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import KeystoreMenu from '../keystore_menu';

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

describe('<KeystoreMenu />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <KeystoreMenu
        formChange={jest.fn}
        keystoreTypes={keystoreTypes}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
