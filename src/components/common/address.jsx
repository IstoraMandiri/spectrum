import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';

import getBlockie from '~/helpers/blockie';

export default class Address extends Component {
  static propTypes = {
    address: PropTypes.string.isRequired,
    short: PropTypes.bool,
  };
  static defaultProps = {
    short: false,
  }
  render() {
    const { address, short } = this.props;
    return (
      <div className="spectrum-address">
        <Image avatar src={getBlockie(address)} />
        <code className="address" style={{ width: short ? '10em' : undefined }}>{address}</code>
      </div>
    );
  }
}
