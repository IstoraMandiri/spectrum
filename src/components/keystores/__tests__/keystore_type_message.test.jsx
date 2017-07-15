import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import KeystoreTypeMessage from '../keystore_type_message';

jest.mock('semantic-ui-react');

const keystoreType = {
  id: 1,
  name: 'keystore test 1',
  icon: 'testIcon',
  color: 'blue',
  description: 'test description',
};

describe('<KeystoreTypeMessage />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <KeystoreTypeMessage keystoreType={keystoreType} />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
