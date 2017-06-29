import React from 'react';
import renderer from 'react-test-renderer';

import Advanced from '~/components/common/advanced';

it('renders with default title', () => {
  const tree = renderer.create(<Advanced>Test</Advanced>).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders with custom title', () => {
  const tree = renderer.create(<Advanced title="test">Test</Advanced>).toJSON();
  expect(tree).toMatchSnapshot();
});
