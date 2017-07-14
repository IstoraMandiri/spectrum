jest.mock('react-redux', () => ({
    connect: () => component => component
}));

import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import NetworkTokensSelector from '../network_tokens_selector';

describe('<NetworkTokensSelector />', () => {
	test('renders correctly', () => {
    const component = shallow(
      <NetworkTokensSelector 
      	formData={{}}
      	formChange={jest.fn}
      	networks={[]}
      	defaultNetworks={[]}
      />
    );

    expect(toJson(component)).toMatchSnapshot();
	});
});