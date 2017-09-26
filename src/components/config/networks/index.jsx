import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Segment, Button, Header } from 'semantic-ui-react';
import EZModal from 'sui-react-ezmodal';

import web3Connect from '~/helpers/web3/connect';
import { createNetwork, updateNetwork, deleteNetwork } from '~/actions/network';
import { getNetworks } from '~/selectors';

import Network from './network';
import NetworkForm from './network_form';

class Networks extends Component {
  static propTypes = {
    networks: PropTypes.array.isRequired,
    web3Redux: PropTypes.object.isRequired,
    createNetwork: PropTypes.func.isRequired,
  }
  renderNetworks() {
    const { web3Redux, networks } = this.props;
    return networks.map((network) => {
      const web3 = web3Redux.web3(network.id);
      return <Network {...this.props} key={network.id} {...{ network, web3 }} />;
    });
  }
  render() {
    return (
      <Grid>
        <Grid.Column width={7}>
          <Header>
            Networks
            <Header.Subheader>Configure your Connection</Header.Subheader>
          </Header>
        </Grid.Column>
        <Grid.Column width={9} textAlign="right">
          <EZModal
            header="Create New Network"
            trigger={<Button basic icon="plus" content="Create" />}
            handleSubmit={this.props.createNetwork}
            content={props => <NetworkForm {...props} />}
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Segment.Group>
            {this.renderNetworks()}
          </Segment.Group>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({ networks: getNetworks(state) });

const actions = {
  createNetwork,
  updateNetwork,
  deleteNetwork,
};

export default web3Connect(connect(mapStateToProps, actions)(Networks));
