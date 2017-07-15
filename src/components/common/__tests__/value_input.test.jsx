import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ValueInput from '../value_input';

jest.mock('../../../helpers/stringUtils');

const formData = {
  testForm: 'test',
};

const sendAll = {
  toNumber: () => 1,
};

describe('<ValueInput />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <ValueInput
        color="red"
        formChange={jest.fn}
        formData={formData}
        name="testForm"
        symbol="GBP"
        sendAll={sendAll}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
