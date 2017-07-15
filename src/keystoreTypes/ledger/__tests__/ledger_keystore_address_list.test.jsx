import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import LedgerKeystoreAddressList from '../ledger_keystore_address_list';

const config = {
  version: 1,
};

const ethLedger = {
  getAddress_async: () => jest.fn,
};

describe('<LedgerKeystoreAddressList />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <LedgerKeystoreAddressList
        ethLedger={ethLedger}
        config={config}
        renderContainer={jest.fn}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
