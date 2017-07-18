import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import V3KeystoreDownloadButton from '../v3_keystore_download_button';

const keystore = {
  id: 1,
  data: {
    address: '0x1435345',
  },
  addresses: [{
    address: '0x12345',
  }, {
    address: '0x1234567',
  }],
};

describe('<V3KeystoreDownloadButton />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <V3KeystoreDownloadButton
        keystore={keystore}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
