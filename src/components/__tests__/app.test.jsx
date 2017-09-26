import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import App from '../app';

jest.mock('react-redux', () => ({
  connect: () => component => component,
}));

describe('<App />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <App ready />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
