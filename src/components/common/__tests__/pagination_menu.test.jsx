import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import PaginationMenu from '../pagination_menu';

describe('<PaginationMenu />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <PaginationMenu
        currentPage={1}
        itemsPerPage={10}
        total={50}
        handleNavigate={jest.fn}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
