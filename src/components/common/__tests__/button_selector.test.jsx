import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import ButtonSelector from '../button_selector';

const items = [{
  id: 1,
  text: 'testing 1',
  name: 'test1',
  color: 'blue',
}, {
  id: 2,
  text: 'testing 2',
  name: 'test2',
  color: 'black',
}, {
  id: 3,
  text: 'testing 3',
  name: 'test3',
  color: 'red',
}];

describe('<ButtonSelector />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <ButtonSelector
        items={items}
        formData={{ name: 'Test' }}
        formChange={jest.fn}
        name="Button selector test"
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
