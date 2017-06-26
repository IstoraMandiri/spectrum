import React, { PropTypes, Component } from 'react';
import { Divider, Header, Label, Icon, Table } from 'semantic-ui-react';

export default class TransactionTracker extends Component {
  static propTypes = {
    web3: PropTypes.object.isRequired,
    network: PropTypes.object.isRequired,
    txHash: PropTypes.string.isRequired,
    broadcast: PropTypes.object.isRequired,
    renderConfirmation: PropTypes.func,
  }
  static defaultProps = {
    renderConfirmation: undefined,
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
    const { broadcast, web3, network, txHash, renderConfirmation } = this.props;
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
                  <Label as="a" rel="noopener noreferrer" target="_blank" href={href} color="red" text content="Out of Gas?" />
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
