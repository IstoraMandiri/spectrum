import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import EntropyGenerator from '../entropy_generator';

describe('<EntropyGenerator />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <EntropyGenerator
        handleSubmit={jest.fn}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
