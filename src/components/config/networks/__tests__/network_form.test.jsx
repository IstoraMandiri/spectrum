import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import NetworkForm from '../network_form';

describe('<NetworkForm />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <NetworkForm
        formChange={jest.fn}
        formData={{
          enabled: true,
        }}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
