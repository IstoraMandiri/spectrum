import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import KeystoreButtons from '../keystore_buttons';

jest.mock('react-redux', () => ({
  connect: () => component => component,
}));

describe('<KeystoreButtons />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <KeystoreButtons
        createKeystore={jest.fn}
        keystoreTypes={[]}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
