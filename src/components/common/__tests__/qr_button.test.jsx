import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import QrButton from '../qr_button';

describe('<QrButton />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <QrButton
        onScan={jest.fn}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
