import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import IpfsImage from '../ipfs_image';

describe('<IpfsImage />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <IpfsImage
        hex="c3fe5d8e37077276d7a978231c63116ef706195e0cbb97cef1ec12559ed161b2"
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
