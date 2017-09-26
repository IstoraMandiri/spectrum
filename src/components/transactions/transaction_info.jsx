import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getUI } from '~/helpers/uiRegistry';
import TransactionInfoTable from './transaction_info_table';

export default class TransactionInfo extends Component {
  static propTypes = {
    ui: PropTypes.object,
    txData: PropTypes.object.isRequired,
  }
  static defaultProps = {
    ui: undefined,
  }
  render() {
    const { ui, txData } = this.props;
    const defaultRender = <TransactionInfoTable {...{ txData }} open />;
    if (!ui) { return defaultRender; }
    const uiEntry = getUI(ui.type);
    if (!uiEntry || !uiEntry.component) { return defaultRender; }
    const TransactionUI = uiEntry.component;
    return (
      <div>
        <TransactionUI {...this.props} />
        <TransactionInfoTable {...{ txData }} />
      </div>
    );
  }
}
