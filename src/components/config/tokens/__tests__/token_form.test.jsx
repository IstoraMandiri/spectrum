import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import TokenForm from '../token_form';

describe('<TokenForm />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <TokenForm
        formData={{}}
        formChange={jest.fn}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
