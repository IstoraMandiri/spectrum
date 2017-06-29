import React from 'react';
import renderer from 'react-test-renderer';

import ErrorMessage from '~/components/common/error_message';

it('renders correctly', () => {
  const tree = renderer.create(<ErrorMessage content="test" />).toJSON();
  expect(tree).toMatchSnapshot();
});
