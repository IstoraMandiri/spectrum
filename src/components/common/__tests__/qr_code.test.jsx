import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import QrCode from '../qr_code';

describe('<QrCode />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <QrCode
        data="qr code test"
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
