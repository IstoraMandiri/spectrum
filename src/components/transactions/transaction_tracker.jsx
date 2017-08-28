import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Loader, Divider, Label, Icon, Table } from 'semantic-ui-react';

import Web3Connect from '~/helpers/web3/connect';
import { getNetworks } from '~/selectors';

import SuccessHeader from '~/components/common/success_header';

class TransactionTracker extends Component {
  static propTypes = {
    networks: PropTypes.array.isRequired,
    txHash: PropTypes.string.isRequired,
    networkId: PropTypes.string.isRequired,
    broadcast: PropTypes.object.isRequired,
    renderConfirmation: PropTypes.func,
    onMined: PropTypes.func.isRequired,
    formData: PropTypes.object.isRequired,
    web3Redux: PropTypes.object.isRequired,
    renderFailure: PropTypes.func,
    handleValidation: PropTypes.func.isRequired,
    failure: PropTypes.bool,
  }
  static defaultProps = {
    renderConfirmation: undefined,
    renderFailure: undefined,
    onMined: undefined,
    failure: false,
  }
  componentDidMount() {
    const { networkId, web3Redux, txHash, onMined, handleValidation } = this.props;
    const web3 = web3Redux.web3(networkId);
    web3.eth.waitForMined(txHash).then((txData) => {
      onMined(txData, web3);
      handleValidation(txData, web3);
    });
  }
  renderConfirmation() {
    return (
      <SuccessHeader title="Confirmed">
        Transaction was Succesful
      </SuccessHeader>
    );
  }
  renderFailure() {
    return (
      <SuccessHeader title="Failed" failure>
        Something went wrong!
      </SuccessHeader>
    );
  }
  renderStatus(transaction) {
    const { failure, renderConfirmation, renderFailure, txHash, networkId, broadcast, formData } = this.props;
    const props = {
      txHash,
      networkId,
      broadcast,
      formData,
      transaction,
    };
    if (failure) {
      return renderFailure ? renderFailure(props) : this.renderFailure(props);
    }
    return renderConfirmation ? renderConfirmation(props) : this.renderConfirmation(props);
  }
  render() {
    const { broadcast, networkId, web3Redux, networks, txHash } = this.props;
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
            {this.renderStatus(transaction)}
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
