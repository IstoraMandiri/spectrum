import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Label, Header, Segment } from 'semantic-ui-react';
import EZModal from 'sui-react-ezmodal';

import NetworkStatus from '~/components/common/network_status';
import NetworkForm from './network_form';

export default class Network extends Component {
  static propTypes = {
    web3: PropTypes.object,
    network: PropTypes.object.isRequired,
    updateNetwork: PropTypes.func.isRequired,
    deleteNetwork: PropTypes.func.isRequired,
  }
  static defaultProps = {
    web3: undefined,
  }
  render() {
    const { network, updateNetwork, deleteNetwork, web3 } = this.props;
    return (
      <EZModal
        header={`Edit Network - ${network.name}`}
        data={network}
        trigger={
          <Segment style={{ cursor: 'pointer' }}>
            <Label ribbon basic color={network.color || 'white'} image={!!network.image}>
              {network.image && <img alt="" src={network.image} />}
              {network.name}
            </Label>
            <Header size="tiny" disabled as="span">{network.description}</Header>
            <NetworkStatus network={network} web3={web3} />
            <Segment>{network.provider}</Segment>
          </Segment>
        }
        handleSubmit={updateNetwork}
        content={props => <NetworkForm {...props} />}
        handleRemove={formData => deleteNetwork(formData.id)}
      />
    );
  }
}
