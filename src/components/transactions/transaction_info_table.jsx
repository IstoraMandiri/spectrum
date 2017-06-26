import React, { PropTypes, Component } from 'react';
import { Table, Button } from 'semantic-ui-react';

import { parseBigNumber, camelToCapitalized } from '~/helpers/stringUtils';

const numberValues = {
  gasPrice: true,
  nonce: true,
  gas: true,
  value: true,
};

export default class TransactionInfoTable extends Component {
  static propTypes = {
    open: PropTypes.bool,
    txData: PropTypes.object.isRequired,
  }
  static defaultProps = {
    open: false,
  }
  constructor(props) {
    super(props);
    this.state = { open: false };
  }
  renderTable() {
    const { txData } = this.props;
    return (
      <Table definition>
        <Table.Body>
          {Object.keys(txData).map((key) => {
            const value = txData[key];
            return (
              <Table.Row key={key}>
                <Table.Cell style={{ minWidth: '8em' }}>{camelToCapitalized(key)}</Table.Cell>
                <Table.Cell>
                  <span className="wrapping">{numberValues[key] ? parseBigNumber(value, 0, false) : value}</span>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    );
  }
  render() {
    if (this.props.open) { return this.renderTable(); }
    const { open } = this.state;
    return (
      <div>
        <div style={{ textAlign: 'center' }}>
          <Button
            basic
            content="Details"
            size="mini"
            icon={`angle double ${open ? 'up' : 'down'}`}
            onClick={(e) => { e.preventDefault(); this.setState({ open: !open }); }}
          />
        </div>
        {this.state.open && this.renderTable()}
      </div>
    );
  }
}
