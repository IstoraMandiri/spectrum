import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import NetworkForm from '../network_form';

const network = {
  name: 'testNetwork',
  color: 'blue',
  image: 'test.png',
  description: 'test description',
};

describe('<NetworkForm />', () => {
	test('renders correctly', () => {
    const component = shallow(
      <NetworkForm 
      	formChange={jest.fn}
        formData={{
          enabled: true,
        }}
      />
    );

    expect(toJson(component)).toMatchSnapshot();
	});
});