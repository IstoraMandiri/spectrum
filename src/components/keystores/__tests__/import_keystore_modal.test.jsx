import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import ImportKeystoreModal from '../import_keystore_modal';

describe('<ImportKeystoreModal />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <ImportKeystoreModal
        trigger={<div />}
        createKeystore={jest.fn}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
