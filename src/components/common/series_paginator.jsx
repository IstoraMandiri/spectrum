import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PaginationMenu from '~/components/common/pagination_menu';

import { Menu, Table } from 'semantic-ui-react';

const initialState = { page: 0, sort: -1, loading: true, itemsPerPage: 5, totalItems: 0, items: [] };

export default class SeriesPaginator extends Component {
  static propTypes = {
    getLatest: PropTypes.func.isRequired,
    getTotal: PropTypes.func.isRequired,
    renderItem: PropTypes.func,
    renderContainer: PropTypes.func,
    renderBefore: PropTypes.func,
    renderNoItems: PropTypes.func,
    renderLoading: PropTypes.func,
  }
  static defaultProps = {
    renderItem: undefined,
    renderContainer: undefined,
    renderBefore: undefined,
    renderNoItems: undefined,
    renderLoading: undefined,
  }
  constructor(props) {
    super(props);
    this.state = initialState;
    this.getLatest = this.getLatest.bind(this);
    this.getInitial = this.getInitial.bind(this);
    this.renderItems = this.renderItems.bind(this);
    this.handleNavigate = this.handleNavigate.bind(this);
    this.handleToggleSort = this.handleToggleSort.bind(this);
    this.reset = this.reset.bind(this);
  }
  componentDidMount() {
    this.getInitial();
  }
  componentWillUnmount() {
    this.unmounted = true;
  }
  getInitial() {
    this.setState({ loading: true });
    this.props.getTotal()
      .then(totalItems => this.setState({ ...this.state, totalItems }))
      .then(() => setTimeout(this.getLatest(), 1));
  }
  getLatest() {
    // calculate indexes, pass to getter
    this.setState({ loading: true });
    const { page, totalItems, itemsPerPage, sort } = this.state;
    let start = page * itemsPerPage;
    let last = start + itemsPerPage;
    if (sort !== 1) {
      start = totalItems - last;
      last = start + itemsPerPage;
    }
    last = totalItems > last ? last : totalItems;
    this.props.getLatest(start < 0 ? 0 : start, last < 0 ? 0 : last)
      .then((res) => {
        const items = res.map(bn => bn.toNumber());
        this.setState({ items: sort !== 1 ? items.reverse() : items, loading: false });
      });
  }
  reset() {
    this.setState(initialState);
    setTimeout(() => this.getInitial(), 1);
  }
  handleNavigate(dir) {
    this.setState({ page: this.state.page + dir });
    setTimeout(() => this.getLatest(), 1);
  }
  handleToggleSort() {
    this.setState({ sort: this.state.sort === 1 ? -1 : 1 });
    setTimeout(() => this.getInitial(), 1);
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
    const { getLatest, getInitial, reset } = this;
    if (this.state.loading) {
      return renderLoading ? renderLoading() : this.renderMissingItem({ text: 'Loading...' });
    }
    if (this.state.items.length === 0) {
      return renderNoItems ? renderNoItems() : this.renderMissingItem();
    }
    return this.state.items.map((id) => {
      if (renderItem) {
        return renderItem(id, { getLatest, getInitial, reset });
      }
      return <div>{id}</div>;
    });
  }
  render() {
    const { renderContainer, renderBefore } = this.props;
    const { renderItems, getLatest, getInitial, reset } = this;
    const { page, itemsPerPage, totalItems } = this.state;
    if (!renderContainer) {
      return <div>{renderItems()}</div>;
    }
    return (
      <div>
        {renderBefore && renderBefore({ getLatest, getInitial, reset })}
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
        {renderContainer({ renderItems, getLatest, getInitial, reset })}
      </div>
    );
  }
}
