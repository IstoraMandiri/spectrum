import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import DownloadJsonButton from '../download_json_button';

describe('<DownloadJsonButton />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <DownloadJsonButton getFileInfo={jest.fn} />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
