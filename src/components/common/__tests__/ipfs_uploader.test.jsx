import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import IpfsUploader from '../ipfs_uploader';

describe('<IpfsUploader />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <IpfsUploader
        name="Ipfs test"
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
