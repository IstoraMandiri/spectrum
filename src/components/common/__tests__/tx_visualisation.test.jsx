import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import TxVisualisation from '../tx_visualisation';

jest.mock('semantic-ui-react');

const items = [{
  header: 'test header 1',
  icon: 'testIcon1',
  subheader: 'test subheader 1',
  data: 'test data 1',
  color: 'blue',
  dataLink: '/test-link-1',
}, {
  header: 'test header 2',
  icon: 'testIcon2',
  subheader: 'test subheader 2',
  data: 'test data 2',
  color: 'white',
  dataLink: '/test-link-2',
}];

describe('<TxVisualisation />', () => {
  test('renders correctly', () => {
    const component = shallow(
      <TxVisualisation
        items={items}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});
