import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import TransactionInfoTable from '../transaction_info_table';

jest.mock('../../../helpers/stringUtils', () => ({
  parseBigNumber: () => 20,
}));

const txData = {
  tx1: 10,
  tx2: 20,
  tx3: 30,
};

describe('<TransactionInfoTable />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <TransactionInfoTable txData={txData} />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
