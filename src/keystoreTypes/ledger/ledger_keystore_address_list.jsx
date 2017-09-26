import React, { Component } from 'react';
import PropTypes from 'prop-types';
import mapSeries from 'promise-map-series';

import { LEDGER_ETH_KD_PATH } from '~/helpers/constants';
import PaginationMenu from '~/components/common/pagination_menu';

const itemsPerPage = 5;

export default class LedgerAddressList extends Component {
  static propTypes = {
    ethLedger: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    renderItem: PropTypes.func,
    renderContainer: PropTypes.func,
  }
  static defaultProps = {
    renderItem: undefined,
    renderContainer: undefined,
  }

  constructor(props) {
    super(props);
    this.state = { currentPage: 0, items: {}, loading: true };
    this.handleNavigate = this.handleNavigate.bind(this);
    this.renderItems = this.renderItems.bind(this);
  }
  componentDidMount() {
    this.getPage();
  }
  getPageItems() {
    const start = this.state.currentPage * itemsPerPage;
    return Array(itemsPerPage).fill().map((x, i) => {
      const n = i + start;
      const kdPath = `${LEDGER_ETH_KD_PATH}${n}`;
      return { n, kdPath };
    });
  }
  getPage() {
    this.setState({ loading: true });
    new Promise(resolve => setTimeout(resolve, 1))
      .then(() => {
        const { currentPage } = this.state;
        return mapSeries(this.getPageItems(), ({ n, kdPath }) =>
          new Promise((resolve, reject) => {
            if (currentPage !== this.state.currentPage) { return reject(); }
            if (this.state.items[kdPath]) { return resolve(this.state.items[kdPath]); }
            return this.props.ethLedger.getAddress_async(kdPath).then((address) => {
              this.setState({ items: { ...this.state.items, [kdPath]: { ...address, kdPath, n } } });
              resolve(address);
            })
            /* eslint-disable no-console */
              .fail(console.error);
          /* eslint-enable no-console */
          }),
        );
      }).then(() => { this.setState({ loading: false }); });
  }
  handleNavigate(direction) {
    const currentPage = this.state.currentPage + direction;
    this.setState({ currentPage });
    this.getPage();
  }
  renderNavigation() {
    const { loading, currentPage } = this.state;
    return (
      <PaginationMenu
        handleNavigate={this.handleNavigate}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        disabled={() => loading}
      />
    );
  }
  renderItems() {
    const { renderItem } = this.props;
    return this.getPageItems().map(({ kdPath }) => {
      const item = this.state.items[kdPath];
      if (renderItem) { return renderItem({ ...item, kdPath }); }
      return <div>{item.address}</div>;
    });
  }
  renderContainer() {
    const { renderContainer } = this.props;
    const { renderItems } = this;
    if (renderContainer) { return renderContainer({ renderItems }); }
    return renderItems();
  }
  render() {
    return (
      <div>
        <div style={{ float: 'right' }}>Ledger {this.props.config.version}</div>
        {this.renderNavigation()}
        {this.renderContainer()}
      </div>
    );
  }
}
