import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import QrMultiButton from '../qr_multi_button';

describe('<QrMultiButton />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <QrMultiButton
        onScan={jest.fn}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
