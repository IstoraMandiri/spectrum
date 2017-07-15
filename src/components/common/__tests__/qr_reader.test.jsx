import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import QrReader from '../qr_reader';

describe('<QrReader />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <QrReader
        onScan={jest.fn}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
