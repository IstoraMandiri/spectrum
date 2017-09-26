import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Label } from 'semantic-ui-react';

export default class BalanceLabel extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };
  static defaultProps = {
    value: '?',
  }
  render() {
    const { item, value } = this.props;
    const color = value && item.color ? item.color : undefined;
    return (
      <Label as="a" color={color} className="padded">
        {value}
        <Label.Detail>{item.symbol}</Label.Detail>
      </Label>
    );
  }
}
