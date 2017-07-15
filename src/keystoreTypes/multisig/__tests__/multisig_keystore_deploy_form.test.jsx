import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import MultisigKeystoreDeployForm from '../multisig_keystore_deploy_form';

describe('<MultisigKeystoreDeployForm />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <MultisigKeystoreDeployForm
        formData={{}}
        formChange={jest.fn}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
