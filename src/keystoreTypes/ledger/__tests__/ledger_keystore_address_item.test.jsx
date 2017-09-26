import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import LedgerKeystoreAddressItem from '../ledger_keystore_address_item';

jest.mock('../../../helpers/blockie');

const data = {
  name: 'test name',
  enabled: true,
};

describe('<LedgerKeystoreAddressItem />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <LedgerKeystoreAddressItem
        address="0x12345"
        kdPath="test path"
        onChange={jest.fn}
        data={data}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
