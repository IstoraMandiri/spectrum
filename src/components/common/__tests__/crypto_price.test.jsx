import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import CryptoPrice from '../crypto_price';

jest.mock('react-redux', () => ({
  connect: () => component => component,
}));

const cryptoPrices = {
  available: ['Test'],
  prices: {
    GBP: 10,
    selected: 'GBP',
  },
  selected: 'GBP',
};

describe('<CryptoPrice />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <CryptoPrice
        ammount={400}
        cryptoPrices={cryptoPrices}
        getPrices={jest.fn}
        setSelectedCurrency={jest.fn}
        symbol="GBP"
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
