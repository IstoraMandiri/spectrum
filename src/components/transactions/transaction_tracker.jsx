import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Loader, Divider, Header, Label, Icon, Table } from 'semantic-ui-react';

import { getNetworks } from '~/selectors';

import Web3Connect from '~/helpers/web3/connect';

class TransactionTracker extends Component {
  static propTypes = {
    networks: PropTypes.array.isRequired,
    txHash: PropTypes.string.isRequired,
    networkId: PropTypes.string.isRequired,
    broadcast: PropTypes.object.isRequired,
    renderConfirmation: PropTypes.func,
    onMined: PropTypes.func,
    web3Redux: PropTypes.object.isRequired,
  }
  static defaultProps = {
    renderConfirmation: undefined,
    onMined: undefined,
  }
  componentDidMount() {
    const { networkId, web3Redux, txHash, onMined } = this.props;
    const web3 = web3Redux.web3(networkId);
    web3.eth.waitForMined(txHash).then(txData => onMined && onMined({ txData, txHash }, web3));
  }
  renderConfirmation() {
    return (
      <Header as="h2" color="green" icon textAlign="center">
        <Icon name="checkmark" />
        Confirmed
        <Header.Subheader>
          Transaction was succesful
        </Header.Subheader>
      </Header>
    );
  }
  render() {
    const { broadcast, networkId, web3Redux, networks, txHash, renderConfirmation } = this.props;
    const web3 = web3Redux.web3(networkId);
    if (!web3) { return <Loader active />; }
    const network = networks.find(({ id }) => id === web3.networkId);
    const { explorerTransactionPrefix, explorerBlockPrefix } = network;
    const transaction = web3.eth.transaction(txHash);
    const { blockNumber } = transaction || {};
    const linkParams = explorerTransactionPrefix ? {
      as: 'a',
      href: `${explorerTransactionPrefix}${txHash}`,
      target: '_blank',
      rel: 'noopener noreferrer',
    } : {};
    const outOfGas = (new Date() - broadcast) > 20 * 1000;
    const href = `${explorerTransactionPrefix}${txHash}`;
    return (
      <div>
        {blockNumber &&
          <div>
            {renderConfirmation ? renderConfirmation(transaction) : this.renderConfirmation(transaction)}
            <Divider hidden />
          </div>
        }
        <Table>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Transaction</Table.Cell>
              <Table.Cell>
                {!explorerTransactionPrefix ? txHash : <a href={href} rel="noopener noreferrer" target="_blank">{txHash}</a>}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Status</Table.Cell>
              <Table.Cell>
                <Label {...linkParams} color={blockNumber ? 'green' : 'orange'}>
                  <Icon loading={!blockNumber} name={blockNumber ? 'checkmark' : 'circle notched'} />
                  {blockNumber ? 'Created' : 'Pending'}
                </Label>
                {!blockNumber && outOfGas &&
                  <Label as="a" rel="noopener noreferrer" target="_blank" href={href} color="red" content="Out of Gas?" />
                }
                {blockNumber &&
                  <span>
                    {' '}in block{' '}
                    {!explorerBlockPrefix ?
                      `#${blockNumber}` :
                      <a href={href} rel="noopener noreferrer" target="_blank">#{blockNumber}</a>
                    }
                  </span>
                }
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default Web3Connect(connect(s => ({ networks: getNetworks(s) }))(TransactionTracker));
