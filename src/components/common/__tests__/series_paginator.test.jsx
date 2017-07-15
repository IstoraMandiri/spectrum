import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import SeriesPaginator from '../series_paginator';

describe('<SeriesPaginator />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <SeriesPaginator
        getLatest={jest.fn}
        getTotal={jest.fn}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
