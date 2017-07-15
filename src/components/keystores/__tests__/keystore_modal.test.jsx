import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import KeystoreModal from '../keystore_modal';

jest.mock('react-redux', () => ({
  connect: () => component => component,
}));

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

describe('<KeystoreModal />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <KeystoreModal
        submitFunc={jest.fn}
        keystoreTypes={keystoreTypes}
        form={() => <div />}
        trigger={<div />}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
