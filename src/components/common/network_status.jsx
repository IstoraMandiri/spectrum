import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Label } from 'semantic-ui-react';

export default class NetworkStatus extends Component {
  static propTypes = {
    name: PropTypes.bool,
    network: PropTypes.object.isRequired,
    web3: PropTypes.object,
  }
  static defaultProps = {
    web3: undefined,
    name: false,
  }
  render() {
    const { web3, network, name } = this.props;
    const status = {
      connected: { content: 'Connected', color: 'green', icon: 'checkmark' },
      disconnected: { content: 'No Connection', color: 'red', icon: 'unlinkify' },
      disabled: { content: 'Disabled', icon: 'remove' },
      connecting: { content: 'Connecting...', color: 'orange', icon: 'wait' },
    }[web3 ? web3.connectionStatus() : 'disabled'];
    return (
      <Label
        {...status}
        content={name ? network.name : status.content}
        style={{ float: 'right' }}
      />
    );
  }
}
