import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PaginationMenu from '~/components/common/pagination_menu';

import AddressInput from '~/components/common/address_input';
import { isAddress } from '~/helpers/stringUtils';

import { Segment, Menu, Table } from 'semantic-ui-react';

export default class DllPaginator extends Component {
  static propTypes = {
    getFirst: PropTypes.func.isRequired,
    getNext: PropTypes.func.isRequired,
    getLast: PropTypes.func.isRequired,
    getPrevious: PropTypes.func.isRequired,
    search: PropTypes.bool,
    renderItem: PropTypes.func,
    renderContainer: PropTypes.func,
    renderNoItems: PropTypes.func,
    renderLoading: PropTypes.func,
    totalItems: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    // TODO itemsPerPage
  };
  static defaultProps = {
    search: undefined,
    renderItem: undefined,
    renderContainer: undefined,
    renderNoItems: undefined,
    renderLoading: undefined,
    totalItems: undefined,
  }
  constructor(props) {
    super(props);
    this.state = { items: [], sort: -1, loading: true, itemsPerPage: 10, page: 0 };
    this.getItem = this.getItem.bind(this);
    this.getLatest = this.getLatest.bind(this);
    this.renderItems = this.renderItems.bind(this);
    this.handleNavigate = this.handleNavigate.bind(this);
    this.handleToggleSort = this.handleToggleSort.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
  }
  componentDidMount() {
    this.getInitial();
  }
  componentWillUnmount() {
    this.unmounted = true;
  }
  getInitial() {
    this.setState({ page: 0, items: [], loading: true });
    const method = this.props.getLast && this.state.sort === -1 ? 'getLast' : 'getFirst';
    this.props[method]().then((firstItem) => {
      if (this.unmounted) { return null; }
      if (!firstItem || firstItem.id === '0x0000000000000000000000000000000000000000') {
        return this.setState({ loading: false });
      }
      this.setState({ items: [firstItem], loading: false });
      return this.getItem(firstItem.id, 1);
    });
  }
  getSearchInitial() {
    // query the pagination system to get the address result
    const { searchAddress } = this.state;
    const sa = searchAddress.toLowerCase();
    this.setState({ page: 0, loading: true, items: [] });
    return this.props.getNext(sa)
      .then((nextItem) => {
        if (!nextItem || nextItem.id === '0x0000000000000000000000000000000000000000' || nextItem.id === sa) {
        // no good, try getting previous
          return false;
        }
        // it is good, return this value
        return this.props.getPrevious(nextItem.id);
      })
      .then((res) => {
        if (res) { return res; }
        // see if we're the fisrt in the collection
        return this.props.getFirst().then(firstItem => (firstItem && firstItem.id === sa ? firstItem : false));
      })
      .then((res) => {
      // finally try getting previous
        if (res) { return res; }
        return this.props.getPrevious(sa)
          .then((previousItem) => {
            if (!previousItem || previousItem.id === '0x0000000000000000000000000000000000000000' || previousItem.id === sa) {
              return false;
            }
            // it's good, return this value
            return this.props.getNext(previousItem.id);
          });
      })
      .then((res) => {
        if (!res || res.id !== sa) {
          return this.setState({ loading: false });
        }
        return this.setState({ items: [res], loading: false });
      });
  }
  getItem(id, direction) {
    if (direction) {
      const { page, items, itemsPerPage } = this.state;
      if (items.length >= ((page * itemsPerPage) + itemsPerPage)) {
        return null;
      }
      const nextIndex = items.length;
      const method = this.props.getPrevious && this.state.sort === -1 ? 'getPrevious' : 'getNext';
      return this.props[method](id).then((nextItem) => {
        if (!this.unmounted
          && nextItem
          && nextItem.id !== '0x0000000000000000000000000000000000000000'
          && nextItem.id !== id
        ) {
          const newItems = items.slice();
          newItems[nextIndex] = nextItem;
          this.setState({ items: newItems });
          this.getLatest();
        }
      });
    }
    return null;
  }
  getLatest() {
    const { items } = this.state;
    if (items.length > 0) {
      this.getItem(items[items.length - 1].id, 1);
    } else {
      this.getInitial();
    }
  }
  handleNavigate(dir) {
    this.setState({ page: this.state.page + dir });
    setTimeout(() => this.getLatest(), 1);
  }
  handleToggleSort() {
    this.setState({ sort: this.state.sort === 1 ? -1 : 1 });
    setTimeout(() => this.getInitial(), 1);
  }
  handleAddressChange({ target: { value: searchAddress } }) {
    if (isAddress(searchAddress) && searchAddress !== this.state.searchAddress) {
      this.setState({ searchAddress });
      setTimeout(() => this.getSearchInitial(), 1);
    } else if (!searchAddress && this.state.searchAddress) {
      this.setState({ searchAddress: false });
      setTimeout(() => this.getInitial(), 1);
    }
  }
  renderMissingItem({ text } = {}, i) {
    return (
      <Table.Row key={i}>
        <Table.Cell
          disabled
          colSpan={100}
          textAlign="center"
          content={text || 'No Items'}
        />
      </Table.Row>
    );
  }
  renderItems() {
    const { renderItem, renderNoItems, renderLoading } = this.props;
    const { getLatest, getInitial } = this;
    const { itemsPerPage, page } = this.state;
    const startingItem = page * itemsPerPage;
    const items = this.state.items.slice(startingItem, startingItem + itemsPerPage);
    if (this.state.loading) {
      return renderLoading ? renderLoading() : this.renderMissingItem({ text: 'Loading...' });
    }
    if (this.state.items.length === 0) {
      return renderNoItems ? renderNoItems() : this.renderMissingItem();
    }
    return items.map((id) => {
      if (renderItem) {
        return renderItem(id, { getLatest, getInitial });
      }
      return <div>{id}</div>;
    });
  }
  renderSearchResults() {
    const { renderContainer } = this.props;
    const { renderItems } = this;
    return (
      renderContainer({ renderItems })
    );
  }
  renderTable() {
    const { renderContainer, totalItems } = this.props;
    const { renderItems, getLatest, getInitial } = this;
    const { page, itemsPerPage } = this.state;
    if (!renderContainer) {
      return <div>{renderItems()}</div>;
    }
    return (
      <div>
        <PaginationMenu
          attached="top"
          fluid
          widths={4}
          renderCenter={({ firstItem, lastItem, total }) => [
            <Menu.Item
              key={0}
            >
              {firstItem} - {total && lastItem < total ? lastItem : `${total || lastItem}`} of {`${total || '?'}`}
            </Menu.Item>,
            <Menu.Item
              key={1}
              as="a"
              active={this.state.sort === 1}
              icon={`sort numeric ${this.state.sort === 1 ? 'ascending' : 'descending'}`}
              content={`${this.state.sort === 1 ? 'Oldest' : 'Newest'} first`}
              color="blue"
              onClick={this.handleToggleSort}
            />,
          ]}
          currentPage={page}
          itemsPerPage={itemsPerPage}
          total={totalItems}
          handleNavigate={this.handleNavigate}
        />
        {renderContainer({ renderItems, getLatest, getInitial })}
      </div>
    );
  }
  renderSearchBox() {
    return (
      <Segment>
        <AddressInput
          value={this.state.searchAddress || ''}
          hideDropdown
          name="test"
          placeholder="Enter an Asset ID to search"
          onChange={this.handleAddressChange}
        />
      </Segment>
    );
  }
  render() {
    return (
      <div>
        {this.props.search && this.renderSearchBox()}
        {this.state.searchAddress ? this.renderSearchResults() : this.renderTable()}
      </div>
    );
  }
}
