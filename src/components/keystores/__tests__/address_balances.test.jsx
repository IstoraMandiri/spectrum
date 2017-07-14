// jest.mock('../../../helpers/web3/connect', component => component);

import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import AddressBalances from '../address_balances';

const address = {
  networks: [{
  	id: 1,
  }, {
  	id: 2,
  }]
}

describe('<AddressBalances />', () => {
	test.skip('renders correctly', () => {
    const component = shallow(
      <AddressBalances 
      	address={address}
      	web3Redux={{}}
      />
    );

    expect(toJson(component)).toMatchSnapshot();
	});
});