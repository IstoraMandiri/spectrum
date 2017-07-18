import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import ColorPicker from '../color_picker';

describe('<ColorPicker />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <ColorPicker
        formData={{ color: 'black' }}
        formChange={jest.fn}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
