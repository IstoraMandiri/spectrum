import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import DefaultAddressSelector from '../default_address_selector';

jest.mock('react-redux', () => ({
  connect: () => component => component,
}));
jest.mock('../../../components/keystores/keystore_buttons');

describe('<DefaultAddressSelector />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <DefaultAddressSelector
        addresses={[]}
        updateSession={jest.fn}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
