import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Dimmer, Loader, Table } from 'semantic-ui-react';

import PaginationMenu from './pagination_menu';

export default class ReduxPaginator extends Component {
  static propTypes = {
    renderError: PropTypes.func.isRequired,
    renderLoading: PropTypes.func.isRequired,
    renderMissing: PropTypes.func.isRequired,
    actions: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired,
    onRowClick: PropTypes.func,
  }
  static defaultProps = {
    onRowClick: undefined,
  }
  componentDidMount() {
    const { actions: { updateConfig, fetchData } } = this.props;
    fetchData().then(() => {
      const { data: { meta: { total, page, perPage } } } = this.props;
      const lastPage = Math.ceil(total / perPage);
      if (page > lastPage) {
        updateConfig({ page: lastPage });
      }
    });
  }
  renderPagination() {
    const { actions: { updateConfig }, data: { meta, loading } } = this.props;
    return (
      <PaginationMenu
        fluid
        widths={5}
        currentPage={meta.page - 1}
        itemsPerPage={meta.perPage}
        total={meta.total}
        handleWarp={page => updateConfig({ page })}
        handleNavigate={dir => updateConfig({ page: meta.page + dir })}
        renderCenter={({ total, firstItem, lastItem }) => (
          <Dropdown
            item
            trigger={
              <span>
                {loading && <Dimmer inverted active><Loader size="mini" /></Dimmer>}
                {firstItem} - {lastItem} of {total}
              </span>
            }
          >
            <Dropdown.Menu>
              <Dropdown.Header icon="numbered list" content="Items per page" />
              {[10, 25, 50, 100, 500, 1000].map(n => (
                <Dropdown.Item
                  active={n === meta.perPage}
                  key={n}
                  content={n}
                  onClick={() => updateConfig({ per_page: n, page: 0 })}
                />
              ))}
            </Dropdown.Menu>
          </Dropdown>
        )}
      />
    );
  }
  renderHeader() {
    return (
      <Table.Header>
        <Table.Row>
          {/* TODO sorting etc */}
          {this.props.columns.map(({ key, name }) => (
            <Table.HeaderCell key={key}>{name}</Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
    );
  }
  renderBody() {
    const { data: { items }, renderMissing, columns, onRowClick } = this.props;
    return (
      <Table.Body>
        {!items || items.length === 0 ?
          renderMissing()
        :
          items.map(item => (
            <Table.Row
              key={item.id}
              onClick={() => onRowClick(item)}
              style={onRowClick ? { cursor: 'pointer' } : undefined}
            >
              {columns.map(({ key, renderCell, cellProps }) => (
                <Table.Cell key={key} {...cellProps}>{renderCell ? renderCell(item) : item[key]}</Table.Cell>
              ))}
            </Table.Row>
          ))
        }
      </Table.Body>
    );
  }
  render() {
    const { data: { items, error }, renderError, renderLoading } = this.props;
    if (error) { return renderError(error); }
    if (!items) { return renderLoading(); }
    return (
      <div>
        {this.renderPagination()}
        <Table selectable={!!this.props.onRowClick}>
          {this.renderHeader()}
          {this.renderBody()}
        </Table>
      </div>
    );
  }
}
